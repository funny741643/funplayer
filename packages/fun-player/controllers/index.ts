import Player, { IPlugin } from "..";

class Controllers {
    private plugins: Record<string, unknown>;

    constructor(player: Player) {
        this.plugins = player.plugins;
        Object.keys(this.plugins).forEach((item) => {

        });
    }
}
