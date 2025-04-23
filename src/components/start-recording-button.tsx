import { Mic } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
    onStartRecording: () => void;
};

export default function StartRecordingButton({ onStartRecording }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <Button
                        variant="default"
                        size="icon"
                        className="rounded-full shadow-md z-20"
                        onClick={onStartRecording}
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
    );
}
