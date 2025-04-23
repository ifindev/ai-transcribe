import { useEffect, useRef } from 'react';

type Props = {
    isRecording: boolean;
    isPaused: boolean;
    audioStream: MediaStream | null;
};

/**
 * Component for rendering real-time audio waveform visualization.
 */

export default function AudioWaveform({ isRecording, isPaused, audioStream }: Props) {
    const waveformRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const setupVisualization = async () => {
            if (!isRecording || !waveformRef.current || !audioStream) return;

            try {
                const audioContext = new (window.AudioContext ||
                    (window as any).webkitAudioContext)();
                const source = audioContext.createMediaStreamSource(audioStream);
                const analyser = audioContext.createAnalyser();
                analyserRef.current = analyser;

                source.connect(analyser);
                analyser.fftSize = 256;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const canvas = waveformRef.current;
                const canvasCtx = canvas.getContext('2d');
                if (!canvasCtx) return;

                const draw = () => {
                    if (!isRecording) {
                        if (animationRef.current) {
                            cancelAnimationFrame(animationRef.current);
                            animationRef.current = null;
                        }
                        return;
                    }

                    if (isPaused) {
                        if (animationRef.current) {
                            animationRef.current = requestAnimationFrame(draw);
                        }
                        return;
                    }

                    analyser.getByteFrequencyData(dataArray);

                    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                    const barWidth = (canvas.width / bufferLength) * 2.5;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = (dataArray[i] / 255) * canvas.height;
                        canvasCtx.fillStyle = i < bufferLength / 2 ? '#ef4444' : '#ffffff';
                        const y = (canvas.height - barHeight) / 2;
                        canvasCtx.fillRect(x, y, barWidth - 1, barHeight);
                        x += barWidth;
                    }

                    animationRef.current = requestAnimationFrame(draw);
                };

                draw();
            } catch (error) {
                console.error('Error setting up visualization:', error);
            }
        };

        setupVisualization();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            if (analyserRef.current) {
                analyserRef.current = null;
            }
        };
    }, [isRecording, isPaused, audioStream]);

    return (
        <div className="w-full bg-black rounded-lg overflow-hidden">
            <canvas ref={waveformRef} className="h-[80px] w-full" />
        </div>
    );
}
