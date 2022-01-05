import Player from "../../..";
import { Dispose } from "../../../utils/dispose";

export interface IControllerEle extends Partial<Dispose> {
    el: HTMLElement;
    id?: any;
    tips?: string;
    mounted?: boolean;
    // eslint-disable-next-line no-unused-vars
    init?: (player: Player, tooltip: any) => void;
    [key: string]: any;
}
