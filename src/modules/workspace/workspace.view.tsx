'use client';

import { AudioRecorder } from '@/components/audio-recorder';
import { TranscriptionDisplay } from '@/components/transcription-display';
import useWorkspaceViewModel from './workspace.view-model';

export default function WorkspaceView() {
    const { transcription, recording } = useWorkspaceViewModel();

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-8">
            <h1 className="text-4xl font-semibold text-center text-indigo-900">AI Transcribe</h1>

            <AudioRecorder
                isRecording={recording.isRecording}
                recordedAudioUrl={recording.recordedAudioUrl}
                handleStartRecording={recording.handleStartRecording}
                handleStopRecording={recording.handleStopRecording}
                handleRestartRecording={recording.handleRestartRecording}
            />

            <TranscriptionDisplay
                text={transcription.transcription}
                isLoading={transcription.isTranscribing}
                error={transcription.errorTranscribing}
            />
        </div>
    );
}
