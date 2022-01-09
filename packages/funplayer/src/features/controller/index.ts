import { EVENT, TIME } from "../../constants";
import { IController } from "../../types";
import { addDispose } from "../../utils/dispose";
import { addClass, createEle, removeClass } from "../../utils/dom";
import { DomNode } from "../../utils/domNode";
import { Player } from "../../player";
import { ControllerEle } from "./elements";

const classHide = "controller_hide";
const classGradientBottomHide = "controller_gradient_bottom_hide";

export class Controller extends DomNode {
    private readonly gradientBottom: HTMLElement;

    private showTimer!: NodeJS.Timeout;

    private controllerEles: Record<keyof IController, ControllerEle>;

    constructor(private player: Player, container: HTMLElement) {
        super(container, "div.controller");
        this.gradientBottom = container.appendChild(createEle("div.controller_gradient_bottom"));

        // 创建控件元素
        this.controllerEles = {
            progress: addDispose(
                this,
                new ControllerEle(player, this.el, player.options.controller.progress),
            ),
            eles: addDispose(
                this,
                new ControllerEle(player, this.el, player.options.controller.eles),
            ),
        };

        addDispose(
            this,
            player.on(EVENT.PAUSE, () => {
                this.show();
            }),
        );

        addDispose(
            this,
            player.on(EVENT.PLAY, () => {
                this.showThenFade();
            }),
        );

        this.showThenFade();
    }

    show = (): void => {
        removeClass(this.el, classHide);
        removeClass(this.gradientBottom, classGradientBottomHide);
        this.player.el.style.cursor = "";
        this.player.emit(EVENT.CONTROLLER_SHOW);
    };

    hide = (): void => {
        addClass(this.el, classHide);
        addClass(this.gradientBottom, classGradientBottomHide);
        this.player.el.style.cursor = "none";
        this.player.emit(EVENT.CONTROLLER_HIDE);
    };

    showThenFade = (): void => {
        // eslint-disable-next-line no-debugger
        this.show();
        clearTimeout(this.showTimer);
        // this.showTimer = setTimeout(this.tryHide, TIME.CONTROLLER_BAR_HIDE);
    };

    tryHide = (): void => {
        if (this.player.video.played.length && !this.player.paused) {
            this.hide();
        }
    };
}
