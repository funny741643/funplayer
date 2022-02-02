import { Emitter } from "./mitt";
import { IPlayerOptions, IVideoConfigs } from "./options";
import { createEle } from "./utils/dom";

export class Context extends Emitter {
    private videoConfigs: IVideoConfigs;

    private video: HTMLVideoElement;

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
    }
}
