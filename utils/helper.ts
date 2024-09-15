export function generateUniqueId() {
    return Math.random().toString(36).slice(2, 9);
}

export function debounceInput<T extends (...args: any[]) => void>(fn: T, delay: number = 500): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout | null;

    return function (this: any, ...args: Parameters<T>): void {
        if (timer) {
            clearTimeout(timer);
        }

        const context = this;

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}
