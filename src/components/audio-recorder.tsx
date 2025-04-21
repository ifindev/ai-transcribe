import { Mic, StopCircle, RotateCcw } from 'lucide-react';

interface AudioRecorderProps {
    isRecording: boolean;
    recordedAudioUrl: string | null;
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    handleRestartRecording: () => void;
}

export function AudioRecorder({
    isRecording,
    recordedAudioUrl,
    handleStartRecording,
    handleStopRecording,
    handleRestartRecording,
}: AudioRecorderProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            {isRecording && (
                <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">Recording...</span>
                </div>
            )}

            {!recordedAudioUrl && (
                <button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white ${
                        isRecording
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isRecording ? (
                        <>
                            <StopCircle className="w-4 h-4" />
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <Mic className="w-4 h-4" />
                            Start Recording
                        </>
                    )}
                </button>
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
