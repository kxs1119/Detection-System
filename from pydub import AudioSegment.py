from pydub import AudioSegment

# Load your audio file (replace 'your_audio_file.wav' with the actual file path)
audio = AudioSegment.from_file("your_audio_file.wav")  # Replace with your audio file path

# Function to add echo
def add_echo(audio, delay_ms=500, decay=0.6):
    """
    Adds an echo effect to the audio segment.
    
    Parameters:
    - audio: The original AudioSegment
    - delay_ms: Delay for the echo in milliseconds
    - decay: Volume decay for the echo, between 0 and 1
    
    Returns:
    - AudioSegment with echo effect
    """
    # Create an empty segment for the echo
    echo = AudioSegment.silent(duration=delay_ms)
    
    # Create the echo with reduced volume (decay)
    faded_echo = audio - (audio.dBFS * decay)
    
    # Overlay the echo onto the original audio after the delay
    return audio.overlay(faded_echo, position=delay_ms)

# Add echo to the audio with 500ms delay and 0.6 decay
audio_with_echo = add_echo(audio, delay_ms=500, decay=0.6)

# Export or play the modified audio
audio_with_echo.export("audio_with_echo.wav", format="wav")
print("Echo added and saved as 'audio_with_echo.wav'")
