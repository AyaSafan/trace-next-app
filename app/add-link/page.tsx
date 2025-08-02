"use client";

import { useState } from "react";
import { LinkItem, getLinks, saveLinks } from "@/app/lib/storage";
import Navbar from "../components/Navbar";

export default function AddLinkPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLink: LinkItem = {
      url,
      title: title.trim() || undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      description: description.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    const currentLinks = getLinks();
    const updatedLinks = [...currentLinks, newLink];
    saveLinks(updatedLinks);

    setUrl("");
    setTitle("");
    setTags("");
    setDescription("");
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Add a new link</h1>
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
          Add Link
        </button>
      </form>
    </div>
    </>
  );
}
