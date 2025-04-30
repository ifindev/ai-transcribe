import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type GenerateNoteButtonProps = {
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
};

export default function GenerateNoteButton({
    onClick,
    isLoading = false,
    disabled = false,
}: GenerateNoteButtonProps) {
    return (
        <Button
            variant="black"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 text-white rounded-md py-6"
            disabled={isLoading || disabled}
        >
            <Sparkles className="size-5" />
            <span>Generate note</span>
        </Button>
    );
}
