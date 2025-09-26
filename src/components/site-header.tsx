"use client"

import { SidebarIcon, Plus } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import { ModeToggle } from "@/app/_components/themeToggle"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

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

        <Button className="ml-auto h-8 bg-sidebar-primary text-white">
          <Plus/>
          Novo agendamento
          </Button>
        
        
        
        
      </div>
    </header>
  )
}
