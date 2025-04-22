import { Mic, StopCircle, RotateCcw, Pause, Play, CircleStop } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
interface AudioRecorderProps {
    isRecording: boolean;
    isPaused?: boolean;
    recordedAudioUrl: string | null;
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    handlePauseRecording?: () => void;
    handleResumeRecording?: () => void;
    handleRestartRecording: () => void;
}

export function AudioRecorder({
    isRecording,
    isPaused = false,
    recordedAudioUrl,
    handleStartRecording,
    handleStopRecording,
    handlePauseRecording,
    handleResumeRecording,
    handleRestartRecording,
}: AudioRecorderProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            {isRecording && (
                <div className="flex items-center space-x-1">
                    <div
                        className={cn(
                            'w-3 h-3 bg-red-500 rounded-full',
                            isPaused ? '' : 'animate-pulse',
                        )}
                    />
                    <span className="text-sm text-gray-600">
                        {isPaused ? 'Paused' : 'Recording...'}
                    </span>
                </div>
            )}

            {!recordedAudioUrl && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Button
                                    variant={isRecording ? 'destructive' : 'default'}
                                    size="icon"
                                    className="rounded-full shadow-md z-20"
                                    onClick={
                                        isRecording ? handleStopRecording : handleStartRecording
                                    }
                                >
                                    {isRecording ? (
                                        <CircleStop className="size-4" />
                                    ) : (
                                        <Mic className="size-4" />
                                    )}
                                </Button>
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                    <div
                                        className={cn(
                                            'animate-ping bg-primary size-6 rounded-full',
                                            isRecording && 'bg-destructive',
                                            isPaused && 'animate-none opacity-0',
                                        )}
                                    />
                                </div>
                            </div>

                            {isRecording && handlePauseRecording && handleResumeRecording && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full shadow-sm"
                                    onClick={
                                        isPaused ? handleResumeRecording : handlePauseRecording
                                    }
                                >
                                    {isPaused ? (
                                        <Play className="size-4" />
                                    ) : (
                                        <Pause className="size-4" />
                                    )}
                                </Button>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            {isRecording
                                ? isPaused
                                    ? 'Recording paused'
                                    : 'Press to stop'
                                : 'Press to record'}
                        </p>
                    </div>
                </div>
            )}

            {recordedAudioUrl && (
                <>
                    <div className="flex items-center justify-center gap-4">
                        <audio src={recordedAudioUrl} controls />

                        <button
                            className="bg-blue-500 text-white font-semibold p-2 rounded-md flex items-center gap-2"
                            onClick={handleRestartRecording}
                        >
                            <RotateCcw className="w-4 h-4" />
                            Record Again
                        </button>
                    </div>
                    <p className="text-gray-600">
                        {!document.createElement('audio').canPlayType('audio/webm') &&
                            'Your browser does not support the audio element.'}
                    </p>
                </>
            )}
        </div>
    );
}
