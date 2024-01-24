"use client";

import "@/styles/globals.css"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { PropsWithChildren, useState } from "react"
import { cn } from "@/lib/utils";

export default function Provider( props: PropsWithChildren ) {
    const [collapsed, setCollapsed] = useState(false);

    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ResizablePanelGroup 
            direction="horizontal"
            className="relative flex min-h-screen"
        >
            <ResizablePanel
                className={cn("absolute -left-32 h-screen min-w-[55px] max-w-60 xl:static", collapsed && "transition-all duration-300 ease-in-out")}
                defaultSize={12}
                minSize={10}
                collapsible
                onCollapse={() => setCollapsed(true)}
                onExpand={() => setCollapsed(false)}
            >
                <Sidebar collapsed={collapsed} />
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden xl:flex"/>
            <ResizablePanel>
                <div className="flex-1">{props.children}</div>
            </ResizablePanel>
        </ResizablePanelGroup>
        <TailwindIndicator />
    </ThemeProvider>;
}