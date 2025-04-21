'use server';

import { TranscriptionResult } from '@/models/transcription.model';
import openAITranscriptionService from '@/services/transcription/transcription.service';

export default async function transcribeAction(audio: Blob): Promise<TranscriptionResult> {
    try {
        const { text: transcription } = await openAITranscriptionService.transcribe(audio);
        const { text: formattedTranscription } =
            await openAITranscriptionService.formatTranscription(transcription);

        return {
            text: formattedTranscription,
        };
    } catch (error) {
        console.error('Transcription error:', error);
        return {
            text: '',
            error: error instanceof Error ? error.message : 'Failed to transcribe audio',
        };
    }
}
