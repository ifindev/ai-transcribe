'use client';

import * as React from 'react';
import { AudioLines, Folder, Mic, Plus, Settings } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const folders = [
    {
        title: 'Folder 1',
        id: 'folder-1',
    },
    {
        title: 'Folder 2',
        id: 'folder-2',
    },
    {
        title: 'Folder 3',
        id: 'folder-3',
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="p-0">
                            <Link href="/workspace">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-sidebar-primary-foreground">
                                    <Mic className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Transcriptly</span>
                                    <span className="text-xs">Modern AI Transcription</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="hover:bg-gray-800/90 hover:text-white"
                            >
                                <Link
                                    href="/workspace"
                                    className={cn(
                                        'font-medium',
                                        pathname.includes('workspace') && 'bg-gray-800 text-white',
                                    )}
                                >
                                    <AudioLines className="size-4" />
                                    Recording Workspace
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {folders.map((folder) => (
                                    <SidebarMenuSubItem key={folder.title}>
                                        <SidebarMenuSubButton asChild>
                                            <button className="flex w-full items-center gap-2 hover:cursor-pointer">
                                                <Folder />
                                                {folder.title}
                                            </button>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarMenuButton variant="outline">
                        <Plus />
                        Create new folder
                    </SidebarMenuButton>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="hover:bg-gray-800/90 hover:text-white"
                        >
                            <Link
                                href="/settings"
                                className={cn(
                                    'font-medium',
                                    pathname === '/settings' && 'bg-gray-800 text-white',
                                )}
                            >
                                <Settings className="size-4" />
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
