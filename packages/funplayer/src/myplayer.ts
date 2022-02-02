import { Context } from "./context";
import { processOptions, IPlayerOptions } from "./options";
import { findDomById } from "./utils/dom";

export class Myplayer extends Context {
    private config: IPlayerOptions;

    private root: HTMLElement | null;

    constructor(options: IPlayerOptions) {
        super(options);
        this.config = processOptions(options);
        this.root = findDomById(`#${this.config.id}`);
    }
}
