import openai from '@/libs/openai';
import ITranscriptionService from './transcription.service.interface';
import OpenAI from 'openai';
import { TranscriptionResult } from '@/models/transcription.model';

export class OpenAITranscriptionService implements ITranscriptionService {
    private readonly openai: OpenAI;

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async transcribe(audioBlob: Blob): Promise<TranscriptionResult> {
        try {
            const arrayBuffer = await audioBlob.arrayBuffer();
            const file = new File([arrayBuffer], 'audio.webm', { type: 'audio/webm' });

            console.log('in progress transcribing...');
            const transcription = await this.openai.audio.transcriptions.create({
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

    async formatTranscription(transcription: string): Promise<TranscriptionResult> {
        try {
            console.log('in progress formatting transcription...');
            const formattedTranscription = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a helpful assistant that formats transcriptions into readable sections.',
                    },
                    {
                        role: 'user',
                        content: `Please break the following transcription into sections of up to 2 sentences each. 
                        Each section should be separated by a new line and formatted as a paragraph. 
                        Do not add anything extra — just return the formatted transcription.
                        
                        Transcription:
                        ${transcription}`,
                    },
                ],
            });
            console.log('finished formatting transcription');

            return {
                text: formattedTranscription.choices[0].message.content ?? '',
            };
        } catch (error) {
            console.error('Transcription error:', error);
            return {
                text: '',
                error: error instanceof Error ? error.message : 'Failed to format transcription',
            };
        }
    }
}

const openAITranscriptionService = new OpenAITranscriptionService(openai);

export default openAITranscriptionService;
