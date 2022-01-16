import { Player } from "../../../player";
import { IControllerEle } from "../types";
import { DomNode } from "../../../utils/domNode";
import { hide, show } from "../../../utils/dom";
import { Icon } from "../../icons";
import { Tooltip } from "../../../components/tooltip";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import { EVENT } from "../../../constants";
import { I18n, PAUSE, PLAY } from "../../i18n";

class Play extends DomNode implements IControllerEle {
    readonly id = "play";

    private playIcon!: HTMLElement;

    private pauseIcon!: HTMLElement;

    tooltip!: Tooltip;

    init(player: Player, tooltip: Tooltip) {
        this.tooltip = tooltip;
        this.playIcon = this.el.appendChild(Icon.play());
        this.pauseIcon = this.el.appendChild(Icon.pause());

        if (player.paused) {
            this.onPause();
        } else {
            this.onPlay();
        }
        addDispose(this, player.on(EVENT.PLAY, this.onPlay));
        addDispose(this, player.on(EVENT.PAUSE, this.onPause));
        addDisposeListener(this, this.el, "click", player.toggle);
    }

    private onPlay = () => {
        show(this.pauseIcon);
        hide(this.playIcon);
        this.tooltip.html = I18n.trans(PAUSE);
    };

    private onPause = () => {
        show(this.playIcon);
        hide(this.pauseIcon);
        this.tooltip.html = I18n.trans(PLAY);
    };
}

export const playControllerEle = () => new Play();
