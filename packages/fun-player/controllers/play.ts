import Player, { IPlugin } from "..";
import { Icon } from "../icons";
import { createEle } from "../utils/dom";

export class Play {
    readonly name = "play";

    constructor(player: Player) {
        const playBtn = createEle("div.play");
        playBtn.appendChild(Icon.play());
        player.controls.appendChild(playBtn);
    }
}

export const play:IPlugin = {
    name: "play",
    descriptor: (player: Player) => new Play(player),
};
