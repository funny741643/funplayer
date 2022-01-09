import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { Dispose } from "../../../utils/dispose";

export class Rect implements Dispose {
    private rect!: DOMRect;

    constructor(private el: HTMLElement, private player?: Player) {
        this.rect = {} as DOMRect;
        player?.on(EVENT.UPDATE_SIZE, this.update);
    }

    update = (): void => {
        this.rect = this.el.getBoundingClientRect();
    };

    get width(): number {
        this.tryUpdate(this.rect.width);
        return this.rect.width;
    }

    get height(): number {
        this.tryUpdate(this.rect.height);
        return this.rect.height;
    }

    get x(): number {
        this.tryUpdate(this.rect.left);
        return this.rect.left;
    }

    get y(): number {
        this.tryUpdate(this.rect.top);
        return this.rect.top;
    }

    tryUpdate(v?: number) {
        if (!v) this.update();
    }

    dispose() {
        if (this.player) this.player.off(EVENT.UPDATE_SIZE, this.update);
        this.el = null!;
        this.rect = null!;
    }
}
