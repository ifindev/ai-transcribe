import { useEffect, useState } from 'react';

/**
 * Hook to manage the audio stream for real-time visualization.
 * @param isRecording Whether the recording is active.
 * @returns The audio stream for visualization.
 */
export default function useAudioStream({ isRecording }: { isRecording: boolean }) {
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const setupStream = async () => {
            if (isRecording && !audioStream) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    setAudioStream(stream);
                } catch (error) {
                    console.error('Error accessing microphone:', error);
                }
            }
        };

        setupStream();

        return () => {
            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
                setAudioStream(null);
            }
        };
    }, [isRecording, audioStream]);

    return { stream: audioStream };
}
