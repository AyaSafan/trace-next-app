"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          LinkVault
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/add-link"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
          >
            + Add Link
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
