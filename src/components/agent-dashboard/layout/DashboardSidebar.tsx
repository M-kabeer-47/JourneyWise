






"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Users,
  Calendar,
  MessageCircle,
  Settings,
  HelpCircle,
  Plus,
  BookOpen,
  PenSquare,
} from "lucide-react";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Logo from "@/components/ui/Logo";

const AgentSidebar = () => {
  const pathname = usePathname();

  // Main navigation links
  const mainLinks = [
    {
      label: "Dashboard",
      href: "/agent",
      icon: (
        <LayoutDashboard
          className={`w-5 h-5 ${
            pathname === "/agent"
              ? "text-white"
              : "text-gray-300 dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Bookings",
      href: "/agent/bookings",
      icon: (
        <Calendar
          className={`w-5 h-5 ${
            pathname.includes("/agent/bookings")
              ? "text-white"
              : "text-gray-300 dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Experiences",
      href: "/agent/experiences",
      icon: (
        <Compass
          className={`w-5 h-5 ${
            pathname.includes("/agent/experiences")
              ? "text-white"
              : "text-gray-300 dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Clients",
      href: "/agent/clients",
      icon: (
        <Users
          className={`w-5 h-5 ${
            pathname.includes("/agent/clients")
              ? "text-white"
              : "text-gray-300 dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Messages",
      href: "/agent/messages",
      icon: (
        <MessageCircle
          className={`w-5 h-5 ${
            pathname.includes("/agent/messages")
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
  ];

  // Content creation links
  const contentLinks = [
    {
      label: "Create Experience",
      href: "/agent/experiences/create",
      icon: (
        <Plus
          className={`w-5 h-5 ${
            pathname === "/agent/experiences/create"
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Write Blog",
      href: "/agent/blogs/create",
      icon: (
        <PenSquare
          className={`w-5 h-5 ${
            pathname === "/agent/blogs/create"
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Plan Trip",
      href: "/agent/trips/create",
      icon: (
        <BookOpen
          className={`w-5 h-5 ${
            pathname === "/agent/trips/create"
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
  ];

  // Settings and support links
  const settingsLinks = [
    {
      label: "Settings",
      href: "/agent/settings",
      icon: (
        <Settings
          className={`w-5 h-5 ${
            pathname.includes("/agent/settings")
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
    {
      label: "Help & Support",
      href: "/agent/support",
      icon: (
        <HelpCircle
          className={`w-5 h-5 ${
            pathname === "/agent/support"
              ? "text-white"
              : "text-white dark:text-neutral-400"
          }`}
        />
      ),
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="bg-midnight-blue dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        {/* Logo section */}
        <div className="flex items-center mb-8 py-4 o">
          <img src="/white_logo2.png" alt="Logo" className="h-[40px]" />
          {open && (
          <Logo className="text-white text-xl" />
          )
          }
        </div>

        {/* Main navigation */}
        <div className="mb-8">
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className={`rounded-sm px-2 text-white ${
                  pathname === link.href || pathname.includes(link.href)
                    ? "bg-ocean-blue/40 text-white font-medium"
                    : "hover:bg-white/15 dark:hover:bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content creation */}
        <div className="mb-8">
          <div className="space-y-1">
            {contentLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className={`rounded-sm px-2 text-white ${
                  pathname === link.href
                    ? "bg-ocean-blue/40  text-white font-medium"
                    : "hover:bg-white/15 dark:hover:bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Settings and support */}
        <div className="mb-8">
          <div className="space-y-1">
            {settingsLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                className={`px-2 rounded-sm text-white ${
                  pathname === link.href || pathname.includes(link.href)
                    ? "bg-ocean-blue/40  text-white font-medium"
                    : "hover:bg-white/15 dark:hover:bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default AgentSidebar;
