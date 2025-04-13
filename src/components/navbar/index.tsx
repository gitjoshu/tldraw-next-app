"use client";

import { MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import { Menubar } from "@/components/ui/menubar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const navbarItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Drawings",
    href: "/drawings",
  },
  {
    label: "Generated Image",
    href: "/drawings/generated-image",
  },
];

export const Navbar = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center min-h-14 sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-lg mx-auto flex items-center justify-between">
        <Menubar>
          {navbarItems.map((item) => (
            <MenubarMenu key={item.href}>
              <MenubarTrigger>
                <Link href={item.href}>{item.label}</Link>
              </MenubarTrigger>
            </MenubarMenu>
          ))}
        </Menubar>
        <Button
          className="h-full"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
};
