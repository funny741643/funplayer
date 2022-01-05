import { Player } from "../../../player";
import { IControllerEle } from "../types";
import { DomNode } from "../../../../utils/domNode";
import { hide, show } from "../../../../utils/dom";
import { Icon } from "../../icons";

class Play extends DomNode implements IControllerEle {
    readonly id = "play";

    private playIcon!: HTMLElement;

    private pauseIcon!: HTMLElement;

    tooltip!: any;

    init(player: Player, tooltip: any) {
        this.tooltip = tooltip;
        this.playIcon = this.el.appendChild(Icon.play());
        this.pauseIcon = this.el.appendChild(Icon.pause());

        if (player.paused) {
            this.onPause();
        } else {
            this.onPlay();
        }
    }

    private onPlay = () => {
        show(this.pauseIcon);
        hide(this.playIcon);
    };

    private onPause = () => {
        show(this.playIcon);
        hide(this.pauseIcon);
    };
}

export const playControllerEle = () => new Play();
