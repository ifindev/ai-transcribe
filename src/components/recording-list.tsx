'use client';

import Link from 'next/link';
import { Play, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

type Recording = {
    id: string;
    title: string;
    createdAt: string;
};

type Props = {
    recordings: Recording[];
};

export default function RecordingList({ recordings }: Props) {
    return (
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
                            <h3 className="text-md font-medium leading-tight">{recording.title}</h3>
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
    );
}
