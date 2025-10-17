import { SidebarIcon, Plus } from "lucide-react";

import { ModeToggle } from "@/app/_components/themeToggle";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { NotificationsPanel } from "./notifications-panel";

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

        <Button className="ml-auto bg-blue-600 text-white dark:hover:bg-blue-800 cursor-pointer">
          <Plus />
          Novo agendamento
        </Button>
        <NotificationsPanel />
      </div>
    </header>
  );
}
