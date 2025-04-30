import transcribeAction from '@/modules/workspace/actions/transcribe.action';
import useTranscription from './hooks/use-transcription.hook';
import useRecording from '@/modules/workspace/hooks/use-recording.hook';
import useAudioPlayback from '@/modules/workspace/hooks/use-audio-playback.hook';
import useRecordingTimer from '@/modules/workspace/hooks/use-recording-timer.hook';
import useAudioStream from '@/modules/workspace/hooks/use-audio-stream.hook';
import { useCallback, useState } from 'react';
import { languageOptions } from '@/constants/language.constant';

export default function useWorkspaceViewModel() {
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(languageOptions[0].value);

    const transcription = useTranscription({
        onTranscribeAudio: async (audio: Blob) => {
            return transcribeAction(
                audio,
                selectedLanguage === 'auto-detect' ? undefined : selectedLanguage,
            );
        },
    });

    const recording = useRecording({
        onRecordingRestart: transcription.handleResetTranscription,
        onRecordingComplete: (audioBlob: Blob) => {
            setAudioBlob(audioBlob);
        },
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

    const handleToggleDialog = useCallback(() => {
        recording.handleCancelRecording();
        transcription.handleResetTranscription();
        setSelectedLanguage(languageOptions[0].value);
    }, [recording, transcription]);

    const handleGenerateNote = useCallback(() => {
        if (audioBlob) {
            transcription.handleTranscribeAudio(audioBlob);
        }
    }, [audioBlob, transcription]);

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

    const handleLanguageChange = useCallback((language: string) => {
        setSelectedLanguage(language);
    }, []);

    return {
        transcription,
        recording,
        recordings,
        audioPlayback,
        recordingTimer,
        audioStream,
        handleToggleDialog,
        selectedLanguage,
        handleLanguageChange,
        handleGenerateNote,
    };
}
