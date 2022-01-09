export function throttle(fn: Function, ctx?: any, ...argument: any[]): any {
    let pending = false;
    let first = true;
    let args: typeof argument | null = null;

    // eslint-disable-next-line func-names
    // eslint-disable-next-line consistent-return
    return function (...rest: any[]) {
        args = rest;
        if (first) {
            first = false;
            return fn.apply(ctx, args);
        }

        // eslint-disable-next-line consistent-return
        if (pending) return;
        pending = true;

        requestAnimationFrame(() => {
            fn.apply(ctx, args);
            pending = false;
        });
    };
}

export function adsorb(n: number, lower = 0, upper = 1): number {
    return Math.max(Math.min(n, upper), lower);
}
