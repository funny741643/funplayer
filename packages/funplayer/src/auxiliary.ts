// 播放器的辅助函数

import Player from "..";
import { IPlayerOptions } from "./types";
import { playControllerEle } from "./features/controller/elements/play";

export function setVideoAttrs(video: HTMLVideoElement, opts: IPlayerOptions["videoProps"]): void {
    if (!opts) return;
    Object.keys(opts).forEach((k) => {
        video.setAttribute(k, opts[k]);
    });
}

export function registerNameMap(player: Player) {
    player.registerControllerEle(playControllerEle());
}
