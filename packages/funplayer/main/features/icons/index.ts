import { addClass, createSvg } from "../../../utils/dom";

const play = "M276.33649907 99.58887373v824.82225254l648.0746272-412.41112627z";
const pause = "M158.5047493 924.41112627h235.66350093V99.58887373h-235.66350093v824.82225254z m471.32700047-824.82225254v824.82225254h235.66350093V99.58887373h-235.66350093z";

function createIcon(icon: string) {
    return (cls?: string) => {
        const svg = createSvg("icon", icon);
        if (cls) addClass(svg, cls);
        return svg;
    };
}
const Icon: {
    // eslint-disable-next-line no-use-before-define
    register: typeof registerIcon;
  } & {
    // eslint-disable-next-line no-unused-vars
    [key: string]: <T extends Element>(cls?: string) => T;
  } = Object.create(null);

// eslint-disable-next-line no-unused-vars
function registerIcon(iconName: string, icon: (cls?: string) => any): void {
    Icon[iconName] = icon;
}

Object.defineProperty(Icon, "register", { value: registerIcon });

registerIcon("play", createIcon(play));
registerIcon("pause", createIcon(pause));

export { Icon };
