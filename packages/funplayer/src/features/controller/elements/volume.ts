import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import {
    addClass, createEle, getEventPath, hide, show,
} from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { adsorb } from "../../../utils/tool";
import { Icon } from "../../icons";
import { Drag } from "../progress/drag";
import { Rect } from "../progress/rect";
import { IControllerEle } from "../types";

class Volume extends DomNode implements IControllerEle {
    readonly id = "volume";

    private player!: Player;

    private volumeIcon!: HTMLElement;

    private mutedIcon!: HTMLElement;

    private stuffing!: HTMLElement;

    private bars!: HTMLElement;

    private percent!: HTMLElement;

    private barWrapper!: HTMLElement;

    private volumeBar!: HTMLElement;

    private percentage!: HTMLElement;

    private dot!: HTMLElement;

    private rect!: Rect;

    init(player: Player) {
        this.player = player;

        addClass(this.el, "controller_volume");
        this.volumeIcon = this.el.appendChild(Icon.volume());
        this.mutedIcon = this.el.appendChild(Icon.muted());
        this.stuffing = this.el.appendChild(createEle("div.controller_volume_stuffing"));
        this.bars = this.el.appendChild(createEle("div.controller_volume_bars"));

        this.percent = this.bars.appendChild(createEle("span.controller_volume_percent"));
        this.barWrapper = this.bars.appendChild(createEle("div.controller_volume_bar_wrapper"));

        this.volumeBar = this.barWrapper.appendChild(createEle("div.controller_volume_bar"));
        this.volumeBar.appendChild(createEle("div.controller_volume_bar_bg"));

        this.percentage = this.volumeBar.appendChild(createEle("div.controller_volume_bar_percentage"));
        this.dot = this.volumeBar.appendChild(createEle("div.controller_volume_bar_dot"));
        this.dot.appendChild(createEle("div.controller_volume_bar_dot_inner"));

        this.rect = new Rect(this.barWrapper, player);

        addDispose(this, player.on(EVENT.VOLUME_CHANGE, this.onVolumeChange));

        addDispose(this, new Drag(this.barWrapper, this.onDragStart, this.onDragging));

        addDisposeListener(this, this.el, "click", (ev: MouseEvent) => {
            const evPaths = getEventPath(ev);
            if (evPaths.includes(this.bars)
                || evPaths.includes(this.stuffing)
            ) {
                return;
            }
            player.toggleVolume();
        });

        addDisposeListener(this, this.el, "mouseenter", () => {
            console.log("show");
            this.showBars();
        });
        addDisposeListener(this, this.el, "mouseleave", () => {
            this.tryHideBars();
        });

        addDispose(this, player.on(EVENT.POPOVER_SHOW_CHANGE, this.hideBarsById));

        this.onVolumeChange();
    }

    private onDragStart = (ev: PointerEvent) => {
        this.rect.update();
        this.onDragging(ev);
    };

    private onDragging = (ev: PointerEvent) => {
        const y = this.rect.height - (ev.y - this.rect.y);
        const v = adsorb(y / this.rect.height);
        this.player.volume = v;
    };

    private onVolumeChange = () => {
        if (this.player.muted) {
            this.mute();
        } else {
            this.unmute();
        }
        this.percent.innerHTML = Math.floor(this.player.volume * 100).toString();
        this.percentage.style.transform = `scaleY(${this.player.volume})`;
        this.dot.style.bottom = `${adsorb(this.player.volume * this.rect.height, 0, this.rect.height || 0)}px`;
    };

    private showBars(): void {
        this.player.emit(EVENT.POPOVER_SHOW_CHANGE, this.id);
        this.stuffing.style.display = "block";
        this.bars.style.display = "block";
        this.onVolumeChange();
    }

    private hideBarsById = (id: string) => {
        if (id === this.id) return;
        this.hideBars();
    };

    private hideBars(): void {
        this.stuffing.style.display = "none";
        this.bars.style.display = "none";
    }

    private tryHideBars() {
        this.hideBars();
    }

    mute(): void {
        show(this.mutedIcon);
        hide(this.volumeIcon);
    }

    unmute(): void {
        show(this.volumeIcon);
        hide(this.mutedIcon);
    }
}

export const volumeControllerEle = () => new Volume();
