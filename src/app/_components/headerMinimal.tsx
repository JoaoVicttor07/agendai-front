import Link from "next/link";
import { ModeToggle } from "./themeToggle";

export function HeaderMinimal() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-bold">AgendAI</span>
          
        </Link>

        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}