'use client';

import { CloudUpload, Disc, Speech } from 'lucide-react';
import useWorkspaceViewModel from './workspace.view-model';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import RecordingPreview from '@/components/recording-preview';
import StartRecordingButton from '@/modules/workspace/components/start-recording-button';
import RecordingList from '@/components/recording-list';
import RecordingControls from '@/components/recording-controls';
import AudioWaveform from '@/components/audio-waveform';
import TranscriptionTabs from '@/components/transcription-tabs';
import LanguageSection from '@/modules/workspace/components/language-section';
import GenerateNoteButton from '@/modules/workspace/components/generate-note-button';

export default function WorkspaceView() {
    const {
        transcription,
        recording,
        recordings,
        audioPlayback,
        recordingTimer,
        audioStream,
        selectedLanguage,
        handleToggleDialog,
        handleLanguageChange,
        handleGenerateNote,
    } = useWorkspaceViewModel();

    return (
        <div className="flex flex-col h-full w-full p-4 md:p-8 overflow-y-auto">
            <div className="flex flex-col w-full md:w-2xl mx-auto">
                <h2 className="text-2xl font-bold">New recording</h2>
                <p className="text-md text-muted-foreground">
                    Quickly record and transcribe meetings, notes, or ideas.
                </p>

                <Dialog onOpenChange={handleToggleDialog}>
                    <div className="flex flex-col md:flex-row w-full my-4 gap-2 md:gap-4">
                        <DialogTrigger asChild disabled={recording.isRecording}>
                            <Button variant="destructive" size="lg">
                                <Disc className="size-4" />
                                Record audio
                            </Button>
                        </DialogTrigger>
                        <Button variant="black" size="lg">
                            <CloudUpload className="size-4" />
                            Upload audio
                        </Button>
                        <Button variant="black" disabled size="lg">
                            <Speech className="size-4" />
                            Live transcription
                        </Button>
                    </div>
                    <DialogContent>
                        <DialogHeader className="hidden">
                            <DialogTitle>Record audio</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-8 my-2">
                            <h2 className="text-2xl font-bold text-center">Record audio</h2>
                            {!recording.isRecording && !recording.recordedAudioUrl && (
                                <StartRecordingButton
                                    onStartRecording={recording.handleStartRecording}
                                />
                            )}

                            {recording.isRecording && (
                                <>
                                    <AudioWaveform
                                        isRecording={recording.isRecording}
                                        isPaused={recording.isPaused}
                                        audioStream={audioStream.stream}
                                    />
                                    <RecordingControls
                                        isPaused={recording.isPaused}
                                        handlePauseRecording={recording.handlePauseRecording}
                                        handleResumeRecording={recording.handleResumeRecording}
                                        handleStopRecording={recording.handleStopRecording}
                                        recordingTime={recordingTimer.recordingTime}
                                        isRecording={recording.isRecording}
                                    />
                                </>
                            )}

                            {recording.recordedAudioUrl && (
                                <RecordingPreview
                                    audioRef={audioPlayback.audioRef}
                                    duration={recording.duration}
                                    isPlaying={audioPlayback.isPlaying}
                                    currentTime={audioPlayback.currentTime}
                                    togglePlayPause={audioPlayback.togglePlayPause}
                                    onSliderChange={audioPlayback.handleSliderChange}
                                    onDeleteRecording={recording.handleCancelRecording}
                                />
                            )}

                            {(transcription.transcription ||
                                transcription.insights ||
                                transcription.isTranscribing) && (
                                <TranscriptionTabs
                                    transcription={transcription.transcription}
                                    insights={transcription.insights}
                                    isLoading={transcription.isTranscribing}
                                    error={transcription.errorTranscribing}
                                />
                            )}

                            <hr className="w-full border-t border-gray-200" />

                            <LanguageSection
                                onChange={handleLanguageChange}
                                defaultLanguage={selectedLanguage}
                            />

                            <GenerateNoteButton
                                onClick={handleGenerateNote}
                                disabled={
                                    !recording.recordedAudioUrl || transcription.isTranscribing
                                }
                                isLoading={transcription.isTranscribing}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="flex flex-col w-full my-4 gap-4">
                    <h2 className="text-2xl font-bold">My recordings</h2>
                    <RecordingList recordings={recordings} />
                </div>
            </div>
        </div>
    );
}
