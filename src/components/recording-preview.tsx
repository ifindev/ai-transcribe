import { Play, Trash2 } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Button } from './ui/button';
import { formatTimeToMinutesAndSeconds } from '@/utils/formatter';
import { Slider } from './ui/slider';

type Props = {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    togglePlayPause: () => void;
    onDeleteRecording: () => void;
    onSliderChange: (value: number[]) => void;
};

export default function RecordingPreview({
    isPlaying,
    currentTime,
    duration,
    audioRef,
    togglePlayPause,
    onDeleteRecording,
    onSliderChange,
}: Props) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="text-center mb-2">
                <h3 className="text-md font-medium text-gray-900">Recorded</h3>
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
                    {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </Button>

                <div className="flex-1 pt-4">
                    <div className="h-[4px] bg-gray-200 rounded-full w-full relative">
                        <Slider
                            value={[currentTime]}
                            onValueChange={onSliderChange}
                            max={duration}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                            {formatTimeToMinutesAndSeconds(currentTime)}
                        </span>
                        <span className="text-xs text-gray-500">
                            {formatTimeToMinutesAndSeconds(duration)}
                        </span>
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="ml-4" onClick={onDeleteRecording}>
                    <Trash2 className="size-4 text-gray-500" />
                </Button>
            </div>
        </div>
    );
}
