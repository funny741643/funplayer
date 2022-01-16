import { Tooltip } from "../../../components/tooltip";
import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import { hide, show } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { EXIT_FULL_SCREEN, FULL_SCREEN, I18n } from "../../i18n";
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
        if (player.fullscreen.isActive) {
            this.enter();
        } else {
            this.exit();
        }
        addDispose(this, player.on(EVENT.ENTER_FULLSCREEN, this.enter));
        addDispose(this, player.on(EVENT.EXIT_FULLSCREEN, this.exit));
        addDisposeListener(this, this.el, "click", () => player.fullscreen.toggle(true));
    }

    enter = () => {
        show(this.exitIcon);
        hide(this.enterIcon);
        this.toolTip.html = I18n.trans(EXIT_FULL_SCREEN);
    };

    exit = () => {
        show(this.enterIcon);
        hide(this.exitIcon);
        this.toolTip.html = I18n.trans(FULL_SCREEN);
    };
}

export const fullScreenControllerEle = () => new FullScreen();
