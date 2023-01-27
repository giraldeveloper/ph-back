export function getKeyByValue<T>(e: T, value: string): string {
    const indexOfFind = Object.values(e).indexOf(value as unknown as T);
    const key = Object.keys(e)[indexOfFind];
    return key;
}