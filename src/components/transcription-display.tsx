import { Loader2 } from 'lucide-react';

interface TranscriptionDisplayProps {
    text: string;
    isLoading: boolean;
    error?: string;
}

export function TranscriptionDisplay({ text, isLoading, error }: TranscriptionDisplayProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transcribing...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!text) {
        return null;
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Transcription</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
        </div>
    );
}
