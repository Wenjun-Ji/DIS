import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";

const SegmentHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll

  // References for each section on the page
  const contrastRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Demo", href: "#demo", ref: demoRef },
    { label: "Contrast", href: "#contrast", ref: contrastRef },
  ];

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = menuItems.find((i) => i.ref.current === entry.target);
          if (item) {
            console.log(`Section ${item.label} is intersecting`);
            setActiveLink(item.label);
          }
        }
      });
    },
    [menuItems]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    menuItems.forEach((item) => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
        console.log(`Observing ${item.label}`);
      }
    });

    return () => {
      menuItems.forEach((item) => {
        if (item.ref.current) {
          observer.unobserve(item.ref.current);
          console.log(`Stopped observing ${item.label}`);
        }
      });
    };
  }, [handleIntersection, menuItems]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="header-placeholder"></div>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`fixed-header ${isScrolled ? "scrolled" : ""}`}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarBrand className="flex items-center">
            <AcmeLogo />
            <Link href="/" className="ml-2">
              <p className="font-bold text-black">BiRefNet</p>
            </Link>
          </NavbarBrand>
          <div className="ml-auto flex items-center">
            <Link
              href="#footer"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-5 py-1.5 rounded-md shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out whitespace-nowrap"
            >
              Contact us
            </Link>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="ml-4"
            />
          </div>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex justify-between w-full">
          <div className="flex items-center">
            <NavbarBrand className="flex items-center">
              <AcmeLogo />
              <Link href="/" className="ml-2">
                <p className="font-bold text-black">BiRefNet</p>
              </Link>
            </NavbarBrand>
          </div>
          <div className="flex items-center justify-center flex-grow gap-4">
            {menuItems.map((item, index) => (
              <NavbarItem key={`${item.label}-${index}`}>
                <Link
                  color="foreground"
                  href={item.href}
                  className={`font-bold px-3 py-2 rounded-md hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out ${
                    activeLink === item.label ? "text-warning" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
          <div className="flex items-center">
            <NavbarItem className="ml-4">
              <a
                href="#footer"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-5 py-1.5 rounded-md shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out whitespace-nowrap"
              >
                Contact us
              </a>
            </NavbarItem>
          </div>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default SegmentHeader;
