export type Stat = {
    value: string;
    label: string;
    description: string;
};

export type StatsSectionProps = {
    stats: Stat[];
};

export default function StatsSection({ stats }: StatsSectionProps) {
    return (
        <div className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="px-6 py-10 overflow-hidden bg-white rounded-lg shadow"
                        >
                            <p className="text-4xl font-extrabold text-indigo-600">{stat.value}</p>
                            <p className="mt-1 text-xl font-semibold text-gray-900">{stat.label}</p>
                            <p className="mt-3 text-base text-gray-500">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
