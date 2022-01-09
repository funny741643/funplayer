import { Dispose } from "../../../utils/dispose";

type Fn = (ev: PointerEvent) => any;

export class Drag implements Dispose {
    private start: Fn;

    private move: Fn;

    private end: Fn | undefined;

    private lastEv!: PointerEvent;

    private pending = false;

    constructor(private el: HTMLElement, start: Fn, move: Fn, end?: Fn) {
        this.start = start;
        this.move = move;
        this.end = end;

        this.el.addEventListener("pointerdown", this.downHandler);
        this.el.addEventListener("pointerup", this.upHandler);
        this.el.addEventListener("pointercancel", this.upHandler);
    }

    private downHandler = (ev: PointerEvent): void => {
        // 阻止事件默认行为
        ev.preventDefault();
        // 阻止事件冒泡
        ev.stopPropagation();
        this.el.setPointerCapture(ev.pointerId);
        this.el.addEventListener("pointermove", this.moveHandler);
        this.start(ev);
    };

    private upHandler = (ev: PointerEvent): void => {
        ev.preventDefault();
        ev.stopPropagation();
        this.el.releasePointerCapture(ev.pointerId);
        this.el.removeEventListener("pointermove", this.moveHandler);

        if (this.end) this.end(ev);
    };

    private moveHandler = (ev: PointerEvent): void => {
        ev.preventDefault();
        ev.stopPropagation();
        this.lastEv = ev;
        if (this.pending) return;
        this.pending = true;
        requestAnimationFrame(this.handlerMove);
    };

    private handlerMove = () => {
        this.move(this.lastEv);
        this.pending = false;
    };

    dispose(): void {
        if (!this.el) return;
        this.el.removeEventListener("pointerdown", this.downHandler);
        this.el.removeEventListener("pointerup", this.upHandler);
        this.el.removeEventListener("pointercancel", this.upHandler);
        this.el.removeEventListener("pointermove", this.moveHandler);
        this.start = null!;
        this.move = null!;
        this.end = null!;
        this.lastEv = null!;
        this.el = null!;
    }
}
