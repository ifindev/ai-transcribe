'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from './ui/scroll-area';

export type PopoverSelectorOption = {
    value: string;
    label: string;
    flag?: string;
};

export type PopoverSelectorProps = {
    options: PopoverSelectorOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function PopoverSelector({
    options,
    value,
    onChange,
    placeholder = 'Select language',
    className = '',
}: PopoverSelectorProps) {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between', className)}
                >
                    {value ? (
                        <div className="flex items-center gap-2">
                            {selectedOption?.flag && (
                                <span role="img" aria-label={selectedOption.label}>
                                    {selectedOption.flag}
                                </span>
                            )}
                            <span>{selectedOption?.label}</span>
                        </div>
                    ) : (
                        placeholder
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                className="w-full p-0"
                onWheel={(e) => {
                    e.stopPropagation();
                }}
            >
                <Command>
                    <CommandInput placeholder={`Search language...`} className="h-9" />
                    <CommandList>
                        <ScrollArea className="h-60 overflow-auto">
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? '' : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            {option.flag && (
                                                <span role="img" aria-label={option.label}>
                                                    {option.flag}
                                                </span>
                                            )}
                                            {option.label}
                                        </div>
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
