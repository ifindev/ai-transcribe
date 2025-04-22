import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Mic } from 'lucide-react';
import Link from 'next/link';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="px-4 flex md:hidden h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <Link href="#" className="flex items-center gap-2">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-sidebar-primary-foreground">
                            <Mic className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Transcriptly</span>
                            <span className="truncate text-xs">Modern AI Transcription</span>
                        </div>
                    </Link>
                    <SidebarTrigger className="-ml-1" />
                </header>
                <Separator />
                <div className="h-full w-full">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
