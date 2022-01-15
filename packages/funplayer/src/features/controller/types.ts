import Player from "../../..";
import { Switch } from "../../components/switch";
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

export interface ISettingItemOption<T = any> {
    html?: string;
    selectedText?: string;
    value?: T;
}

export interface ISettingItem<T = any> {
    id?: any;
    html?: string;
    type?: "switch" | "select";
    checked?: boolean;
    options?: ISettingItemOption<T>[];
    value?: T;
    init?: (player: Player, item: ISettingItem) => void;
    change?: (value: T, player: Player, item: ISettingItem) => void;
    _switch?: Switch;
    _selectedEl?: HTMLElement;
    _optionEls?: HTMLElement[];
    _optionEl?: HTMLElement;
    [key: string]: any;
}
