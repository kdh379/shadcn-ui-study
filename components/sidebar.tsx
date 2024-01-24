import Link from "next/link";
import { Icons, hasIcon } from "./icons";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar( props: SidebarProps ) {

    const pathname = usePathname();

    const renderIcon = ( icon: string ) => {
        if( !hasIcon(icon) ) return;

        const Icon = Icons[icon];

        return <Icon className="size-6 min-w-min" />;
    };

    return <>
        <div className="flex h-[52px] items-center justify-center">
            <Link href="/" className="w-full px-2">
                <Button variant={"outline"} className="flex w-full items-center justify-start space-x-2 px-2">
                    <Icons.gitHub className="size-6 min-w-min" />
                    <span className={cn(
                        "inline-block font-bold",
                        props.collapsed && "opacity-0 transition-all")}
                    >{siteConfig.name}</span>
                </Button>
            </Link>
        </div>
        <Separator />
        <nav>
            <ul>
                {siteConfig.mainNav.map( (nav) => (
                    <li key={nav.title} className="p-2">
                        <Link href={nav.href}>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild className={cn(!props.collapsed && "pointer-events-none")}>
                                        <Button variant={pathname === nav.href ? "default" : "ghost"} className="flex w-full items-center justify-start space-x-2 px-2">
                                            {renderIcon(nav.icon)}
                                            <span className={cn(
                                                "inline-block font-bold",
                                                props.collapsed && "opacity-0 transition-all")}
                                            >{nav.title}</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <span className="text-xs">{nav.title}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
        <Separator className="mt-auto" />
        <nav></nav>
    </>
}