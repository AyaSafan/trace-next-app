"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { LinkItem, getLinks } from "../lib/storage";
import LinkCard from "../components/LinkCard";
import Navbar from "../components/Navbar"; // <-- import navbar

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [links, setLinks] = useState<LinkItem[]>([]);

  // Middleware handles authentication, so we don't need manual redirect here

  useEffect(() => {
    if (status === "authenticated") {
      setLinks(getLinks());
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold my-3">
          Welcome, {session.user?.name}!
        </h1>

        <div>
          {links.length === 0 ? (
            <p className="text-gray-500">No saved links yet.</p>
          ) : (
            <ul className="space-y-4">
              {links.map((link, i) => (
                <LinkCard key={i} link={link} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
