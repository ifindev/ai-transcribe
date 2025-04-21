import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-center text-indigo-900">
                Welcome to AI Transcriber
            </h1>
            <Link
                href="/workspace"
                className="font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-fit"
            >
                Start Transcribing
            </Link>
        </div>
    );
}
