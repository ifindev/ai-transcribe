import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github, Linkedin } from 'lucide-react';

export type FooterLink = {
    label: string;
    href: string;
};

export type FooterColumn = {
    title: string;
    links: FooterLink[];
};

export type SocialLink = {
    platform: 'facebook' | 'twitter' | 'instagram' | 'github' | 'linkedin';
    href: string;
};

export type FooterProps = {
    logo: string;
    tagline: string;
    columns: FooterColumn[];
    socialLinks: SocialLink[];
    copyright: string;
};

const SocialIcon = ({ platform }: { platform: SocialLink['platform'] }) => {
    switch (platform) {
        case 'facebook':
            return <Facebook className="w-5 h-5" />;
        case 'twitter':
            return <Twitter className="w-5 h-5" />;
        case 'instagram':
            return <Instagram className="w-5 h-5" />;
        case 'github':
            return <Github className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
    }
};

export default function Footer({ logo, tagline, columns, socialLinks, copyright }: FooterProps) {
    return (
        <footer className="bg-gray-900">
            <div className="px-4 pt-12 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-4 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-white">
                            {logo}
                        </Link>
                        <p className="text-base text-gray-400">{tagline}</p>
                        <div className="flex space-x-6">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.platform}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <span className="sr-only">{item.platform}</span>
                                    <SocialIcon platform={item.platform} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {columns.slice(0, 2).map((column) => (
                                <div key={column.title} className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase">
                                        {column.title}
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-4">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {columns.slice(2, 4).map((column) => (
                                <div key={column.title} className="mt-12 md:mt-0">
                                    <h3 className="text-sm font-semibold tracking-wider text-gray-300 uppercase">
                                        {column.title}
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-4">
                                        {column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-base text-gray-400 hover:text-white transition-colors duration-200"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pt-8 mt-12 border-t border-gray-800">
                    <p className="text-base text-gray-400 text-center">{copyright}</p>
                </div>
            </div>
        </footer>
    );
}
