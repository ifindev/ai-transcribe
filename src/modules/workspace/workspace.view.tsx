'use client';

import { AudioRecorder } from '@/components/audio-recorder';
import { TranscriptionDisplay } from '@/components/transcription-display';
import { Button } from '@/components/ui/button';
import { ChevronRight, CloudUpload, Disc, Play, Speech } from 'lucide-react';
import useWorkspaceViewModel from './workspace.view-model';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function WorkspaceView() {
    const { transcription, recording, recordings } = useWorkspaceViewModel();

    return (
        <div className="flex flex-col h-full w-full p-4 md:p-8 overflow-y-auto">
            <div className="flex flex-col w-full md:w-2xl mx-auto">
                <h2 className="text-2xl font-bold">New recording</h2>
                <p className="text-md text-muted-foreground">
                    Quickly record and transcribe meetings, notes, or ideas.
                </p>

                <Dialog>
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
                        <DialogHeader>
                            <DialogTitle>Record audio</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 my-4">
                            <AudioRecorder
                                isRecording={recording.isRecording}
                                isPaused={recording.isPaused}
                                recordedAudioUrl={recording.recordedAudioUrl}
                                handleStartRecording={recording.handleStartRecording}
                                handleStopRecording={recording.handleStopRecording}
                                handlePauseRecording={recording.handlePauseRecording}
                                handleResumeRecording={recording.handleResumeRecording}
                                handleRestartRecording={recording.handleRestartRecording}
                            />
                            <TranscriptionDisplay
                                text={transcription.transcription}
                                isLoading={transcription.isTranscribing}
                                error={transcription.errorTranscribing}
                            />
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="flex flex-col w-full my-4 gap-4">
                    <h2 className="text-2xl font-bold">My recordings</h2>
                    <div className="flex flex-col gap-4">
                        {recordings.map((recording) => (
                            <Link href={`/workspace/${recording.id}`} key={recording.id}>
                                <div className="flex w-full items-center border border-gray-200 rounded-md p-4 gap-4">
                                    <Button
                                        variant="black"
                                        size="icon"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Play className="size-4" />
                                    </Button>
                                    <div key={recording.id} className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-md font-medium leading-tight">
                                            {recording.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground text-wrap truncate">
                                            {recording.createdAt}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
