import { useEffect, useRef, useState } from 'react';

/**
 * Hook to manage playback of recorded audio.
 * @param recordedAudioUrl URL of the recorded audio.
 * @returns Playback state and handlers.
 */
export function useAudioPlayback({ recordedAudioUrl }: { recordedAudioUrl: string | null }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (recordedAudioUrl) {
            const audio = new Audio();
            audio.src = recordedAudioUrl;

            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleEnded = () => {
                setIsPlaying(false);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);

            audio.preload = 'metadata';
            audio.load();

            audioRef.current = audio;

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
                audio.src = '';
                audioRef.current = null;
            };
        }
    }, [recordedAudioUrl]);

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

    const handleSliderChange = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    return {
        isPlaying,
        currentTime,
        audioRef,
        togglePlayPause,
        handleSliderChange,
    };
}
