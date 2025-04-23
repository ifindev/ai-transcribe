import transcribeAction from '@/actions/transcribe.action';
import useTranscription from './hooks/use-transcription.hook';
import useRecording from '@/hooks/use-recording.hook';
import { useAudioPlayback } from '@/hooks/use-audio-playback.hook';
import { useRecordingTimer } from '@/hooks/use-recording-timer.hook';
import { useAudioStream } from '@/hooks/use-audio-stream.hook';

export default function useWorkspaceViewModel() {
    const transcription = useTranscription({
        onTranscribeAudio: transcribeAction,
    });

    const recording = useRecording({
        onRecordingRestart: transcription.handleResetTranscription,
        onRecordingComplete: transcription.handleTranscribeAudio,
        onRecordingError: transcription.handleSetTranscriptionError,
    });

    const audioPlayback = useAudioPlayback({
        recordedAudioUrl: recording.recordedAudioUrl,
    });

    const recordingTimer = useRecordingTimer({
        isRecording: recording.isRecording,
        isPaused: recording.isPaused,
    });

    const audioStream = useAudioStream({
        isRecording: recording.isRecording,
    });

    const handleToggleDialog = () => {
        recording.handleCancelRecording();
        transcription.handleResetTranscription();
    };

    const recordings = [
        {
            id: '1',
            title: 'Recording 1',
            createdAt: '10 Nov 2024, 01:08 AM',
        },
        {
            id: '2',
            title: 'Recording 2',
            createdAt: '10 Nov 2024, 10:00 AM',
        },
    ];

    return {
        transcription,
        recording,
        recordings,
        audioPlayback,
        recordingTimer,
        audioStream,
        handleToggleDialog,
    };
}
