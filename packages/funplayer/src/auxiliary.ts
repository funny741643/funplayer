// 播放器的辅助函数

import Player from "..";
import { IPlayerOptions } from "./types";
import { playControllerEle } from "./features/controller/elements/play";
import { addDispose, Dispose } from "./utils/dispose";
import { EVENT } from "./constants";
import { processControllerEle } from "./features/controller/progress";
import { throttle } from "./utils/tool";
import { volumeControllerEle } from "./features/controller/elements/volume";

export function setVideoAttrs(video: HTMLVideoElement, opts: IPlayerOptions["videoProps"]): void {
    if (!opts) return;
    Object.keys(opts).forEach((k) => {
        video.setAttribute(k, opts[k]);
    });
}

// 在此处真正的挂载各个播放器控件
export function registerNameMap(player: Player) {
    player.registerControllerEle(playControllerEle());
    player.registerControllerEle(processControllerEle());
    player.registerControllerEle(volumeControllerEle());
}

function mark(player: Player, ori: string, event: string): Dispose {
    const fn = (ev: Event) => player.emit(event, ev);
    player.video.addEventListener(ori, fn);
    return {
        dispose: () => player.video.removeEventListener(ori, fn),
    };
}

function markThrottle(
    player: Player,
    ori: string,
    event: string,
    dom: HTMLElement | Window = player.video,
): Dispose {
    const fn = (ev: Event) => player.emit(event, ev);
    dom.addEventListener(ori, throttle(fn));
    return { dispose: () => dom.removeEventListener(ori, fn) };
}

export function markingEvent(player: Player): void {
    const dis = (d: Dispose) => addDispose(player, d);

    dis(mark(player, "play", EVENT.PLAY));
    dis(mark(player, "pause", EVENT.PAUSE));
    dis(mark(player, "loadedmetadata", EVENT.LOADED_METADATA));
    dis(mark(player, "volumechange", EVENT.VOLUME_CHANGE));
    dis(markThrottle(player, "timeupdate", EVENT.TIME_UPDATE));
    dis(markThrottle(player, "progress", EVENT.PROGRESS));
    dis(markThrottle(player, "resize", EVENT.UPDATE_SIZE, window));

    player.on(EVENT.LOADED_METADATA, () => {
        if (player.video.paused) {
            player.emit(EVENT.PAUSE);
        } else {
            player.emit(EVENT.PLAY);
        }
    });
}
