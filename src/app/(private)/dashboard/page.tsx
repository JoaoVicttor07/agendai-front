import { Metadata } from "next";
import { SectionCards } from "@/components/sections-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "AgendAI - Dashboard",
};

export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      
      <div className="@container/main flex flex-1 flex-col gap-2 mt-10">
          <SectionCards />
      </div>
    </div>
  );
}
