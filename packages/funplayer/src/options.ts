// 播放器配置参数

import { IPlayerOptions } from "./types";

const defaultOptions: Partial<IPlayerOptions> = {
    // 控件配置项
    controller: {
        progress: ["process"],
        eles: ["play", "volume", "fullScreen", "web-fullscreen", "settings", "time"],
    },
    // 设置选项
    settings: ["mirroring", "speed"],
    videoProps: {
        crossorigin: "anonymous",
        preload: "auto",
        playsinline: "true",
    },
    progressOptions: {
        indicator: true,
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
        processOptions: {
            ...defaultOptions.progressOptions,
            ...opts?.progressOptions,
        },
    };
    return res as Required<IPlayerOptions>;
}
