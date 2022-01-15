import { Popover } from "../../../components/popover";
import { Switch } from "../../../components/switch";
import { EVENT, TIME } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, addDisposeListener } from "../../../utils/dispose";
import {
    addClass, createEle, getElementSize, removeClass,
} from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { Icon } from "../../icons";
import { IControllerEle, ISettingItem, ISettingItemOption } from "../types";

const classActive = "controller_settings_active";
const classOptionActive = "controller_settings_option_active";

class Settings extends DomNode implements IControllerEle {
    readonly id = "settings";

    private player!: Player;

    private popoverTimer!: NodeJS.Timeout | null;

    private items!: ISettingItem[];

    private popover!: Popover;

    private stuffing!: HTMLElement;

    private homeEl!: HTMLElement;

    private currentOptionEl!: HTMLElement;

    init(player: Player) {
        this.player = player;
        addClass(this.el, "controller_settings");
        this.items = player.settingItems;
        this.el.appendChild(Icon.settings());
        this.stuffing = this.el.appendChild(createEle("div.controller_settings_stuffing"));
        this.popover = new Popover(this.el, { willChange: "width, height" });
        this.homeEl = this.popover.panelEl.appendChild(createEle("div"));

        addDisposeListener(this, this.el, "mouseenter", () => {
            this.show();
        });

        addDisposeListener(this, this.el, "mouseleave", () => {
            this.tryHide();
        });

        addDispose(
            this,
            player.on(EVENT.MOUNTED, () => this.showHomePage()),
        );

        addDispose(this, player.on(EVENT.POPOVER_SHOW_CHANGE, this.hideById));

        this.items.forEach((item) => item.init && item.init(player, item));

        this.renderHome();
    }

    private showHomePage(opt?: HTMLElement): void {
        // eslint-disable-next-line no-param-reassign
        if (opt) opt.style.display = "none";

        this.homeEl.style.display = "";

        const { width, height } = getElementSize(this.homeEl);

        this.popover.injectPanelStyle({
            width: `${width}px`,
            height: `${height + 10}px`, // 10 for padding
        });
    }

    private showOptionPage(opt: HTMLElement): void {
        this.homeEl.style.display = "none";
        // eslint-disable-next-line no-param-reassign
        opt.style.display = "";

        const { width, height } = getElementSize(opt);

        this.popover.injectPanelStyle({
            width: `${width}px`,
            height: `${height + 10}px`,
        });

        this.currentOptionEl = opt;
    }

    private renderHome(): void {
        this.items.forEach((item) => {
            const el = !item._switch && !item._selectedEl && !item._optionEl ? createEle("div.controller_settings_item") : null;

            if (el) {
                el.appendChild(createEle(undefined, undefined, item.html));
                if (item.type !== "switch") el.appendChild(createEle("div.spacer"));
            }

            if (item.type === "switch") {
                // eslint-disable-next-line no-param-reassign
                if (!item._switch) item._switch = new Switch(el!, item.checked);
            }

            if (item.type === "select") {
                if (!item.options || !item.options.length) return;
                if (!item._selectedEl) {
                    addClass(el!, "controller_settings_item_select");
                    // eslint-disable-next-line no-param-reassign
                    item._selectedEl = el!.appendChild(createEle("div", { "data-selected": true }));
                }
                const opt = item.options.find((x) => x.value === item.value);
                if (!opt) return;
                // eslint-disable-next-line no-param-reassign
                item._selectedEl.innerHTML = opt.selectedText || opt.html || "";
            }

            if (item._optionEl) {
                // eslint-disable-next-line no-param-reassign
                item._optionEl.style.display = "none";
            }

            if (el) {
                el.addEventListener("click", this.onItemClick(item));
                this.homeEl.appendChild(el);
            }
        });
    }

    private renderOptions(): void {
        this.items.forEach((item) => {
            if (item.type !== "select") return;

            if (!item._optionEl) {
                // eslint-disable-next-line no-param-reassign
                item._optionEl = this.popover.panelEl.appendChild(createEle("div"));
            }

            if (!item._optionEls && item.options) {
                // eslint-disable-next-line no-param-reassign
                item._optionEls = item.options.map((opt) => {
                    const optEl = item._optionEl!.appendChild(createEle("div.controller_settings_option", undefined, opt.html));
                    optEl.addEventListener("click", this.onOptionClick(item, opt));
                    return optEl;
                });
            }

            item._optionEls?.forEach((optEl, i) => {
                removeClass(optEl, classOptionActive);
                if (item.value === item.options![i].value) {
                    addClass(optEl, classOptionActive);
                }
            });

            // eslint-disable-next-line no-param-reassign
            item._optionEl.style.display = "none";
        });
    }

    private onItemClick = (item: ISettingItem) => () => {
        if (item.type === "switch") {
            // eslint-disable-next-line no-param-reassign
            item.checked = !item.checked;
            item._switch?.toggle(item.checked);
            if (item.change) item.change(item.checked, this.player, item);
        }
        if (item.type === "select") {
            this.renderOptions();
            this.showOptionPage(item._optionEl as HTMLElement);
        }
    };

    private onOptionClick = (item: ISettingItem, option: ISettingItemOption) => () => {
        if (item.value !== option.value) {
            // eslint-disable-next-line no-param-reassign
            item.value = option.value;
            if (item.change) item.change(option.value, this.player, item);
        }
        // TODO 移动端不隐藏，拥有返回按钮，pc 端点击之后直接隐藏
        this.hide();
        this.renderHome();
        this.showHomePage(item._optionEl as HTMLElement);
    };

    show = () => {
        this.player.emit(EVENT.POPOVER_SHOW_CHANGE, this.id);
        if (this.popoverTimer) {
            this.clearTimeout();
            return;
        }
        this.renderHome();
        this.stuffing.style.display = "block";
        this.popover.show();
        this.homeEl.style.display = "block";
        addClass(this.el, classActive);
    };

    tryHide(): void {
        this.popoverTimer = setTimeout(() => {
            this.hide();
        }, TIME.POPOVER_HIDE);
    }

    hide = () => {
        this.clearTimeout();
        this.stuffing.style.display = "none";
        this.popover.hide();
        this.homeEl.style.display = "none";
        removeClass(this.el, classActive);

        if (this.currentOptionEl) {
            setTimeout(() => this.showHomePage(this.currentOptionEl), 200);
        }
    };

    hideById = (id: string) => {
        if (id === this.id) return;
        this.hide();
    };

    clearTimeout = () => {
        // eslint-disable-next-line no-unused-expressions
        this.popoverTimer && clearTimeout(this.popoverTimer);
        this.popoverTimer = null;
    };
}

export const settingsControllerEle = () => new Settings();
