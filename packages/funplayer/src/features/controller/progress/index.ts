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
        addDispose(this, player.on(EVENT.TIME_UPDATE, this.updatePlayedBar));
        addDispose(this, player.on(EVENT.PROGRESS, this.updateBufferBar));
        addDispose(
            this,
            player.on(EVENT.UPDATE_SIZE, () => {
                if (!player.playing) this.resetPlayedBar();
            }),
        );
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

    private updatePlayedBar = (): void => {
        // eslint-disable-next-line no-useless-return
        if (this.dragging) return;
        this.setPlayedBarLength(this.player.currentTime / this.player.duration);
    };

    // eslint-disable-next-line consistent-return
    private updateBufferBar = (): void => {
        const bufferLen = this.player.buffered.length;

        if (!bufferLen) return this.setBufferBarLength(0);

        const curTime = this.player.currentTime;
        let percentage = 0;

        // eslint-disable-next-line consistent-return
        this.player.eachBuffer((start, end) => {
            if (start <= curTime && end >= curTime) {
                percentage = end / this.player.duration;
                return true;
            }
        });

        this.setBufferBarLength(percentage);
    };

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
        this.player.seek(this.getCurrentTime(ev.pageX));
    };

    private setBufferBarLength = (percentage: number): void => {
        this.bufferBar.style.transform = `scaleX(${adsorb(percentage)})`;
    };

    private resetPlayedBar() {
        this.setPlayedBarLength(this.player.currentTime / this.player.duration);
    }

    private setPlayedBarLength(percentage: number): void {
        this.playedBar.style.transform = `scale(${adsorb(percentage)})`;
        this.dot.style.left = `${adsorb(percentage * this.rect.width, 0, this.rect.width || 0)}px`;
    }

    // 根据已播进度条长度获取已播时长
    private getCurrentTime(x: number): number {
        return ((x - this.rect.x) / this.rect.width) * this.player.duration;
    }
}

export const processControllerEle = () => new Process();
