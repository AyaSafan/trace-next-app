"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { LinkItem, getLinks, filterLinks } from "../lib/storage";
import LinkCard from "../components/LinkCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar"; // <-- import navbar

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLinks, setFilteredLinks] = useState<LinkItem[]>([]);

  // Middleware handles authentication, so we don't need manual redirect here

  useEffect(() => {
    if (status === "authenticated") {
      const allLinks = getLinks();
      setLinks(allLinks);
      setFilteredLinks(allLinks);
    }
  }, [status]);

  useEffect(() => {
    const filtered = filterLinks(links, searchQuery);
    setFilteredLinks(filtered);
  }, [links, searchQuery]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold my-3">
          Welcome, {session.user?.name}!
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredLinks.length} result{filteredLinks.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        <div>
          {filteredLinks.length === 0 ? (
            <div className="text-center py-8">
              {searchQuery ? (
                <p className="text-gray-500">No links found matching "{searchQuery}"</p>
              ) : (
                <p className="text-gray-500">No saved links yet.</p>
              )}
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredLinks.map((link, i) => (
                <LinkCard key={i} link={link} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
