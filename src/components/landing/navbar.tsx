'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export type NavItem = {
    label: string;
    href: string;
};

export type NavbarProps = {
    logo: string;
    navItems: NavItem[];
    ctaText: string;
    ctaLink: string;
};

export default function Navbar({ logo, navItems, ctaText, ctaLink }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-indigo-600">
                                {logo}
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-indigo-600 transition-colors duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link
                                href={ctaLink}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                {ctaText}
                            </Link>
                        </div>
                    </div>
                    <div className="flex -mr-2 md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block w-6 h-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block w-6 h-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href={ctaLink}
                            className="block w-full px-4 py-2 mt-4 text-center text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
