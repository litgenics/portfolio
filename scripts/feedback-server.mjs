import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Visual Feedback Upload Handler
  if (req.method === 'POST' && req.url === '/upload') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const { image, note, timestamp } = JSON.parse(body);
        const base64Data = image.split(',')[1];
        
        const dir = path.join(process.cwd(), 'visual-feedback');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        
        const fileName = `feedback-${timestamp}.png`;
        const noteName = `feedback-${timestamp}.txt`;
        
        fs.writeFileSync(path.join(dir, fileName), base64Data, 'base64');
        fs.writeFileSync(path.join(dir, noteName), note);
        
        console.log(`[Feedback] Received: ${fileName}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Success', file: fileName }));
      } catch (err) {
        res.writeHead(500);
        res.end(err.message);
      }
    });
  } 
  
  // LIT-Studio Pro Render Handler (Remotion)
  else if (req.method === 'POST' && req.url === '/render-video') {
    console.log(`[Studio Pro] Request received at ${new Date().toISOString()}`);
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { videoData, audioData, videoDur, audioDur, timestamp } = JSON.parse(body);
        
        const studioDir = path.join(process.cwd(), 'public', 'studio-assets');
        if (!fs.existsSync(studioDir)) fs.mkdirSync(studioDir, { recursive: true });

        const videoFileName = `input_${timestamp}.mp4`;
        const audioFileName = `input_${timestamp}.mp3`;
        const propsFileName = `props_${timestamp}.json`;
        
        const videoPath = path.join(studioDir, videoFileName);
        const audioPath = path.join(studioDir, audioFileName);
        const propsPath = path.join(studioDir, propsFileName);
        const outputPath = path.join(process.cwd(), 'public', `output_${timestamp}.mp4`);

        const videoBase64 = videoData.split(',')[1];
        const audioBase64 = audioData.split(',')[1];

        fs.writeFileSync(videoPath, videoBase64, 'base64');
        fs.writeFileSync(audioPath, audioBase64, 'base64');

        const fps = 30;
        const durationFrames = Math.ceil(audioDur * fps);
        const videoFrames = Math.ceil(videoDur * fps);

        const props = {
          videoSrc: `studio-assets/${videoFileName}`,
          audioSrc: `studio-assets/${audioFileName}`,
          videoDurationInFrames: videoFrames,
          audioDurationInFrames: durationFrames
        };

        fs.writeFileSync(propsPath, JSON.stringify(props));

        const entryPoint = "remotion/index.ts";
        const outputRel = `public/output_${timestamp}.mp4`;
        const propsRel = `public/studio-assets/${propsFileName}`;
        
        const renderCmd = `npx remotion render "${entryPoint}" YouTubeEngine "${outputRel}" --props="${propsRel}" --frames=0-${durationFrames}`;
        
        console.log(`[Studio Pro] Executing render...`);
        await execPromise(renderCmd, { timeout: 600000 });
        console.log(`[Studio Pro] Success!`);

        setTimeout(() => {
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
          if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
          if (fs.existsSync(propsPath)) fs.unlinkSync(propsPath);
        }, 5000);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Success', videoUrl: `/portfolio/output_${timestamp}.mp4` }));

      } catch (err) {
        console.error(`[Studio Pro Error] ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }

  // LIT-Mastering Pro Handler (Matchering)
  else if (req.method === 'POST' && req.url === '/master-audio') {
    console.log(`[Mastering Pro] Request received at ${new Date().toISOString()}`);
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { targetData, referenceData, timestamp } = JSON.parse(body);
        
        const masterDir = path.join(process.cwd(), 'public', 'mastering-assets');
        if (!fs.existsSync(masterDir)) fs.mkdirSync(masterDir, { recursive: true });

        const targetFileName = `target_${timestamp}.wav`;
        const referenceFileName = `reference_${timestamp}.wav`;
        const outputFileName = `mastered_${timestamp}.wav`;
        
        const targetPath = path.join(masterDir, targetFileName);
        const referencePath = path.join(masterDir, referenceFileName);
        const outputPath = path.join(masterDir, outputFileName);

        // Save raw files
        fs.writeFileSync(targetPath, targetData.split(',')[1], 'base64');
        fs.writeFileSync(referencePath, referenceData.split(',')[1], 'base64');

        console.log(`[Mastering Pro] Starting Python engine...`);

        // Execute Matchering Wrapper
        const masterCmd = `python scripts/master_audio.py "${targetPath}" "${referencePath}" "${outputPath}"`;
        
        console.log(`[Mastering Pro] Executing: ${masterCmd}`);
        await execPromise(masterCmd, { timeout: 900000 }); // 15 min timeout for heavy mastering
        
        console.log(`[Mastering Pro] Success! Output: ${outputFileName}`);

        // Cleanup inputs
        setTimeout(() => {
          if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
          if (fs.existsSync(referencePath)) fs.unlinkSync(referencePath);
        }, 5000);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          message: 'Success', 
          audioUrl: `/portfolio/mastering-assets/${outputFileName}` 
        }));

      } catch (err) {
        console.error(`[Mastering Pro Error] ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }
  
  else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 LIT-Studio & Mastering Sidecar running on http://localhost:${PORT}`);
});
