'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type TranscribeResult = {
    text: string;
    error?: string;
};

export async function transcribeAudio(audioBlob: Blob): Promise<TranscribeResult> {
    try {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const file = new File([arrayBuffer], 'audio.webm', { type: 'audio/webm' });

        const transcription = await openai.audio.transcriptions.create({
            file,
            model: 'whisper-1',
            language: 'en',
            response_format: 'text',
            temperature: 0,
        });

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
