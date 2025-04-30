import openai from '@/libs/openai';
import ITranscriptionService from './transcription.service.interface';
import OpenAI from 'openai';
import { TranscriptionResult } from '@/models/transcription.model';

export class OpenAITranscriptionService implements ITranscriptionService {
    private readonly openai: OpenAI;

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async transcribe(audioBlob: Blob, lang?: string): Promise<TranscriptionResult> {
        try {
            const arrayBuffer = await audioBlob.arrayBuffer();
            const file = new File([arrayBuffer], 'audio.webm', { type: 'audio/webm' });

            console.log('in progress transcribing...');
            console.log('lang', lang);
            const transcription = await this.openai.audio.transcriptions.create({
                file,
                model: 'whisper-1',
                language: lang,
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
                            'You are a professional transcription formatter with expertise in creating clear, readable content from raw audio transcripts.',
                    },
                    {
                        role: 'user',
                        content: `# Transcription Formatting Request

                                I need this raw audio transcription formatted for maximum readability and clarity.

                                ## Instructions
                                - Break the transcription into logical paragraphs of 1-2 sentences each
                                - Preserve the original meaning and content completely
                                - Add appropriate spacing between paragraphs
                                - Correct any obvious grammatical issues without changing meaning
                                - Do not add any headers, titles, or additional content
                                - Return only the formatted transcription

                                ## Raw Transcription
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

    // Helper to detect language of a given text using OpenAI
    async detectLanguage(text: string): Promise<string> {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'Detect the language of the following text. Respond with only the language name (e.g., English, Spanish, French, etc.).',
                    },
                    {
                        role: 'user',
                        content: text,
                    },
                ],
                max_tokens: 10,
            });
            const language = response.choices[0].message.content?.trim() || 'Unknown';
            return language;
        } catch (error) {
            console.error('Language detection error:', error);
            return 'Unknown';
        }
    }

    async generateInsights(transcription: string): Promise<TranscriptionResult> {
        try {
            console.log('in progress generating insights...');
            // Detect language first
            const language = await this.detectLanguage(transcription);
            const insightsResponse = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are an expert executive assistant who specializes in analyzing audio transcripts and extracting valuable insights for busy professionals.',
                    },
                    {
                        role: 'user',
                        content: `Extract 3-5 key insights from the following transcription.\n
                        Format them as a bulleted list with clear, concise points.\n
                        Focus on the most important takeaways, decisions, or action items.\n
                        The language of the transcription is: ${language}.\n
                        DO NOT translate. Output MUST be in the same language as the transcription.\n
                        Transcription:\n${transcription}`,
                    },
                ],
            });
            console.log('finished generating insights');

            return {
                text: insightsResponse.choices[0].message.content ?? '',
            };
        } catch (error) {
            console.error('Insights generation error:', error);
            return {
                text: '',
                error: error instanceof Error ? error.message : 'Failed to generate insights',
            };
        }
    }
}

const openAITranscriptionService = new OpenAITranscriptionService(openai);

export default openAITranscriptionService;
