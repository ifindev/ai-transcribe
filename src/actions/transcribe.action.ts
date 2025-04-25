'use server';

import { TranscriptionResult } from '@/models/transcription.model';
import openAITranscriptionService from '@/services/transcription/transcription.service';

export default async function transcribeAction(audio: Blob): Promise<TranscriptionResult> {
    try {
        const { text: transcription } = await openAITranscriptionService.transcribe(audio);

        // Run formatting and insights generation in parallel
        const [formattingResult, insightsResult] = await Promise.all([
            openAITranscriptionService.formatTranscription(transcription),
            openAITranscriptionService.generateInsights(transcription),
        ]);

        console.log('Insights:', insightsResult.insights); // Add debugging log

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
