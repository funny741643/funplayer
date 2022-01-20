import { Context } from "./context";
import { processOptions } from "./options";
import { IPlayerOptions } from "./types";

export class Myplayer extends Context {
    private config: IPlayerOptions;

    constructor(options: IPlayerOptions) {
        super();
        this.config = processOptions(options);
    }
}
