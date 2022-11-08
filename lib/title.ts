export function createTitle(title?: string) {
    const siteTitle = "Blue Scripture";
    if (!title) {
        return siteTitle;
    }

    return `${title} | ${siteTitle}`;
}
