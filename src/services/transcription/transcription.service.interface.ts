import { TranscriptionResult } from '@/models/transcription.model';

export default interface ITranscriptionService {
    transcribe(audioBlob: Blob): Promise<TranscriptionResult>;
    formatTranscription(transcription: string): Promise<TranscriptionResult>;
    generateInsights(transcription: string): Promise<TranscriptionResult>;
}
