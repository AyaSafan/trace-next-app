export interface LinkItem {
    url: string;
    title?: string;
    tags?: string[];
    description?: string;
    createdAt: string;
}

export function getLinks(): LinkItem[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("links");
    return stored ? JSON.parse(stored) : [];
}

export function saveLinks(links: LinkItem[]) {
    localStorage.setItem("links", JSON.stringify(links));
}
