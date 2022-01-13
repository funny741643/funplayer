import { EVENT } from "../../constants";
import { Player } from "../../player";
import { addDisposeListener, dispose, Dispose } from "../../utils/dispose";
import { isIOS } from "../../utils/env";
import { isFunction } from "../../utils/judge";

export class Fullscreen implements Dispose {
    private player!: Player;

    private target!: HTMLElement;

    private readonly prefix = this.getPrefix();

    constructor(player: Player) {
        this.player = player;

        addDisposeListener(
            this,
            document,
            this.prefix === "ms"
                ? "MSFullscreenChange"
                : (`${this.prefix}fullscreenchange` as any),
            () => {
                let evt = "";
                if (this.isActive) {
                    evt = EVENT.ENTER_FULLSCREEN;
                } else {
                    evt = EVENT.EXIT_FULLSCREEN;
                }
                this.player.emit(evt);
            },
        );

        this.setTarget();
    }

    // eslint-disable-next-line class-methods-use-this
    private getPrefix(): string {
        if (isFunction(document.exitFullscreen)) return "";

        let prefix = "";
        ["webkit", "moz", "ms"].forEach((p) => {
            if (
                isFunction((document as any)[`${p}ExitFullscreen`])
                || isFunction((document as any)[`${p}CancelFullscreen`])
            ) {
                prefix = p;
            }
        });
        return prefix;
    }

    // eslint-disable-next-line class-methods-use-this
    get fullscreenElement(): HTMLElement {
        return (
            document.fullscreenElement
            || (document as any).mozFullScreenElement
            || (document as any).msFullscreenElement
            || (document as any).webkitFullscreenElement
        );
    }

    // eslint-disable-next-line class-methods-use-this
    get requestFullscreen(): Element["requestFullscreen"] {
        return (
            HTMLElement.prototype.requestFullscreen
            || (HTMLElement.prototype as any).webkitRequestFullscreen
            || (HTMLElement.prototype as any).mozRequestFullScreen
            || (HTMLElement.prototype as any).msRequestFullscreen
        );
    }

    get isActive(): boolean {
        return this.fullscreenElement === this.target;
    }

    setTarget(dom?: HTMLElement, video?: HTMLVideoElement): void {
        this.target = (dom && isIOS ? video : dom) || (isIOS ? this.player.video : this.player.el);
        if (this.isActive) this.enter();
    }

    enter(): void {
        this.requestFullscreen.call(this.target, { navigationUI: "hide" });
        // this.player.emit(EVENT.UPDATE_SIZE);
    }

    dispose(): void {
        if (!this.player) return;
        this.player.off(EVENT.ENTER_FULLSCREEN);
        this.player.off(EVENT.EXIT_FULLSCREEN);
        this.player = null!;
        dispose(this);
    }
}
