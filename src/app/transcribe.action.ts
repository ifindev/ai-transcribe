'use server';

import { TranscriptionResult } from '@/models/transcription.model';
import { transcribeAudio } from '@/services/transcription/transcription.service';

export default async function transcribeAction(audio: Blob): Promise<TranscriptionResult> {
    try {
        const { text: transcription } = await transcribeAudio(audio);

        return {
            text: transcription,
        };
    } catch (error) {
        console.error('Transcription error:', error);
        return {
            text: '',
            error: error instanceof Error ? error.message : 'Failed to transcribe audio',
        };
    }
}
