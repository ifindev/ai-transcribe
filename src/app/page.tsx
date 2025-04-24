'use client';

import { useState } from 'react';
import { AudioRecorder } from '@/components/audio-recorder';
import { TranscriptionDisplay } from '@/components/transcription-display';
import transcribeAction from '@/actions/transcribe.action';

export default function Home() {
    const [transcription, setTranscription] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [error, setError] = useState<string>();

    const handleRecordingComplete = async (audioBlob: Blob) => {
        setIsTranscribing(true);
        setError(undefined);

        try {
            const result = await transcribeAction(audioBlob);
            if (result.error) {
                setError(result.error);
            } else {
                setTranscription(result.text);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to transcribe audio');
        } finally {
            setIsTranscribing(false);
        }
    };

    const onRetryRecording = () => {
        setTranscription('');
        setError(undefined);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-8">
                <h1 className="text-4xl font-bold text-center text-indigo-900">AI Transcribe</h1>

                <AudioRecorder
                    onRecordingComplete={handleRecordingComplete}
                    onRetryRecording={onRetryRecording}
                />

                <TranscriptionDisplay
                    text={transcription}
                    isLoading={isTranscribing}
                    error={error}
                />
            </div>
        </div>
    );
}
