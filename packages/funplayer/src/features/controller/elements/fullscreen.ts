import { Tooltip } from "../../../components/tooltip";
import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose } from "../../../utils/dispose";
import { hide, show } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { Icon } from "../../icons";
import { IControllerEle } from "../types";

class FullScreen extends DomNode implements IControllerEle {
    readonly id = "fullScreen";

    private player!: Player;

    private toolTip!: Tooltip;

    private enterIcon!: HTMLElement;

    private exitIcon!: HTMLElement;

    init(player: Player, toolTip: Tooltip) {
        this.player = player;
        this.toolTip = toolTip;
        this.enterIcon = this.el.appendChild(Icon.enterFullscreen());
        this.exitIcon = this.el.appendChild(Icon.exitFullscreen());
        addDispose(this, player.on(EVENT.ENTER_FULLSCREEN, this.enter));
        addDispose(this, player.on(EVENT.EXIT_FULLSCREEN, this.exit));
        if (player.fullscreen.isActive) {
            this.enter();
        } else {
            this.exit();
        }
    }

    enter() {
        show(this.exitIcon);
        hide(this.enterIcon);
    }

    exit() {
        show(this.enterIcon);
        hide(this.exitIcon);
    }
}

export const fullScreenControllerEle = () => new FullScreen();
