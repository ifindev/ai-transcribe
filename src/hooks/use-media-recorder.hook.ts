import { useCallback, useRef } from 'react';
import { stopMediaTracks } from '@/lib/media';

type UseMediaRecorderProps = {
    chunkDurationMs: number;
    onDataAvailable: (data: Blob) => void;
    onStop: () => void;
    onError: (error: Error) => void;
};

export default function useMediaRecorder({
    chunkDurationMs,
    onDataAvailable,
    onStop,
    onError,
}: UseMediaRecorderProps) {
    const streamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const initializeRecorder = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;

            recorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    onDataAvailable(event.data);
                }
            });
            recorder.addEventListener('stop', onStop);
            recorder.addEventListener('error', (event) => onError(event as unknown as Error));

            return recorder;
        } catch (error) {
            onError(error as Error);
            return null;
        }
    }, [onDataAvailable, onStop, onError]);

    const startRecording = useCallback(async () => {
        const recorder = await initializeRecorder();
        if (recorder) {
            recorder.start(chunkDurationMs);
        }
    }, [initializeRecorder, chunkDurationMs]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            if (streamRef.current) {
                stopMediaTracks(streamRef.current);
            }
            mediaRecorderRef.current = null;
            streamRef.current = null;
        }
    }, []);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.pause();
        }
    }, []);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current?.state === 'paused') {
            mediaRecorderRef.current.resume();
        }
    }, []);

    return {
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
    };
}
