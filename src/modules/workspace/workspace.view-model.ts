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

    const recordings = [
        {
            id: 1,
            title: 'Recording 1',
            createdAt: '10 Nov 2024, 01:08 AM',
        },
        {
            id: 2,
            title: 'Recording 2',
            createdAt: '10 Nov 2024, 10:00 AM',
        },
    ];

    return {
        transcription,
        recording,
        recordings,
    };
}
