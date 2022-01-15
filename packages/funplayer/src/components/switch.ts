import { DomNode } from "../utils/domNode";
import { toggleClass } from "../utils/dom";

const activeClass = "switch_active";

export class Switch extends DomNode {
    constructor(container: HTMLElement, value?: boolean) {
        super(container, ".switch");
        this.toggle(value || false);
    }

    toggle(value?: boolean): void {
        toggleClass(this.el, activeClass, value);
    }
}
