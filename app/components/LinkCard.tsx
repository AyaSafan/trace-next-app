"use client";

import { LinkItem } from "../lib/storage";

type Props = {
  link: LinkItem;
};

export default function LinkCard({ link }: Props) {
  return (
    <li className="border p-4 rounded shadow-sm">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold underline"
      >
        {link.title || link.url}
      </a>

      {link.tags && link.tags.length > 0 && (
        <p className="text-sm text-gray-600 mt-1">
          Tags:{" "}
          {link.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-200 rounded px-2 py-0.5 mr-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </p>
      )}

      {link.description && (
        <p className="mt-1 text-gray-700">{link.description}</p>
      )}

      <p className="mt-2 text-xs text-gray-400">
        Added on: {new Date(link.createdAt).toLocaleString()}
      </p>
    </li>
  );
}
