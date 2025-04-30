'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type HeroSectionProps = {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
};

export default function HeroSection({ title, subtitle, ctaText, ctaLink }: HeroSectionProps) {
    const [typedText, setTypedText] = useState('');
    const fullText = 'Meetings, interviews, lectures, and more...';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mb-6 text-lg text-gray-700">{subtitle}</p>
                    <p className="mb-10 text-lg font-medium text-indigo-600 h-8">
                        {typedText}
                        <span className="animate-pulse">|</span>
                    </p>
                    <Link
                        href={ctaLink}
                        className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        {ctaText}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,#818cf8,transparent)]"></div>
        </div>
    );
}
