"use client";

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import Combobox from "@/components/ui/combobox"
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
        <Combobox
          itemList={frameworks}
          className="w-56 p-0"
          placeholder="Search Framework..."
          renderItem={(item, active) => 
            <div className="flex w-full items-center">
              <span>{item.label}</span>
              <CheckIcon className={cn("ml-auto size-4", active ? "visible" : "invisible")} />
            </div>
          }
        >
          <Button variant="outline" className="flex w-40 items-center">
            <span>combobox</span>
            <ChevronsUpDown className="ml-auto size-4" />
          </Button>
        </Combobox>
      </div>
    </section>
  )
}
