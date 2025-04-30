import Link from 'next/link';

export type CTASectionProps = {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
};

export default function CTASection({ title, subtitle, ctaText, ctaLink }: CTASectionProps) {
    return (
        <div className="bg-indigo-700">
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-24">
                <div className="text-center">
                    <h2 className="text-base font-semibold tracking-wider text-indigo-200 uppercase">
                        Ready to transform your meetings?
                    </h2>
                    <p className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight">
                        {title}
                    </p>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-indigo-200">{subtitle}</p>
                    <div className="mt-8">
                        <Link
                            href={ctaLink}
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-indigo-700 bg-white border border-transparent rounded-md shadow hover:bg-indigo-50 transition-colors duration-200"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
