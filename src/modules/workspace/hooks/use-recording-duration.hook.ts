import { useCallback, useRef, useState } from 'react';

const AUDIO_PROCESSING_OFFSET = 0.8;

export default function useRecordingDuration() {
    const [duration, setDuration] = useState(0);

    const pausedTimeRef = useRef<number>(0);
    const pauseStartTimeRef = useRef<number | null>(null);
    const recordingStartTimeRef = useRef<number | null>(null);

    const startDurationTracking = useCallback(() => {
        pausedTimeRef.current = 0;
        setDuration(0);
        recordingStartTimeRef.current = Date.now();
    }, []);

    const pauseDurationTracking = useCallback(() => {
        if (!pauseStartTimeRef.current) {
            pauseStartTimeRef.current = Date.now();
        }
    }, []);

    const resumeDurationTracking = useCallback(() => {
        if (pauseStartTimeRef.current) {
            pausedTimeRef.current += Date.now() - pauseStartTimeRef.current;
            pauseStartTimeRef.current = null;
        }
    }, []);

    const finalizeDuration = useCallback(() => {
        if (recordingStartTimeRef.current) {
            const finalDuration =
                (Date.now() - recordingStartTimeRef.current - pausedTimeRef.current) / 1000 -
                AUDIO_PROCESSING_OFFSET;
            const adjustedDuration = Math.max(0, finalDuration);
            setDuration(adjustedDuration);
            return adjustedDuration;
        }
        return 0;
    }, []);

    return {
        duration,
        startDurationTracking,
        pauseDurationTracking,
        resumeDurationTracking,
        finalizeDuration,
    };
}
