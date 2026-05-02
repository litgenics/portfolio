import { Composition, staticFile, useVideoConfig, useCurrentFrame, AbsoluteFill, Video, Audio, Loop } from 'remotion';

// The actual video component
const YouTubeEngineVideo: React.FC<{
  videoSrc: string;
  audioSrc: string;
  videoDurationInFrames: number;
  audioDurationInFrames: number;
}> = ({ videoSrc, audioSrc, videoDurationInFrames, audioDurationInFrames }) => {
  
  // Calculate how many times we need to loop the video to cover the audio
  const loopCount = Math.ceil(audioDurationInFrames / videoDurationInFrames);

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Visual Layer */}
      <Loop durationInFrames={videoDurationInFrames} times={loopCount}>
        <Video 
          src={staticFile(videoSrc)} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </Loop>
      
      {/* Audio Layer */}
      <Audio src={staticFile(audioSrc)} />
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="YouTubeEngine"
        component={YouTubeEngineVideo}
        durationInFrames={18000} // Up to 10 mins
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoSrc: 'placeholder_video.mp4',
          audioSrc: 'placeholder_audio.mp3',
          videoDurationInFrames: 300,
          audioDurationInFrames: 1800,
        }}
      />
    </>
  );
};
