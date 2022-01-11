import Player from "../../..";
import { Tooltip } from "../../components/tooltip";
import { Dispose } from "../../utils/dispose";

export interface IControllerEle extends Partial<Dispose> {
    el: HTMLElement;
    id?: any;
    tips?: string;
    mounted?: boolean;
    // eslint-disable-next-line no-unused-vars
    init?: (player: Player, tooltip: Tooltip) => void;
    [key: string]: any;
}
