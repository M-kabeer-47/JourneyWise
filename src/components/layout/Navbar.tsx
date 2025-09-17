"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  X,
  UserPlus,
  Mail,
  Home,
  MapPin,
  Book,
  ChevronDown,
  Edit,
  User,
  MessageSquare,
  Settings,
  Currency,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ui/ProfileDropdown";
import { clearUser, fetchUser, setUser } from "@/lib/redux/slices/user";
import { authClient } from "@/lib/auth/authClient";
import UserMenuSkeleton from "../skeletons/NavbarUserSkeleton";
import CurrencyDropdown from "../ui/CurrencyDropdown";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Explore", href: "/experiences", icon: <MapPin size={20} /> },
  { name: "Trips", href: "/trips", icon: <MapPin size={20} /> },
  {
    name: "Blog",
    href: "#",
    icon: <Book size={20} />,
    dropdown: [
      { name: "Read Blogs", href: "/blog/read", icon: <Book size={18} /> },
      { name: "Write a Blog", href: "/blog/write", icon: <Edit size={18} /> },
    ],
  },
  { name: "Help", href: "/help", icon: <MapPin size={20} /> },
];

const profileDropdownOptions = [
  {
    label: "Your Profile",
    href: "/profile",
    icon: <User size={16} />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageSquare size={16} />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings size={16} />,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isMobileBlogDropdownOpen, setIsMobileBlogDropdownOpen] =
    useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const blogDropdownRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user);
  const { scrollY } = useScroll();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        event.target instanceof Element &&
        !event.target.closest(".mobile-menu")
      ) {
        setIsMenuOpen(false);
      }
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      // We don't need this for desktop dropdown anymore since it's hover-based
      // But keep it for mobile
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen, isSearchOpen]);

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key="navbar"
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`fixed w-full z-50 transition-all duration-300 ${
          !isScrolled && pathName === "/"
            ? "bg-transparent"
            : "bg-midnight-blue"
        }`}
      >
        <div className={`w-full px-4 py-4 flex items-center justify-between`}>
          <Link
            href="/"
            className="text-2xl sm:text-3xl text-white font-raleway font-bold"
            prefetch={false}
          >
            JourneyWise
          </Link>

          <div className="hidden xl:flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div
                    ref={blogDropdownRef}
                    onMouseEnter={() => setIsBlogDropdownOpen(true)}
                    onMouseLeave={() => setIsBlogDropdownOpen(false)}
                  >
                    <button className="text-white font-semibold font-raleway  transition-colors duration-300 flex items-center">
                      {link.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <AnimatePresence>
                      {isBlogDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-midnight-blue rounded-md shadow-lg py-1"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              prefetch={false}
                              className="block px-4 py-2 text-sm text-white hover:bg-white/80 hover:text-white transition-colors duration-300 flex items-center"
                            >
                              {item.icon}
                              <span className="ml-2">{item.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-white font-raleway font-semibold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-5 mr-4">
            <CurrencyDropdown type="navbar" />

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-white  transition-colors p-2"
            >
              <Bell size={20} />
            </motion.button>

            <Link href="/messages" prefetch={false}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-white  transition-colors relative p-2"
              >
                <Mail size={20} />
                <span className="absolute top-0 right-0 bg-gradient-to-r from-midnight-blue to-ocean-blue text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </motion.button>
            </Link>
            {user.isLoading === true && user.user === null ? (
              <UserMenuSkeleton />
            ) : user.user ? (
              <ProfileDropdown
                userName={user.user.name || "User"}
                variant="navbar"
                showRole={false}
                options={profileDropdownOptions}
                onSignOut={() => {
                  authClient.signOut();
                  dispatch(clearUser());
                  router.push("/login");
                }}
                profileImage={user.user?.image}
              />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" prefetch={false}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="text-white transition-colors font-semibold text-sm sm:text-base"
                  >
                    Login
                  </motion.button>
                </Link>
                <span className="text-white">|</span>
                <Link href="/become-agent" prefetch={false}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`${
                      !isScrolled && pathName === "/"
                        ? "text-white"
                        : "text-accent"
                    } hover:text-white transition-colors font-semibold flex items-center text-sm sm:text-base`}
                  >
                    <UserPlus className="mr-1" size={18} />
                    <span className={`hidden sm:inline`}>Become an Agent</span>
                    <span className="sm:hidden">Agent</span>
                  </motion.button>
                </Link>
              </div>
            )}

            <button
              className="xl:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              ref={searchRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`shadow-lg absolute w-full left-0 top-full ${
                isScrolled ? "bg-midnight-blue" : "bg-transparent"
              }`}
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full p-3 pr-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ocean-blue transition-all duration-300"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-ocean-blue transition-colors">
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-64 bg-midnight-blue shadow-lg z-50 mobile-menu"
              >
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white  p-2"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <>
                          <button
                            onClick={() =>
                              setIsMobileBlogDropdownOpen(
                                !isMobileBlogDropdownOpen
                              )
                            }
                            className="w-full text-left text-white  transition-colors duration-300 flex items-center justify-between p-2"
                          >
                            <span className="flex items-center">
                              {link.icon}
                              <span className="ml-2">{link.name}</span>
                            </span>
                            <ChevronDown size={16} />
                          </button>
                          <AnimatePresence>
                            {isMobileBlogDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-2 space-y-2"
                              >
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    prefetch={false}
                                    className="block text-white  transition-colors duration-300 flex items-center p-2"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          prefetch={false}
                          className="block text-white  transition-colors duration-300 flex items-center space-x-2 p-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.icon}
                          <span>{link.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-700">
                    <Link href="/signup" prefetch={false}>
                      <button className="w-full text-left text-white  transition-colors duration-300 py-2 px-2">
                        Sign Up
                      </button>
                    </Link>
                    <Link href="/become-agent" prefetch={false}>
                      <button className="w-full text-left text-accent hover:text-white transition-colors duration-300 py-2 px-2 flex items-center">
                        <UserPlus className="mr-2" size={18} />
                        Become an Agent
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
}
