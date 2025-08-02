"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Link as LinkIcon, Plus, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <Link href="/dashboard" className="text-2xl font-bold">
         <span className="inline-flex items-center gap-2">
           <LinkIcon size={24} />
           LinkVault
         </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/add-link"
            className="p-2"
            title="Add Link"
          >
            <Plus size={24} />
          </Link>

          <button
            onClick={() => signOut()}
            className="p-2"
            title="Sign out"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}