import { IControllerEle } from "../main/features/controller/types";

export interface IController {
    eles: (IControllerEle | string)[];
}

export interface IPlayerOptions {
    src?: string;
    container?: HTMLElement | string;
    video?: HTMLVideoElement;
    videoProps?: Record<string, any>;
    controller?: IController;
}
