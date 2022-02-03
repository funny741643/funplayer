// 播放器配置参数

import { deepCopy } from "./utils/tool";

export interface IVideoConfigs {
    autoplay?: boolean;
    autobuffer?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    preload?: "none" | "metadata" | "auto";
    poster?: string;
    src?: string;
    crossorigin?: "anonymous" | "use-credentials";
}

export interface IPlayerConfigs {
    id: string;
    width?: number | string;
    height?: number | string;
    lang?: string;
    volume?: number;
    playbackRateUnit?: Array<number>;
    isShowCoverPreview?: boolean;
    playNext?: Array<string>;
    download?: boolean;
    screenshot?: boolean;
}

export type IPlayerOptions = IPlayerConfigs & IVideoConfigs

// 默认配置项
const defaultOptions: Partial<IPlayerOptions> = {
    width: 600,
    height: 337.5,
    lang:
        (document.documentElement.getAttribute("lang")
        || navigator.language
        || "zh-cn").toLocaleLowerCase(),
    volume: 0.6,
    playsinline: true,
    preload: "auto",
    crossorigin: "anonymous",
};

export function processOptions(options: IPlayerOptions): IPlayerOptions {
    return deepCopy(defaultOptions, options);
}

// 内置控件
const defaultController = [
    "process",
    "play",
    "volume",
    "fullscreen",
    "web-fullscreen",
    "settings",
    "time",
    "i18n",
    "replay",
    "loading",
    "error",
];
