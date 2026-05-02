import matchering as mg
import sys
import os

def master(target, reference, output):
    try:
        print(f"Target: {target}")
        print(f"Reference: {reference}")
        print(f"Output: {output}")
        
        # Core mastering process
        mg.process(
            target=target,
            reference=reference,
            results=[
                mg.pcm24(output)
            ],
        )
        print("Mastering completed successfully.")
        return True
    except Exception as e:
        print(f"Error during mastering: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python master_audio.py <target> <reference> <output>")
        sys.exit(1)
        
    target_path = sys.argv[1]
    reference_path = sys.argv[2]
    output_path = sys.argv[3]
    
    success = master(target_path, reference_path, output_path)
    if not success:
        sys.exit(1)
