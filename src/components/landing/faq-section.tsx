'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type FAQ = {
    question: string;
    answer: string;
};

export type FAQSectionProps = {
    title: string;
    faqs: FAQ[];
};

export default function FAQSection({ title, faqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-16 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="pt-6">
                                <dt className="text-lg">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="flex items-start justify-between w-full text-left text-gray-400"
                                    >
                                        <span className="font-medium text-gray-900">
                                            {faq.question}
                                        </span>
                                        <span className="flex items-center ml-6 h-7">
                                            {openIndex === index ? (
                                                <ChevronUp className="w-6 h-6 text-indigo-500" />
                                            ) : (
                                                <ChevronDown className="w-6 h-6 text-gray-400" />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {openIndex === index && (
                                    <dd className="mt-2 pr-12">
                                        <p className="text-base text-gray-500">{faq.answer}</p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
