import { Tooltip } from "../../../components/tooltip";
import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import { hide, show } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { Icon } from "../../icons";
import { IControllerEle } from "../types";

class WebFullscreen extends DomNode implements IControllerEle {
    readonly id = "web-fullscreen";

    toolTip!: Tooltip;

    private enterIcon!: HTMLElement;

    private exitIcon!: HTMLElement;

    init(player: Player, toolTip: Tooltip) {
        this.toolTip = toolTip;
        this.enterIcon = this.el.appendChild(Icon.webEnterFullscreen());
        this.exitIcon = this.el.appendChild(Icon.webExitFullscreen());
        if (player.webFullscreen.isActive) {
            this.enter();
        } else {
            this.exit();
        }
        addDispose(this, player.on(EVENT.WEB_ENTER_FULLSCREEN, this.enter));
        addDispose(this, player.on(EVENT.WEB_EXIT_FULLSCREEN, this.exit));
        addDisposeListener(this, this.el, "click", player.webFullscreen.toggle);
    }

    enter = () => {
        show(this.exitIcon);
        hide(this.enterIcon);
    };

    exit = () => {
        show(this.enterIcon);
        hide(this.exitIcon);
    };
}

export const webFullscreenControllerEle = () => new WebFullscreen();
