import { IControllerEle } from "../features/controller/types";

export interface IController {
    progress: (IControllerEle | string)[];
    eles: (IControllerEle | string)[];
}

export interface IProgressOptions {
    dot?: HTMLElement;
    playedBg?: string;
    buffBg?: string;
    indicator?: boolean;
}

export interface IPlayerOptions {
    src?: string;
    container?: HTMLElement | string;
    video?: HTMLVideoElement;
    videoProps?: Record<string, any>;
    controller?: IController;
    progressOptions?: IProgressOptions;
}
