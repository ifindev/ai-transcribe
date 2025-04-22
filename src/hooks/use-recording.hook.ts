import { useCallback, useRef, useState } from 'react';

import { createAudioBlob } from '@/lib/media';

import useMediaRecorder from './use-media-recorder.hook';
import useRecordingDuration from './use-recording-duration.hook';

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
    const audioChunksRef = useRef<Blob[]>([]);

    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

    const {
        duration,
        startDurationTracking,
        pauseDurationTracking,
        resumeDurationTracking,
        finalizeDuration,
    } = useRecordingDuration();

    const { startRecording, stopRecording, pauseRecording, resumeRecording } = useMediaRecorder({
        chunkDurationMs,
        onDataAvailable: (data) => audioChunksRef.current.push(data),
        onStop: () => {
            const { blob, url } = createAudioBlob(audioChunksRef.current);
            const finalDuration = finalizeDuration();
            setRecordedAudioUrl(url);
            setIsRecording(false);
            setIsPaused(false);
            onRecordingComplete(blob, finalDuration);
        },
        onError: onRecordingError,
    });

    const handleStartRecording = useCallback(async () => {
        setIsPaused(false);
        setIsRecording(true);
        setRecordedAudioUrl(null);

        audioChunksRef.current = [];

        startDurationTracking();
        await startRecording();
    }, [startRecording, startDurationTracking]);

    const handleStopRecording = useCallback(() => {
        stopRecording();
    }, [stopRecording]);

    const handleCancelRecording = useCallback(() => {
        stopRecording();
        setRecordedAudioUrl(null);
        startDurationTracking(); // Reset duration
    }, [stopRecording, startDurationTracking]);

    const handlePauseRecording = useCallback(() => {
        if (isRecording && !isPaused) {
            pauseRecording();
            pauseDurationTracking();
            setIsPaused(true);
        }
    }, [isRecording, isPaused, pauseRecording, pauseDurationTracking]);

    const handleResumeRecording = useCallback(() => {
        if (isRecording && isPaused) {
            resumeRecording();
            resumeDurationTracking();
            setIsPaused(false);
        }
    }, [isRecording, isPaused, resumeRecording, resumeDurationTracking]);

    const handleRestartRecording = useCallback(() => {
        stopRecording();
        setRecordedAudioUrl(null);
        startDurationTracking();
        audioChunksRef.current = [];
        setIsRecording(false);
        setIsPaused(false);
        onRecordingRestart();
    }, [stopRecording, startDurationTracking, onRecordingRestart]);

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
