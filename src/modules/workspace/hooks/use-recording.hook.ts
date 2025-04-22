import { useCallback, useRef, useState } from 'react';

const DURATION_OFFSET = 0.8;

type UseRecordingProps = {
    chunkDurationMs?: number;
    onRecordingRestart: () => void;
    onRecordingComplete: (audioBlob: Blob, duration: number) => void;
    onRecordingError: (error: Error) => void;
};

export default function useRecording({
    chunkDurationMs = 1000,
    onRecordingRestart,
    onRecordingComplete,
    onRecordingError,
}: UseRecordingProps) {
    const [duration, setDuration] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

    const audioChunksRef = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const pausedTimeRef = useRef<number>(0);
    const recordingStartTimeRef = useRef<number | null>(null);

    const handleStartRecording = useCallback(async () => {
        setRecordedAudioUrl(null);
        setIsPaused(false);
        setDuration(0);
        audioChunksRef.current = [];
        recordingStartTimeRef.current = Date.now();
        pausedTimeRef.current = 0;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        });

        mediaRecorder.addEventListener('stop', () => {
            // Calculate final duration from start time to now, minus any paused time
            let finalDuration = 0;
            if (recordingStartTimeRef.current) {
                finalDuration =
                    (Date.now() - recordingStartTimeRef.current - pausedTimeRef.current) / 1000 -
                    DURATION_OFFSET;
                finalDuration = Math.max(0, finalDuration); // Ensure non-negative
                setDuration(finalDuration);
            }
            console.log('finalDuration', finalDuration);

            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(audioUrl);
            onRecordingComplete(audioBlob, finalDuration);
        });

        mediaRecorder.addEventListener('error', (event) => {
            onRecordingError(event as unknown as Error);
        });

        mediaRecorder.start(chunkDurationMs);
        setIsRecording(true);
    }, [chunkDurationMs, onRecordingComplete, onRecordingError]);

    const handleStopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            setIsPaused(false);
        }
    }, []);

    const handleCancelRecording = useCallback(() => {
        handleStopRecording();
        setRecordedAudioUrl(null);
        setDuration(0);
    }, [handleStopRecording]);

    const handlePauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            // Store the pause start time for duration calculation
            pausedTimeRef.current = pausedTimeRef.current || 0;
            pausedTimeRef.current -= Date.now(); // Store negative value to add when resuming
        }
    }, [isRecording, isPaused]);

    const handleResumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            // Calculate paused duration and add to total paused time
            if (pausedTimeRef.current < 0) {
                pausedTimeRef.current += Date.now(); // Add now to negative value = pause duration
            }
        }
    }, [isRecording, isPaused]);

    const handleRestartRecording = useCallback(() => {
        setRecordedAudioUrl(null);
        setDuration(0);
        audioChunksRef.current = [];
        setIsRecording(false);
        setIsPaused(false);
        onRecordingRestart();
    }, [onRecordingRestart]);

    return {
        isRecording,
        isPaused,
        recordedAudioUrl,
        duration,
        handleStartRecording,
        handleStopRecording,
        handlePauseRecording,
        handleResumeRecording,
        handleRestartRecording,
        handleCancelRecording,
    };
}
