"use client"; // For usePathname()

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    // For now: Tasks, logged in: tasks, logged out: home
    { label: "Task Manager", href: "/tasks" },
    { label: "Log In", href: "/" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      {/* For now: home, logged in: tasks, logged out: home */}
      <Link href="/">
        <FaRegCheckCircle />
      </Link>
      <ul className="flex size-full justify-between items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-400": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
