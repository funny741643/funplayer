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

// 设置数字区间
export function adsorb(n: number, lower = 0, upper = 1): number {
    return Math.max(Math.min(n, upper), lower);
}

function padStart(n: string | number, len = 2, str = "0"): string {
    // eslint-disable-next-line no-param-reassign
    n = String(n);
    if (n.length >= 2) return n;

    for (let i = 0, l = len - n.length; i < l; i++) {
        // eslint-disable-next-line no-param-reassign
        n = str + n;
    }

    return n;
}

export function formatTime(s: number): string {
    if (!Number.isFinite(s)) return "-";
    if (s <= 0) return "00:00";

    // eslint-disable-next-line no-param-reassign
    s = Math.round(s);
    if (s < 60) return `00:${padStart(s)}`;
    if (s >= 60 && s < 3600) {
        const minute = Math.floor(s / 60);
        const seconds = Math.floor(s % 60);
        return `${padStart(minute)}:${padStart(seconds)}`;
    }
    const hour = Math.floor(s / 3600);
    const minute = Math.floor(s / 3600 / 60);
    const seconds = Math.floor((s / 3600) % 60);
    return `${padStart(hour)}:${padStart(minute)}:${padStart(seconds)}`;
}

// eslint-disable-next-line consistent-return
export function deepCopy(dst: any, src: any) {
    if (typeof (src) === "object" && typeof (dst) === "object") {
        Object.keys(src).forEach((key) => {
            if (typeof (src[key]) === "object" && !(src[key] instanceof Node)) {
                if (!dst[key]) {
                    // eslint-disable-next-line no-param-reassign
                    dst[key] = src[key];
                } else {
                    deepCopy(dst[key], src[key]);
                }
            } else if (Array.isArray(src[key])) {
                // eslint-disable-next-line no-param-reassign
                dst[key] = Array.isArray(dst[key]) ? dst[key].concat(src[key]) : src[key];
            } else {
                // eslint-disable-next-line no-param-reassign
                dst[key] = src[key];
            }
        });
        return dst;
    }
}
