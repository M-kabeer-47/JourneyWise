"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, MapPin, Book, Mail, User, type LucideProps } from "lucide-react";

type IconType = (props: LucideProps) => JSX.Element;

type BottomNavItem = {
  name: string;
  href: string;
  icon: IconType;
  badge?: number;
  matchExact?: boolean; // if true, matches exact path
};

interface BottomNavbarProps {
  items?: BottomNavItem[];
  centerAction?: {
    label?: string;
    href: string;
    icon?: IconType;
  };
  className?: string;
  hideOnDesktop?: boolean;
}

const defaultItems: BottomNavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/experiences", icon: MapPin },
  { name: "Blog", href: "/blog/read", icon: Book },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Profile", href: "/profile", icon: User },
];

export default function BottomNavbar({
  items = defaultItems,
}: BottomNavbarProps) {
  const pathname = usePathname();

  const isActive = (item: BottomNavItem) => {
    if (pathname.includes(item.name.toLowerCase())) {
      return true;
    }
  };

  const containerClasses =
    "fixed bottom-8  w-[92%] max-w-md rounded-2xl bg-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-2 py-3";

  return (
    <AnimatePresence mode="wait">
      <div className="w-full  flex justify-center items-center fixed bottom-0 h-[200px]">
        <motion.nav
          key="bottom-navbar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={containerClasses}
          aria-label="Bottom Navigation"
        >
          <div className="relative flex items-center justify-between gap-2 ">
            {/* Left cluster */}

            {items.map((item) => (
              <NavItem key={item.name} item={item} active={isActive(item)} />
            ))}
          </div>
        </motion.nav>
      </div>
    </AnimatePresence>
  );
}

function NavItem({ item, active }: { item: BottomNavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={[
        "group relative",
        "px-3 py-2 rounded-xl",
        "text-charcoal hover:text-midnight-blue",
        active ? "text-midnight-blue bg-midnight-blue/5" : "hover:bg-midnight-blue/5",
        "transition-colors",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <div className="flex flex-col items-center gap-1 min-w-[56px]">
        <div className="relative">
          <Icon
            strokeWidth={2.3}
            className={`w-5 h-5 font-bold group-hover:text-midnight-blue ${
              active ? "text-midnight-blue" : "text-charcoal"
            }`}
          />
        </div>
        <span className="text-[11px]  leading-none">{item.name}</span>
      </div>
    </Link>
  );
}
