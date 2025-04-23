import { Play, StopCircle, Pause } from 'lucide-react';

import { Button } from './ui/button';
import { formatTimeToMinutesAndSeconds } from '@/utils/formatter';

type Props = {
    isPaused: boolean;
    handlePauseRecording: () => void;
    handleResumeRecording: () => void;
    handleStopRecording: () => void;
    recordingTime: number;
    isRecording: boolean;
};

export default function RecordingControls({
    isPaused,
    handlePauseRecording,
    handleResumeRecording,
    handleStopRecording,
    recordingTime,
    isRecording,
}: Props) {
    return (
        <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2 px-4">
            <div className="text-sm">{formatTimeToMinutesAndSeconds(recordingTime)}</div>
            <div className="flex-1 text-center text-sm">{isPaused ? 'Paused' : 'Recording'}</div>
            <div className="flex gap-2">
                {handlePauseRecording && handleResumeRecording && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full size-9"
                        onClick={isPaused ? handleResumeRecording : handlePauseRecording}
                    >
                        {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full size-9"
                    onClick={handleStopRecording}
                >
                    <StopCircle className="size-4" />
                </Button>
            </div>
        </div>
    );
}
