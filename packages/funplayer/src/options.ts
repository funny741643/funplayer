// 播放器配置参数

import { IPlayerOptions } from "./types";

// 默认配置项
const defaultOptions = {
    width: 600,
    height: 337.5,
    lang:
        (document.documentElement.getAttribute("lang")
        || navigator.language
        || "zh-cn").toLocaleLowerCase(),
    playsinline: true,
    preload: "auto",
    crossorigin: "anonymous",
    volume: 0.6,
    // 是否展示控制条，控制条由多个控件组成
    controls: true,
    // 关闭某个内部控件选项
    ignores: [],
};

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

// const defaultOptions: Partial<IPlayerOptions> = {
//     // 控件配置项
//     controller: {
//         progress: ["process"],
//         eles: ["play", "volume", "fullScreen", "web-fullscreen", "settings", "time"],
//     },
//     // 设置选项
//     settings: ["mirroring", "speed"],
//     videoProps: {
//         crossorigin: "anonymous",
//         preload: "auto",
//         playsinline: "true",
//     },
//     progressOptions: {
//         indicator: true,
//     },
// };

// export function processOptions(
//     opts?: IPlayerOptions,
// ): Required<IPlayerOptions> {
//     const res = {
//         ...defaultOptions,
//         ...opts,
//         videoProps: {
//             ...defaultOptions.videoProps,
//             ...opts?.videoProps,
//         },
//         processOptions: {
//             ...defaultOptions.progressOptions,
//             ...opts?.progressOptions,
//         },
//     };
//     return res as Required<IPlayerOptions>;
// }
