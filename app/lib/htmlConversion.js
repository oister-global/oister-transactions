export function trimHTML(html) {
    return html?.replace(/<[^>]*>?/g, "");
}

export function htmlListToArray(html) {
    if (!html) return [];
    return [...html?.matchAll(/<li>(.*?)<\/li>/gs)].map(match =>
        match[1].replace(/<[^>]+>/g, "").trim()
    );
}

// Extracts each <li>'s inner HTML, preserving inline tags such as <strong>
// so emphasis survives. Use with dangerouslySetInnerHTML on each item.
export function htmlListToHtmlArray(html) {
    if (typeof html !== "string") return Array.isArray(html) ? html : [];
    return [...html.matchAll(/<li>(.*?)<\/li>/gs)].map(match => match[1].trim());
}