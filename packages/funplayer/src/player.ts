import { EventEmitter } from "./utils/eventmitter";
import { addDispose, Dispose } from "./utils/dispose";
import { getEle, createEle } from "./utils/dom";
import { IPlayerOptions } from "./types";
import { CLASS_PREFIX } from "./constants";
import { processOptions } from "./options";
import { setVideoAttrs, registerNameMap, markingEvent } from "./auxiliary";
import { IControllerEle } from "./features/controller/types";
import { Controller } from "./features/controller";
import { adsorb } from "./utils/tool";
import { Fullscreen } from "./features/bind/fullScreen";

export class Player extends EventEmitter implements Dispose {
    // 播放器容器节点
    container: HTMLElement | null;

    // 播放器配置项
    options: Required<IPlayerOptions>;

    el: HTMLDivElement;

    // video节点
    readonly video: HTMLVideoElement;

    readonly fullscreen: Fullscreen;

    // video控件类
    private readonly controller: Controller;

    // video控件映射
    private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

    private prevVolume = 0.5;

    constructor(opts?: IPlayerOptions) {
        super();
        // 处理配置参数，添加默认配置，以及合并用户添加的配置参数
        this.options = processOptions(opts);
        this.container = getEle(this.options.container);
        this.el = createEle(
            `div.${CLASS_PREFIX}`,
            { tabindex: 0 },
            undefined,
            "",
        );
        // 创建video元素
        this.video = createEle("video.video");
        if (this.options.src) {
            // this.options.videoProps.muted = true;
            this.options.videoProps.src = this.options.src;
        }
        // 添加video元素属性
        setVideoAttrs(this.video, this.options.videoProps);
        // 设置事件监听器
        markingEvent(this);
        // 为video盒子节点挂载video元素
        this.el.appendChild(this.video);

        registerNameMap(this);

        this.fullscreen = addDispose(this, new Fullscreen(this));

        // 实例化video控件类
        this.controller = new Controller(this, this.el);
    }

    // 挂载video组件
    public mount(container?: IPlayerOptions["container"]): void {
        if (container) this.container = getEle(container) || this.container;
        if (!this.container) return;
        this.container.appendChild(this.el);
    }

    public play(): Promise<void> | void {
        return this.video.play();
    }

    public pause(): Promise<void> | void {
        return this.video.pause();
    }

    // eslint-disable-next-line class-methods-use-this
    dispose(): void {}

    public seek(seconds: number): void {
        this.video.currentTime = adsorb(seconds, 0, this.duration);
    }

    public eachBuffer(fn: (start: number, end: number) => boolean | void): void {
        for (let l = this.buffered.length, i = l - 1; i >= 0; i--) {
            if (fn(this.buffered.start(i), this.buffered.end(i))) {
                break;
            }
        }
    }

    get loaded(): boolean {
        return this.video.readyState >= 3;
    }

    get duration(): number {
        return this.video.duration || 0;
    }

    get buffered(): TimeRanges {
        return this.video.buffered;
    }

    get paused(): boolean {
        return this.video.paused;
    }

    get ended(): boolean {
        return this.video.ended;
    }

    get playing(): boolean {
        return !this.paused && !this.ended;
    }

    get volume(): number {
        return this.video.volume;
    }

    set volume(n: number) {
        this.video.volume = adsorb(n);
        if (this.muted && n > 0) this.muted = false;
    }

    get muted(): boolean {
        return this.video.muted || this.volume === 0;
    }

    set muted(v: boolean) {
        this.video.muted = v;
        if (v) this.volume = 0;
    }

    // 获取当前播放时间
    get currentTime(): number {
        return this.video.currentTime;
    }

    // 设置当前播放时间
    set currentTime(n: number) {
        if (!this.duration) return;
        const diff = n - this.video.currentTime;
        if (!diff) return;
        this.video.currentTime = adsorb(n, 0, this.duration);
    }

    // 注册控件元素
    registerControllerEle(ele: IControllerEle, id?: string): void {
        this.controllerNameMap[id || ele.id] = ele;
    }

    // 获取控件元素
    getControllerEle(id: string): IControllerEle | undefined {
        return this.controllerNameMap[id];
    }

    // 切换
    toggle = () => {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    };

    toggleVolume(): void {
        if (this.muted) {
            this.volume = this.prevVolume || 1;
        } else {
            this.prevVolume = this.volume;
            this.volume = 0;
        }
    }
}
