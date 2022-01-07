import { EventEmitter } from "./utils/eventmitter";
import { Dispose } from "./utils/dispose";
import { getEle, createEle } from "./utils/dom";
import { IPlayerOptions } from "./types";
import { CLASS_PREFIX } from "./constants";
import { processOptions } from "./options";
// import { setVideoAttrs } from "./auxiliary";
import { setVideoAttrs, registerNameMap } from "./auxiliary";
import { IControllerEle } from "./features/controller/types";
import { Controller } from "./features/controller";

export class Player extends EventEmitter implements Dispose {
    container: HTMLElement | null;

    options: Required<IPlayerOptions>;

    el: HTMLDivElement;

    readonly video: HTMLVideoElement;

    private readonly controller: Controller;

    private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

    constructor(opts?: IPlayerOptions) {
        super();
        this.options = processOptions(opts);
        this.container = getEle(this.options.container);
        this.el = createEle(
            `div.${CLASS_PREFIX}`,
            { tabindex: 0 },
            undefined,
            "",
        );
        this.video = createEle("video.video");
        // console.log(this.options);
        if (this.options.src) {
            // this.options.videoProps.muted = true;
            this.options.videoProps.src = this.options.src;
        }
        setVideoAttrs(this.video, this.options.videoProps);
        this.el.appendChild(this.video);
        registerNameMap(this);

        this.controller = new Controller(this, this.el);
        // this.controller.show();
    }

    mount(container?: IPlayerOptions["container"]): void {
        if (container) this.container = getEle(container) || this.container;
        if (!this.container) return;
        this.container.appendChild(this.el);
    }

    play(): Promise<void> | void {
        return this.video.play();
    }

    pause(): Promise<void> | void {
        return this.video.pause();
    }

    // eslint-disable-next-line class-methods-use-this
    dispose(): void {}

    get paused(): boolean {
        return this.video.paused;
    }

    registerControllerEle(ele: IControllerEle, id?: string): void {
        this.controllerNameMap[id || ele.id] = ele;
    }

    getControllerEle(id: string): IControllerEle | undefined {
        return this.controllerNameMap[id];
    }

    toggle = () => {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    };
}
