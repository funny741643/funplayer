import { EventEmitter } from "../utils/eventmitter";
import { Dispose } from "../utils/dispose";
import { getEle, createEle } from "../utils/dom";
import { IPlayerOptions } from "../types";
import { CLASS_PREFIX } from "../constants";

export class Player extends EventEmitter implements Dispose {
    container: HTMLElement | null;

    options: Required<IPlayerOptions>;

    el: HTMLDivElement;

    constructor(opts?: IPlayerOptions) {
        super();
        this.options = opts as Required<IPlayerOptions>;
        this.container = getEle(this.options.container);
        this.el = createEle(
            `div.${CLASS_PREFIX}`,
            { tabindex: 0 },
            undefined,
            "",
        );
    }

    mount(container?: IPlayerOptions["container"]): void {
        if (container) this.container = getEle(container) || this.container;
        if (!this.container) return;
        this.container.appendChild(this.el);
    }

    // eslint-disable-next-line class-methods-use-this
    dispose(): void {}
}
