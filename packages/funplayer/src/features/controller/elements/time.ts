import { Tooltip } from "../../../components/tooltip";
import { EVENT } from "../../../constants";
import { Player } from "../../../player";
import { addDispose, Dispose } from "../../../utils/dispose";
import { addClass, createEle } from "../../../utils/dom";
import { DomNode } from "../../../utils/domNode";
import { formatTime } from "../../../utils/tool";

class Time extends DomNode implements Dispose {
    readonly id = "time";

    private playedText!: HTMLSpanElement;

    private totalText!: HTMLSpanElement;

    private slashText!: HTMLSpanElement;

    private set played(n: number) {
        this.playedText.textContent = formatTime(n);
    }

    private set slash(s: string) {
        this.slashText.textContent = s;
    }

    private set total(n: number) {
        this.totalText.textContent = formatTime(n);
    }

    init(player: Player, toolTip: Tooltip) {
        addClass(this.el, "controller_time");
        this.playedText = this.el.appendChild(createEle("span"));
        this.slashText = this.el.appendChild(createEle("span"));
        this.totalText = this.el.appendChild(createEle("span"));

        this.total = player.duration;
        this.played = player.currentTime;
        addDispose(this, player.on(EVENT.TIME_UPDATE, () => {
            this.played = player.currentTime;
        }));
        this.slash = " / ";
        addDispose(this, player.on(EVENT.DURATION_CHANGE, () => {
            this.total = player.duration;
        }));
    }
}

export const timeControllerEle = () => new Time();
