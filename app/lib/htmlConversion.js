export function trimHTML(html) {
    return html?.replace(/<[^>]*>?/g, "");
}

export function htmlListToArray(html) {
    if (!html) return [];
    return [...html?.matchAll(/<li>(.*?)<\/li>/gs)].map(match =>
        match[1].replace(/<[^>]+>/g, "").trim()
    );
}