'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TranscriptionTabsProps = {
    transcription: string;
    insights: string;
    isLoading: boolean;
    error?: string;
};

export default function TranscriptionTabs({
    transcription,
    insights,
    isLoading,
    error,
}: TranscriptionTabsProps) {
    const [selectedTab, setSelectedTab] = useState<'transcription' | 'summary'>('transcription');

    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-2 text-gray-600 p-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing transcription and generating insights...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (!transcription && !insights) {
        return null;
    }

    return (
        <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as 'transcription' | 'summary')}
            className="w-full"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transcription">Transcription</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="transcription" className="p-4 bg-gray-50 rounded-md mt-2">
                {transcription ? (
                    <div className="whitespace-pre-wrap">{transcription}</div>
                ) : (
                    <p className="text-gray-500 text-center">No transcription available</p>
                )}
            </TabsContent>
            <TabsContent value="summary" className="p-4 bg-gray-50 rounded-md mt-2">
                {insights ? (
                    <div className="prose max-w-none whitespace-pre-wrap">{insights}</div>
                ) : (
                    <p className="text-gray-500 text-center">No summary available</p>
                )}
            </TabsContent>
        </Tabs>
    );
}
