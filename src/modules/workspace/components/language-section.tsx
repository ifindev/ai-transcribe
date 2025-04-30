import React, { useState } from 'react';
import { Languages } from 'lucide-react';
import PopoverSelector, { PopoverSelectorOption } from '@/components/popover-selector';
import { languageOptions } from '@/constants/language.constant';

export type TranscriptionLanguageSectionProps = {
    onChange: (language: string) => void;
    language: string;
};

export default function TranscriptionLanguageSection({
    onChange,
    language,
}: TranscriptionLanguageSectionProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Audio language</h3>
            </div>

            <PopoverSelector
                options={languageOptions}
                value={language}
                onChange={(value) => onChange(value)}
                placeholder="Select language"
            />

            <p className="text-sm text-gray-500">
                You can use AI auto-detect to detect the audio language and note generation
                language.
            </p>
        </div>
    );
}
