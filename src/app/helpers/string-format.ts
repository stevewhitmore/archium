export function formatPagePath(title) {
    return title.toLowerCase()
                .split(' ').join('-')
                .replace(/[^0-9a-z -]/gi, '');
}