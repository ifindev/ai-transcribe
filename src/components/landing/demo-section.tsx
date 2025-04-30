'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export type DemoSectionProps = {
    title: string;
    description: string;
    imageSrc: string;
    videoId?: string;
};

export default function DemoSection({ title, description, imageSrc, videoId }: DemoSectionProps) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <div className="py-16 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-lg text-gray-500">{description}</p>
                </div>
                <div className="mt-12 relative mx-auto max-w-5xl rounded-lg shadow-lg overflow-hidden">
                    {!showVideo && (
                        <>
                            <div className="relative">
                                <Image
                                    src={imageSrc}
                                    alt="Demo screenshot"
                                    width={1200}
                                    height={675}
                                    className="w-full rounded-lg"
                                />
                                {videoId && (
                                    <button
                                        onClick={() => setShowVideo(true)}
                                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                                    >
                                        <div className="flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    {showVideo && videoId && (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
