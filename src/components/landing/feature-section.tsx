import { Mic, BarChart2, Clock, Cpu, Sparkles, Server } from 'lucide-react';

export type Feature = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

export type FeatureSectionProps = {
    title: string;
    description: string;
    features: Feature[];
};

export default function FeatureSection({ title, description, features }: FeatureSectionProps) {
    return (
        <div className="py-16 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
                        Features
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {title}
                    </p>
                    <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">{description}</p>
                </div>

                <div className="mt-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col p-6 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-md bg-indigo-100 text-indigo-600">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="flex-1 text-base text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
