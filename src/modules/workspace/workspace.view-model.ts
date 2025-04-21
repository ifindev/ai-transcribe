import transcribeAction from '@/actions/transcribe.action';
import useTranscription from './hooks/use-transcription.hook';
import useRecording from './hooks/use-recording.hook';

export default function useWorkspaceViewModel() {
    const transcription = useTranscription({
        onTranscribeAudio: transcribeAction,
    });

    const recording = useRecording({
        onRecordingRestart: transcription.handleResetTranscription,
        onRecordingComplete: transcription.handleTranscribeAudio,
        onRecordingError: transcription.handleSetTranscriptionError,
    });

    return {
        transcription,
        recording,
    };
}
