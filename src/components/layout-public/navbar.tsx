"use client";

import { ArrowUpRight, LogIn, Phone, TextAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Logo from "@/assests/logo/logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useGetMe } from "@/hooks";
import UserDropdown from "./userDropdown";

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  {
    title: "Report an issue",
    href: "/complaints/new",
  },
  {
    title: "Track a request",
    href: "/complaints/track",
  },
  {
    title: "Departments",
    href: "/departments",
  },
  {
    title: "SLA & transparency",
    href: "/sla",
  },
  {
    title: "Help centre",
    href: "/help",
  },
];

const ReportButton = ({ className }: { className?: string }) => (
  <Button
    asChild
    className={cn(
      "group relative h-8 w-fit overflow-hidden ps-4 pe-11 text-sm font-medium transition-all duration-300 hover:pe-4",
      className,
    )}
  >
    <Link href="/complaints/new">
      <span className="relative z-10 transition-all duration-300">
        Report an issue
      </span>

      <span className="absolute right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight size={10} />
      </span>
    </Link>
  </Button>
);

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = useCallback(() => { setSticky(window.scrollY >= 50) }, []);
  const { data: user, isLoading } = useGetMe();

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <div>
      <header className="bg-background fixed top-0 left-0 z-50 w-full transition-all duration-500">
        <div className="container mx-auto w-full px-4 py-4 sm:px-6">
          <nav
            className={cn(
              "flex h-fit w-full items-center justify-between gap-3.5 transition-all duration-500 lg:gap-6",
              sticky
                ? "rounded-full border border-border/40 bg-background/60 p-2.5 shadow-2xl shadow-primary/5 backdrop-blur-lg"
                : "border border-transparent bg-transparent",
            )}
          >
            <Link
              href="/"
              aria-label="CityCare home"
              className="flex shrink-0 items-center gap-2.5 ps-2 lg:ps-4"
            >
              <Image
                src={Logo}
                alt="CityCare"
                width={50}
                height={50}
                className="h-7 w-auto object-contain lg:h-15"
                priority
              />
            </Link>

            <div className="hidden lg:block">
              <NavigationMenu className="max-lg:hidden rounded-full bg-muted p-0.5">
                <NavigationMenuList className="flex gap-0">
                  {navigationData.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink
                        href={navItem.href}
                        className="rounded-full px-4 py-2 text-sm font-medium tracking-normal text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-xs hover:outline hover:outline-border hover:outline-transparent"
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-5">
              {
  user?.data ? (
    <UserDropdown user={user.data} />
  ) : (
    <Link href="/login">
      <Button
        variant="outline"
        className="hidden lg:flex gap-2 h-8 px-4 border border-primary/60"
      >
        <LogIn className="size-4 text-primary" />
        Login
      </Button>
    </Link>
  )
}
              <ReportButton className="hidden lg:flex" />

              <div className="lg:hidden">
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-full border border-border bg-background p-2 transition-colors outline-none">
                    <TextAlignJustify size={20} />
                    <span className="sr-only">Menu</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="mt-2 w-56">
                    {navigationData.map((item) => (
                      <DropdownMenuItem key={item.title} asChild>
                        <Link
                          href={item.href}
                          className="w-full cursor-pointer text-sm font-medium"
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
