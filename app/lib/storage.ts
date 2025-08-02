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

export function deleteLink(createdAt: string): LinkItem[] {
    const links = getLinks();
    const updatedLinks = links.filter(link => link.createdAt !== createdAt);
    saveLinks(updatedLinks);
    return updatedLinks;
}

export function editLink(createdAt: string, updatedFields: Partial<Omit<LinkItem, "createdAt">>) {
    const links = getLinks();
    const updatedLinks = links.map(link => {
        if (link.createdAt === createdAt) {
            return { ...link, ...updatedFields, createdAt: link.createdAt };
        }
        return link;
    });
    saveLinks(updatedLinks);
}
