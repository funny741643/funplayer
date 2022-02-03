import { Context } from "./context";
import { processOptions, IPlayerOptions } from "./options";
import { addClass, createEle, findDomById } from "./utils/dom";

interface IPlugin {
    name: string;
    descriptor: unknown;
}

export class Player extends Context {
    private config: IPlayerOptions;

    private root: HTMLElement | null;

    private controls: HTMLElement;

    private static readonly plugins: Record<string, unknown> = Object.create(null);

    constructor(options: IPlayerOptions) {
        super(options);
        this.config = processOptions(options);
        this.root = findDomById(`#${this.config.id}`);
        this.controls = createEle("div.controls", {
            onselectstart: "return false",
            unselectable: "on",
        });
        addClass((this.root as HTMLElement), "player");
        this.root?.appendChild(this.controls);

        if (this.config.width) {
            if (typeof this.config.width !== "number") {
                (this.root as HTMLElement).style.width = this.config.width;
            } else {
                (this.root as HTMLElement).style.width = `${this.config.width}px`;
            }
        }

        if (this.config.height) {
            if (typeof this.config.height !== "number") {
                (this.root as HTMLElement).style.height = this.config.height;
            } else {
                (this.root as HTMLElement).style.height = `${this.config.height}px`;
            }
        }
    }

    // 插件安装
    static install(name: string, descriptor: unknown) {
        if (!this.plugins[name]) {
            this.plugins[name] = descriptor;
        }
    }

    // 安装插件列表
    static installAll(list: Array<IPlugin>) {
        list.forEach((item) => {
            Player.install(item.name, item.descriptor);
        });
    }
}
