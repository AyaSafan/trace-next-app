"use client";

import { useState } from "react";
import { LinkItem, deleteLink } from "../lib/storage";
import { ExternalLink, Trash2 } from "lucide-react";

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      deleteLink(link.createdAt);
      setDeleted(true);
    }
  };

  if (deleted) return null;

  return (
    <li className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transition hover:shadow-xl flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-gray-800 hover:text-blue-600 flex items-center gap-2 transition"
          title={link.url}
        >
          {link.title || link.url}
          <ExternalLink size={16} className="text-blue-400" />
        </a>
        <button
          onClick={handleDelete}
          className="ml-2 p-1 rounded hover:bg-red-100 transition"
          title="Delete link"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      {link.description && (
        <p className="text-gray-600 text-sm">{link.description}</p>
      )}

      {link.tags && link.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {link.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">
          Added on: {new Date(link.createdAt).toLocaleString()}
        </span>
      </div>
    </li>
  );
}
