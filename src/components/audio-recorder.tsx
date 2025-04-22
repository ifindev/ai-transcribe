import { useEffect, useRef, useState } from 'react';
import { Mic, StopCircle, RotateCcw, Pause, Play, CircleStop, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

import WaveSurfer from 'wavesurfer.js';

import { Slider } from './ui/slider';

interface AudioRecorderProps {
    isRecording: boolean;
    isPaused?: boolean;
    recordedAudioUrl: string | null;
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    handlePauseRecording?: () => void;
    handleResumeRecording?: () => void;
    handleRestartRecording: () => void;
    duration?: number;
}

export function AudioRecorder({
    isRecording,
    isPaused = false,
    recordedAudioUrl,
    handleStartRecording,
    handleStopRecording,
    handlePauseRecording,
    handleResumeRecording,
    handleRestartRecording,
    duration = 0,
}: AudioRecorderProps) {
    const waveformRef = useRef<HTMLCanvasElement>(null);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingStartTimeRef = useRef<number | null>(null);

    // Timer for recording
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRecording && !isPaused) {
            if (!recordingStartTimeRef.current) {
                recordingStartTimeRef.current = Date.now() - recordingTime * 1000;
            }

            interval = setInterval(() => {
                if (recordingStartTimeRef.current) {
                    const elapsed = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
                    setRecordingTime(elapsed);
                }
            }, 1000);
        } else if (isPaused) {
            // When paused, we store the current elapsed time but don't update it
            if (recordingStartTimeRef.current) {
                recordingStartTimeRef.current = Date.now() - recordingTime * 1000;
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused, recordingTime]);

    // Initialize audio visualization when recording starts
    useEffect(() => {
        const setupVisualization = async () => {
            if (!isRecording || !waveformRef.current) return;

            try {
                // Get the audio stream
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setAudioStream(stream);

                // Set up the audio context and analyzer
                const audioContext = new (window.AudioContext ||
                    (window as any).webkitAudioContext)();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                analyserRef.current = analyser;

                source.connect(analyser);
                analyser.fftSize = 256;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const canvas = waveformRef.current;
                const canvasCtx = canvas.getContext('2d');

                if (!canvasCtx) return;

                // Visualization function
                const draw = () => {
                    if (!isRecording) {
                        if (animationRef.current) {
                            cancelAnimationFrame(animationRef.current);
                            animationRef.current = null;
                        }
                        return;
                    }

                    if (isPaused) {
                        // If paused, we still want to keep the last visualization frame
                        if (animationRef.current) {
                            animationRef.current = requestAnimationFrame(draw);
                        }
                        return;
                    }

                    // Get the visualization data
                    analyser.getByteFrequencyData(dataArray);

                    // Clear the canvas
                    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                    // Calculate the bar width based on canvas size and buffer length
                    const barWidth = (canvas.width / bufferLength) * 2.5;
                    let x = 0;

                    // Draw the visualization bars
                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = (dataArray[i] / 255) * canvas.height;

                        // Left channel (red)
                        canvasCtx.fillStyle = i < bufferLength / 2 ? '#ef4444' : '#ffffff';

                        // Draw a bar for each frequency
                        const y = (canvas.height - barHeight) / 2;
                        canvasCtx.fillRect(x, y, barWidth - 1, barHeight);

                        x += barWidth;
                    }

                    animationRef.current = requestAnimationFrame(draw);
                };

                // Start the visualization
                draw();
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        if (isRecording) {
            setupVisualization();
        } else {
            // Reset timer when recording stops
            setRecordingTime(0);
            recordingStartTimeRef.current = null;
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }

            if (audioStream) {
                audioStream.getTracks().forEach((track) => track.stop());
                setAudioStream(null);
            }

            if (analyserRef.current) {
                analyserRef.current = null;
            }
        };
    }, [isRecording, isPaused]);

    // Handle audio player for playback
    useEffect(() => {
        if (recordedAudioUrl) {
            const audio = new Audio();

            // Set the source for the audio element
            audio.src = recordedAudioUrl;

            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleEnded = () => {
                setIsPlaying(false);
            };

            // Add event listeners for metadata, time update, and audio end

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);

            // Preload the audio and load metadata
            audio.preload = 'metadata';
            audio.load();

            // Keep a reference to the audio element
            audioRef.current = audio;

            // Clean up event listeners when component unmounts or `recordedAudioUrl` changes
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
                audio.src = '';
                audioRef.current = null;
            };
        }
    }, [recordedAudioUrl, duration]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch((err) => {
                console.error('Error playing audio:', err);
            });
            setIsPlaying(true);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || !isFinite(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {isRecording && (
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="text-center">
                        <div className={cn('text-sm', isPaused ? 'text-gray-400' : 'text-red-500')}>
                            {isPaused ? 'Paused' : 'Recording...'}
                        </div>
                    </div>

                    {/* Waveform visualization */}
                    <div className="w-full bg-black rounded-lg overflow-hidden">
                        <canvas ref={waveformRef} className="h-[80px] w-full"></canvas>
                    </div>

                    {/* Recording controls */}
                    <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2 px-4">
                        <div className="text-sm">{formatTime(recordingTime)}</div>
                        <div className="flex-1 text-center text-sm">
                            {isPaused ? 'Paused' : 'Recording'}
                        </div>
                        <div className="flex gap-2">
                            {handlePauseRecording && handleResumeRecording && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full size-9"
                                    onClick={
                                        isPaused ? handleResumeRecording : handlePauseRecording
                                    }
                                >
                                    {isPaused ? (
                                        <Play className="size-4" />
                                    ) : (
                                        <Pause className="size-4" />
                                    )}
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full size-9"
                                onClick={handleStopRecording}
                            >
                                <StopCircle className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {!isRecording && !recordedAudioUrl && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            <Button
                                variant="default"
                                size="icon"
                                className="rounded-full shadow-md z-20"
                                onClick={handleStartRecording}
                            >
                                <Mic className="size-4" />
                            </Button>
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <div className="animate-ping bg-primary size-6 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">Press to record</p>
                    </div>
                </div>
            )}

            {recordedAudioUrl && (
                <>
                    <div className="flex flex-col items-center w-full">
                        <div className="text-center mb-2">
                            <h3 className="text-md font-medium">Recorded</h3>
                            <p className="text-sm text-gray-500">
                                You can check the recording in the preview section
                            </p>
                        </div>

                        <div className="w-full flex items-center px-2 py-4 border border-gray-200 rounded-md">
                            <Button
                                variant="default"
                                size="icon"
                                className="rounded-full mr-4"
                                onClick={togglePlayPause}
                            >
                                {isPlaying ? (
                                    <Pause className="size-5" />
                                ) : (
                                    <Play className="size-5" />
                                )}
                            </Button>

                            <div className="flex-1 pt-4">
                                <div className="h-[4px] bg-gray-200 rounded-full w-full relative">
                                    <Slider
                                        value={[currentTime]}
                                        onValueChange={(value) => {
                                            if (audioRef.current) {
                                                audioRef.current.currentTime = value[0];
                                            }
                                        }}
                                        max={duration}
                                    />
                                    {/* <div
                                        className="absolute left-0 top-0 h-full bg-black rounded-full"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                    <div
                                        className="absolute top-[-3px] w-[10px] h-[10px] bg-black rounded-full"
                                        style={{
                                            left: `${progressPercentage}%`,
                                            marginLeft: '-5px',
                                        }}
                                    ></div> */}
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-500">
                                        {formatTime(currentTime)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatTime(duration)}
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-4"
                                onClick={handleRestartRecording}
                            >
                                <Trash2 className="size-4 text-gray-500" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
