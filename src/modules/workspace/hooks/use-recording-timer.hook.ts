import { useEffect, useRef, useState } from 'react';

/**
 * Hook to manage real-time recording timer, tracking elapsed time during active recording.
 * @param isRecording Whether the recording is active.
 * @param isPaused Whether the recording is paused.
 * @returns The current recording time in seconds.
 */
export default function useRecordingTimer({
    isRecording,
    isPaused,
}: {
    isRecording: boolean;
    isPaused: boolean;
}) {
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingStartTimeRef = useRef<number | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRecording && !isPaused) {
            if (!recordingStartTimeRef.current) {
                recordingStartTimeRef.current = Date.now() - recordingTime * 1000;
            }

            interval = setInterval(() => {
                if (recordingStartTimeRef.current) {
                    const elapsed = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
                    setRecordingTime(elapsed);
                }
            }, 1000);
        } else if (isPaused) {
            if (recordingStartTimeRef.current) {
                recordingStartTimeRef.current = Date.now() - recordingTime * 1000;
            }
        } else {
            setRecordingTime(0);
            recordingStartTimeRef.current = null;
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused, recordingTime]);

    return { recordingTime };
}
