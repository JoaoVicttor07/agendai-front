"use client";

import { SidebarIcon, Plus, Bell } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { ModeToggle } from "@/app/_components/themeToggle";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>

        <Separator orientation="vertical" className="mr-2 h-4" />

        <ModeToggle />
        <SearchForm className="w-full hidden sm:block sm:w-auto" />

        <Button className="ml-auto bg-blue-600 text-white dark:hover:bg-blue-800 cursor-pointer">
          <Plus />
          Novo agendamento
        </Button>

        <Button variant="ghost" size="sm" className="relative hover:bg-accent">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
