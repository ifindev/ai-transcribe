import { Check } from 'lucide-react';
import Link from 'next/link';

export type PricingTier = {
    name: string;
    price: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    highlighted?: boolean;
};

export type PricingSectionProps = {
    title: string;
    description: string;
    tiers: PricingTier[];
};

export default function PricingSection({ title, description, tiers }: PricingSectionProps) {
    return (
        <div className="py-16 bg-gradient-to-b from-white to-indigo-50">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
                    <p className="mt-4 text-lg text-gray-500">{description}</p>
                </div>
                <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col p-8 bg-white rounded-2xl shadow-lg border ${tier.highlighted ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}
                        >
                            {tier.highlighted && (
                                <div className="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full transform -translate-y-1/2">
                                    <p className="text-xs font-semibold text-white uppercase">
                                        Most popular
                                    </p>
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                                <p className="flex items-baseline mt-4 text-gray-900">
                                    <span className="text-5xl font-extrabold tracking-tight">
                                        {tier.price}
                                    </span>
                                    {tier.price !== 'Free' && (
                                        <span className="ml-1 text-xl font-semibold">/month</span>
                                    )}
                                </p>
                                <p className="mt-6 text-gray-500">{tier.description}</p>

                                <ul role="list" className="mt-6 space-y-6">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex">
                                            <Check className="flex-shrink-0 w-6 h-6 text-indigo-500" />
                                            <span className="ml-3 text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href={tier.ctaLink}
                                className={`mt-8 w-full px-6 py-3 text-base font-medium text-center rounded-md shadow ${
                                    tier.highlighted
                                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                                        : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                                } transition-colors duration-200`}
                            >
                                {tier.ctaText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
