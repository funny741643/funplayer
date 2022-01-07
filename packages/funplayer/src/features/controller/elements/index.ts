import { addDispose, Dispose } from "../../../utils/dispose";
import { createEle } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { isString } from "../../../utils/judge";
import { Tooltip } from "../../../components/tooltip";
import { Player } from "../../../player";
import { IControllerEle } from "../types";

export class ControllerEle extends DomNode {
    private controllerEles: IControllerEle[] = [];

    constructor(
        private player: Player,
        container: HTMLElement,
        ctEles?: (IControllerEle | string)[],
    ) {
        super(container, "div.controller_ele");
        if (ctEles) {
            const frag = document.createDocumentFragment();
            ctEles.forEach((ele) => {
                // eslint-disable-next-line no-param-reassign
                ele = this.initControllerEle(ele) as IControllerEle;
                if (ele) {
                    frag.appendChild(ele.el);
                    this.controllerEles.push(ele);
                }
            });
            this.updateTooltipPos();
            this.el.appendChild(frag);
        }
    }

    updateTooltipPos() {
        const last = this.controllerEles.length - 1;
        this.controllerEles.forEach((ele, i) => {
            if (ele.tooltip) {
                ele.tooltip.resetPos();
                if (i === 0) {
                    ele.tooltip.setLeft();
                } else if (i === last) {
                    ele.tooltip.setRight();
                }
            }
        });
    }

    private getControllerEle(ele: IControllerEle | string): IControllerEle | void {
        // if (ele === "spacer") return this.spacer;
        // eslint-disable-next-line no-param-reassign
        if (isString(ele)) ele = this.player.getControllerEle(ele) as IControllerEle;
        return ele;
    }

    private initControllerEle = (ele: IControllerEle | string): IControllerEle | void => {
        // eslint-disable-next-line no-param-reassign
        ele = this.getControllerEle(ele) as IControllerEle;

        if (ele) {
            // eslint-disable-next-line no-param-reassign
            if (!ele.el) ele.el = createEle("div");

            if (ele.mounted) {
                if (ele.tooltip) {
                    ele.tooltip.resetPos();
                }
                return;
            }
        }

        let tooltip: Tooltip | undefined;
        if (ele.tip) tooltip = new Tooltip(ele.el, ele.tip);
        if (ele.init) {
            if (ele.init.length >= 2 && !tooltip) tooltip = new Tooltip(ele.el);
            ele.init(this.player, tooltip as Tooltip);
        }
        if (ele.dispose) addDispose(this, ele as Dispose);

        // eslint-disable-next-line no-param-reassign
        ele.mounted = true;
        // eslint-disable-next-line consistent-return
        return ele;
    };
}
