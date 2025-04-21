import { useCallback, useEffect, useRef, useState } from 'react';

type UseRecordingProps = {
    chunkDurationMs?: number;
    onRecordingRestart: () => void;
    onRecordingComplete: (audioBlob: Blob) => void;
    onRecordingError: (error: Error) => void;
};

export default function useRecording({
    chunkDurationMs = 1000,
    onRecordingRestart,
    onRecordingComplete,
    onRecordingError,
}: UseRecordingProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

    const audioChunksRef = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const handleStartRecording = useCallback(async () => {
        setRecordedAudioUrl(null);
        audioChunksRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        });

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(audioUrl);
            onRecordingComplete(audioBlob);
        });

        mediaRecorder.addEventListener('error', (event) => {
            onRecordingError(event as unknown as Error);
        });

        mediaRecorder.start(chunkDurationMs);
        setIsRecording(true);
    }, [chunkDurationMs]);

    const handleStopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        }
    }, []);

    const handleRestartRecording = useCallback(() => {
        setRecordedAudioUrl(null);
        audioChunksRef.current = [];
        setIsRecording(false);
        onRecordingRestart();
    }, [onRecordingRestart]);

    return {
        isRecording,
        recordedAudioUrl,
        handleStartRecording,
        handleStopRecording,
        handleRestartRecording,
    };
}
