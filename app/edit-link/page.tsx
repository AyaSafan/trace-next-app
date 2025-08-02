"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLinks, editLink } from "@/app/lib/storage";
import Navbar from "../components/Navbar";

export default function EditLinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createdAt = searchParams.get("id");

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!createdAt) {
      setNotFound(true);
      return;
    }
    const links = getLinks();
    const link = links.find((l) => l.createdAt === createdAt);
    if (!link) {
      setNotFound(true);
      return;
    }
    setUrl(link.url);
    setTitle(link.title || "");
    setTags(link.tags ? link.tags.join(", ") : "");
    setDescription(link.description || "");
  }, [createdAt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createdAt) return;

    editLink(createdAt, {
      url,
      title: title.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      description: description.trim() || undefined,
    });

    router.push("/dashboard");
  };

  if (notFound) {
    return (
      <>
        <Navbar />
        <div className="p-6 max-w-lg mx-auto">
          <h1 className="text-xl font-bold mb-4">Link not found</h1>
          <p className="text-gray-500">The link you are trying to edit does not exist.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">Edit link</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Tags (comma separated, optional)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Description / Notes (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
          <button
            type="submit"
            className="btn btn-neutral w-full"
            disabled={!url}
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
