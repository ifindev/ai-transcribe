import openai from '@/libs/openai';
import { TranscriptionResult } from '@/models/transcription.model';

export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    try {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const file = new File([arrayBuffer], 'audio.webm', { type: 'audio/webm' });

        console.log('in progress transcribing...');
        const transcription = await openai.audio.transcriptions.create({
            file,
            model: 'whisper-1',
            language: 'en',
            response_format: 'text',
            temperature: 0,
        });
        console.log('finished transcribing');

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
