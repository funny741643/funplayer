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
    // 播放器容器节点
    container: HTMLElement | null;

    // 播放器配置项
    options: Required<IPlayerOptions>;

    el: HTMLDivElement;

    // video节点
    readonly video: HTMLVideoElement;

    // video控件类
    private readonly controller: Controller;

    // video控件映射
    private readonly controllerNameMap: Record<string, IControllerEle> = Object.create(null);

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
        // 为video盒子节点挂载video元素
        this.el.appendChild(this.video);

        registerNameMap(this);

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

    get paused(): boolean {
        return this.video.paused;
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
}
