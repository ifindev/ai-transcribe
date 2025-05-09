import { useCallback, useState } from 'react';
import { TranscriptionResult } from '@/models/transcription.model';

type UseTranscriptionProps = {
    onTranscribeAudio: (audio: Blob) => Promise<TranscriptionResult>;
};

export default function useTranscription({ onTranscribeAudio }: UseTranscriptionProps) {
    const [transcription, setTranscription] = useState<string>('');
    const [insights, setInsights] = useState<string>('');
    const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
    const [errorTranscribing, setErrorTranscribing] = useState<string>();

    const handleResetTranscription = useCallback(() => {
        setTranscription('');
        setInsights('');
        setIsTranscribing(false);
        setErrorTranscribing(undefined);
    }, []);

    const handleSetTranscriptionError = useCallback((error: Error) => {
        setIsTranscribing(false);
        setErrorTranscribing(error.message);
    }, []);

    const handleTranscribeAudio = useCallback(
        async (audio: Blob) => {
            setIsTranscribing(true);
            setErrorTranscribing(undefined);

            try {
                const result = await onTranscribeAudio(audio);
                setTranscription(result.text);
                setInsights(result.insights || '');
            } catch (error) {
                setErrorTranscribing(
                    error instanceof Error ? error.message : 'Failed to transcribe audio',
                );
            } finally {
                setIsTranscribing(false);
            }
        },
        [onTranscribeAudio],
    );

    return {
        transcription,
        insights,
        isTranscribing,
        errorTranscribing,
        handleTranscribeAudio,
        handleResetTranscription,
        handleSetTranscriptionError,
    };
}
