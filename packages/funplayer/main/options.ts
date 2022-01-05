import { IPlayerOptions } from "../types";

const defaultOptions: Partial<IPlayerOptions> = {
    videoProps: {
        crossorigin: "anonymous",
        preload: "auto",
        playsinline: "true",
    },
};

export function processOptions(opts?: IPlayerOptions): Required<IPlayerOptions> {
    const res = {
        ...defaultOptions,
        ...opts,
        videoProps: {
            ...defaultOptions.videoProps,
            ...opts?.videoProps,
        },
    };
    return res as Required<IPlayerOptions>;
}
