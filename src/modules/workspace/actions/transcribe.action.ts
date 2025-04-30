'use server';

import { TranscriptionResult } from '@/models/transcription.model';
import openAITranscriptionService from '@/services/transcription/transcription.service';

export default async function transcribeAction(
    audio: Blob,
    language?: string,
): Promise<TranscriptionResult> {
    try {
        // Pass the language parameter directly to the service
        // If it's auto-detect, we'll pass undefined to let the service auto-detect the language
        const { text: transcription } = await openAITranscriptionService.transcribe(
            audio,
            language,
        );

        // Run formatting and insights generation in parallel
        const [formattingResult, insightsResult] = await Promise.all([
            openAITranscriptionService.formatTranscription(transcription),
            openAITranscriptionService.generateInsights(transcription),
        ]);

        // upload audio to R2
        // Store the transcription, insights, and audio url in the database

        return {
            text: formattingResult.text,
            insights: insightsResult.text,
        };
    } catch (error) {
        console.error('Transcription error:', error);
        return {
            text: '',
            insights: '',
            error: error instanceof Error ? error.message : 'Failed to transcribe audio',
        };
    }
}
