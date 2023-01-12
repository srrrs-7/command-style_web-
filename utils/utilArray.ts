export function distinctArray(tags: string[]): string[] {
    var arr: string[] = [];
    for (var i = 0; i < tags.length; i++) {
        if (!arr.includes(tags[i])) {
            arr.push(tags[i]);
        }
    }
    return arr;
}
