export function capitalize(str: string): string {
    if (typeof str === 'undefined' || str === null || str === '') {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}
