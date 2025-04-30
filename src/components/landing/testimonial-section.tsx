import { Star } from 'lucide-react';
import Image from 'next/image';

export type Testimonial = {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
    stars: number;
};

export type TestimonialSectionProps = {
    testimonials: Testimonial[];
};

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
    return (
        <div className="py-16 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        What our users are saying
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Don't just take our word for it — hear from people who use our transcription
                        service
                    </p>
                </div>
                <div className="mt-12 space-y-8 lg:mt-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-6 bg-white border border-gray-100 rounded-lg shadow"
                        >
                            <div className="flex items-center mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-base text-gray-500">{testimonial.quote}</p>
                            <div className="flex items-center mt-6">
                                {testimonial.avatarUrl ? (
                                    <div className="flex-shrink-0">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={testimonial.avatarUrl}
                                            alt={testimonial.author}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                                        <span className="text-indigo-700 font-medium">
                                            {testimonial.author.substring(0, 1)}
                                        </span>
                                    </div>
                                )}
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
