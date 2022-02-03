import Player from ".";
import { Emitter } from "./mitt";
import { IPlayerOptions, IVideoConfigs } from "./options";
import { createEle } from "./utils/dom";

export class Context extends Emitter {
    private videoConfigs: IVideoConfigs;

    protected video: HTMLVideoElement;

    private events: Array<Record<string, string>> = [
        "play",
        "playing",
        "pause",
        "ended",
        "error",
        "waiting",
        "canplay",
        "canplaythrough",
        "seeking",
        "seeked",
        "ratechange",
        "loadedmetadata",
        "volumechange",
        "durationchange",
        "loadeddate",
        "loadstart",
        "timeupdate",
    ].map((item) => ({
        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`,
    }));

    constructor(options: IPlayerOptions) {
        super();
        this.videoConfigs = {
            autoplay: options.autoplay,
            autobuffer: options.autobuffer,
            loop: options.loop,
            muted: options.muted,
            playsinline: options.playsinline,
            preload: options.preload,
            poster: options.poster,
            src: options.src,
            crossorigin: options.crossorigin,
        };
        this.video = createEle("video", this.videoConfigs);
        console.log(this.events);
        this.registerAllEvent();
    }

    private registerAllEvent(): void {
        this.events.forEach((item) => {
            this.registerEvent(item);
        });
    }

    private registerEvent(eventItem: Record<string, string>): void {
        const fn = (ev: Event) => this.fire(Object.keys(eventItem)[0]);
        this.video.addEventListener(Object.keys(eventItem)[0], fn);
    }
}
