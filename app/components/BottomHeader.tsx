import React from "react";

import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconMessageCircle,
  IconBolt,
  IconInfoCircle,
} from "@tabler/icons-react";

const Index = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },
    {
      title: "Chat",
      icon: (
        <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#chat",
    },
    {
      title: "Features",
      icon: (
        <IconBolt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#features",
    },
    {
      title: "About",
      icon: (
        <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com",
    },
  ];
      
    {/* Aceternity UI Floating Dock - Fixed at bottom */}
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    <FloatingDock
        mobileClassName="translate-y-20"
        items={links}
    />
    </div>
};

export default Index;
