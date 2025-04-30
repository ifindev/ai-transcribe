import Navbar from '@/components/landing/navbar';
import HeroSection from '@/components/landing/hero-section';
import FeatureSection from '@/components/landing/feature-section';
import StatsSection from '@/components/landing/stats-section';
import DemoSection from '@/components/landing/demo-section';
import TestimonialSection from '@/components/landing/testimonial-section';
import PricingSection from '@/components/landing/pricing-section';
import FAQSection from '@/components/landing/faq-section';
import CTASection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';
import { Mic, BarChart2, Clock, Cpu, Sparkles, Server } from 'lucide-react';

export default function Home() {
    // Navbar configuration
    const navItems = [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#demo' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
    ];

    // Features configuration
    const features = [
        {
            title: 'Real-time Transcription',
            description:
                'Get instant transcription as people speak. No more waiting for post-meeting notes.',
            icon: <Mic className="w-6 h-6" />,
        },
        {
            title: 'High Accuracy',
            description:
                'Our AI-powered system delivers industry-leading accuracy for clear, usable transcripts.',
            icon: <Sparkles className="w-6 h-6" />,
        },
        {
            title: 'Time-saving',
            description:
                'Focus on the conversation, not on taking notes. Save hours on meeting follow-ups.',
            icon: <Clock className="w-6 h-6" />,
        },
        {
            title: 'Advanced Processing',
            description:
                'Our system handles multiple speakers, accents, and technical terminology with ease.',
            icon: <Cpu className="w-6 h-6" />,
        },
        {
            title: 'Detailed Analytics',
            description:
                'Track speaking time, keywords, and conversation flow with our analytics dashboard.',
            icon: <BarChart2 className="w-6 h-6" />,
        },
        {
            title: 'No Infrastructure Needed',
            description: 'Cloud-based solution means no complex setup or maintenance on your end.',
            icon: <Server className="w-6 h-6" />,
        },
    ];

    // Stats configuration
    const stats = [
        {
            value: '98%',
            label: 'Accuracy Rate',
            description:
                'Our transcription engine achieves industry-leading accuracy across diverse speech patterns.',
        },
        {
            value: '5x',
            label: 'Faster Follow-ups',
            description:
                'Users report completing meeting follow-ups 5 times faster with our transcription service.',
        },
        {
            value: '10K+',
            label: 'Active Users',
            description:
                'Professionals across industries rely on our technology for their daily meetings.',
        },
    ];

    // Testimonial configuration
    const testimonials = [
        {
            quote: "Transcriptly has revolutionized how our team handles meetings. The real-time transcription is spot-on, and we've cut our meeting follow-up time in half.",
            author: 'Sarah Johnson',
            role: 'Product Manager at TechCorp',
            stars: 5,
        },
        {
            quote: 'As someone who conducts multiple interviews daily, this tool has been a game-changer. The accuracy is impressive even with technical jargon.',
            author: 'Michael Chen',
            role: 'Journalist',
            stars: 5,
        },
        {
            quote: 'The real-time transcription allows me to focus on my lectures instead of worrying about recording. My students love having the transcripts too!',
            author: 'Dr. Emily Rodriguez',
            role: 'University Professor',
            stars: 4,
        },
    ];

    // Pricing configuration
    const pricingTiers = [
        {
            name: 'Free',
            price: 'Free',
            description: 'Perfect for occasional transcription needs',
            features: [
                '30 minutes of transcription per month',
                'Standard accuracy',
                'Text export',
                'Single user',
            ],
            ctaText: 'Get Started',
            ctaLink: '/workspace',
        },
        {
            name: 'Pro',
            price: '$9.99',
            description: 'Best for regular meeting transcription',
            features: [
                '10 hours of transcription per month',
                'Enhanced accuracy',
                'Multiple export formats',
                'Speaker identification',
                'Priority support',
            ],
            ctaText: 'Start Free Trial',
            ctaLink: '/workspace',
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: '$49.99',
            description: 'For teams and organizations',
            features: [
                'Unlimited transcription',
                'Highest accuracy tier',
                'Advanced analytics',
                'Team collaboration features',
                'Custom vocabulary training',
                'Dedicated support',
            ],
            ctaText: 'Contact Sales',
            ctaLink: '/contact',
        },
    ];

    // FAQ configuration
    const faqs = [
        {
            question: 'How accurate is the transcription?',
            answer: 'Our AI transcription typically achieves 95-98% accuracy, depending on audio quality, background noise, and speaker clarity. For optimal results, we recommend using a good microphone in a quiet environment.',
        },
        {
            question: 'What languages are supported?',
            answer: "Currently, we support English (US, UK, Australia, and India), Spanish, French, German, and Japanese. We're actively working on adding more languages based on user demand.",
        },
        {
            question: 'Can it handle multiple speakers?',
            answer: 'Yes! Our AI can distinguish between different speakers in the same conversation. The Pro and Enterprise plans include speaker identification labels in the transcript.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We use industry-standard encryption for all audio and transcript data. Our servers are SOC 2 compliant, and we never share your data with third parties without explicit permission.',
        },
        {
            question: 'Do I need special equipment?',
            answer: 'No special equipment is required. A standard computer microphone or headset works well. For best results in group settings, a conference microphone is recommended but not necessary.',
        },
    ];

    // Footer configuration
    const footerColumns = [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Demo', href: '#demo' },
                { label: 'Roadmap', href: '/roadmap' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', href: '/docs' },
                { label: 'Guides', href: '/guides' },
                { label: 'API', href: '/api' },
                { label: 'Support', href: '/support' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Security', href: '/security' },
                { label: 'Cookies', href: '/cookies' },
            ],
        },
    ];

    const socialLinks = [
        { platform: 'twitter' as const, href: 'https://twitter.com' },
        { platform: 'github' as const, href: 'https://github.com' },
        { platform: 'linkedin' as const, href: 'https://linkedin.com' },
    ];

    return (
        <main>
            <Navbar
                logo="Transcriptly"
                navItems={navItems}
                ctaText="Get Started"
                ctaLink="/workspace"
            />

            <HeroSection
                title="Turn Conversations into Text, Instantly"
                subtitle="AI-powered real-time transcription for meetings, interviews, lectures, and more"
                ctaText="Start Transcribing"
                ctaLink="/workspace"
            />

            <div id="features">
                <FeatureSection
                    title="Everything you need for perfect transcription"
                    description="Our powerful AI transcription service makes capturing and organizing spoken content effortless"
                    features={features}
                />
            </div>

            <StatsSection stats={stats} />

            <div id="demo">
                <DemoSection
                    title="See it in action"
                    description="Watch how Transcriptly transforms speech to text in real-time"
                    imageSrc="/demo-app.png"
                    videoId=""
                />
            </div>

            <TestimonialSection testimonials={testimonials} />

            <div id="pricing">
                <PricingSection
                    title="Simple, transparent pricing"
                    description="Choose the plan that works for you"
                    tiers={pricingTiers}
                />
            </div>

            <div id="faq">
                <FAQSection title="Frequently Asked Questions" faqs={faqs} />
            </div>

            <CTASection
                title="Start transcribing today"
                subtitle="Join thousands of professionals who trust Transcriptly for their meeting and interview needs"
                ctaText="Try for Free"
                ctaLink="/workspace"
            />

            <Footer
                logo="Transcriptly"
                tagline="Making conversations accessible and actionable with cutting-edge AI transcription technology."
                columns={footerColumns}
                socialLinks={socialLinks}
                copyright="© 2023 Transcriptly. All rights reserved."
            />
        </main>
    );
}
