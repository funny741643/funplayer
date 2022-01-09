import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import { addClass, createEle } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { adsorb, throttle } from "../../../utils/tool";
import { IControllerEle } from "../types";
import { Drag } from "./drag";
import { Rect } from "./rect";

class Process extends DomNode implements IControllerEle {
    readonly id = "process";

    private player!: Player;

    private bars!: HTMLElement;

    private bufferBar!: HTMLElement;

    private playedBar!: HTMLElement;

    private dot!: HTMLElement;

    private indicator!: HTMLElement;

    private rect!: Rect;

    private dragging = false;

    init(player: Player) {
        this.player = player;
        addClass(this.el, "progress");

        this.bars = this.el.appendChild(createEle("div.progress_bars"));
        this.bufferBar = this.bars.appendChild(createEle("div.progress_buffer"));
        this.playedBar = this.bars.appendChild(createEle("div.progress_played"));
        this.dot = this.el.appendChild(createEle("div.progress_dot"));
        this.dot.appendChild(player.options.progressOptions?.dot || createEle("div.progress_dot_inner"));
        this.indicator = this.el.appendChild(createEle("div.progress_indicator"));
        if (player.options.progressOptions?.indicator) {
            this.indicator.appendChild(createEle("div.progress_indicator_inner"));
        }
        this.rect = addDispose(this, new Rect(this.bars, player));

        addDispose(this, new Drag(this.el, this.onDragStart, this.onDragging, this.onDragEnd));
        // addDispose(this, player.on(EVENT.TIME_UPDATE, this.updatePlayedBar));
        addDisposeListener(
            this,
            this.el,
            "mousemove",
            throttle((ev: MouseEvent) => this.updateHoverElement(ev.pageX)),
        );
    }

    private updateHoverElement(x: number): void {
        if (this.indicator) {
            this.indicator.style.left = `${adsorb(x - this.rect.x, 0, this.rect.width || 0)}px`;
        }
    }

    private onDragStart = (ev: PointerEvent): void => {
        this.dragging = true;
        this.rect.update();
        this.onDragging(ev);
    };

    private onDragging = (ev: PointerEvent): void => {
        const x = ev.pageX - this.rect.x;
        this.setPlayedBarLength(x / this.rect.width);
    };

    private onDragEnd = (ev: PointerEvent): void => {
        this.dragging = false;
    };

    private setPlayedBarLength(percentage: number): void {
        this.playedBar.style.transform = `scale(${adsorb(percentage)})`;
        this.dot.style.left = `${adsorb(percentage * this.rect.width, 0, this.rect.width || 0)}px`;
    }
    // private updatePlayedBar(): void {

    // }
}

export const processControllerEle = () => new Process();
