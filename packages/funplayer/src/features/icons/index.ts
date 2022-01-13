import { addClass, createSvg } from "../../utils/dom";

const play = "M276.33649907 99.58887373v824.82225254l648.0746272-412.41112627z";
const pause = "M158.5047493 924.41112627h235.66350093V99.58887373h-235.66350093v824.82225254z m471.32700047-824.82225254v824.82225254h235.66350093V99.58887373h-235.66350093z";
const volume = "M75.09333333 366.36444445v291.2711111h194.18074112l242.72592555 242.72592555V123.6385189L269.27407445 366.36444445H75.09333333z m655.36 145.63555555c0-85.68225223-49.51608889-159.71365888-121.36296334-195.39436999v391.03146666c71.84687445-35.92343666 121.36296334-109.95484445 121.36296334-195.63709667zM609.09036999 86.25872555v100.24580778c140.29558557 41.74885888 242.72592555 171.60723001 242.72592668 325.49546667s-102.43034112 283.74660779-242.72592668 325.49546667v100.24580778c194.42346667-44.1761189 339.81629667-217.72515555 339.81629668-425.74127445S803.51383666 130.43484445 609.09036999 86.25872555z";
const muted = "M730.45333333 512c0-85.68225223-49.51608889-159.71365888-121.36296334-195.39436999v107.28485888l119.17843001 119.17843001c1.45635555-10.19448889 2.18453333-20.63170333 2.18453333-31.0689189z m121.36296334 0c0 45.63247445-9.95176334 88.59496334-26.2144 128.15928889l73.54595556 73.54595556C930.70222222 653.26648889 948.90666667 584.81777778 948.90666667 512c0-207.77339221-145.39283001-381.56515555-339.81629668-425.74127445v100.24580778c140.29558557 41.74885888 242.72592555 171.60723001 242.72592668 325.49546667zM136.98844445 75.09333333L75.09333333 136.98844445 304.46933333 366.36444445H75.09333333v291.2711111h194.18074112l242.72592555 242.72592555V573.89511111l206.55976334 206.55976334c-32.52527445 25.00076999-69.17688889 45.14702222-109.46939335 57.28331776v100.24580779a435.45031111 435.45031111 0 0 0 178.88900779-87.86678557L887.01155555 948.90666667 948.90666667 887.01155555l-436.90666667-436.90666666L136.98844445 75.09333333zM512 123.6385189l-101.45943666 101.45943665L512 326.55739221V123.6385189z";
const enterFullscreen = "M217.42062487 629.83174977h-117.83175114v294.5793765h294.5793765v-117.83175114h-176.74762536v-176.74762536z m-117.83175114-235.66349954h117.83175114v-176.74762536h176.74762536v-117.83175114H99.58887373v294.5793765z m706.9905014 412.4111249h-176.74762536v117.83175114h294.5793765V629.83174977h-117.83175114v176.74762536z m-176.74762536-706.9905014v117.83175114h176.74762536v176.74762536h117.83175114V99.58887373H629.83174977z";
const exitFullscreen = "M125.36456912 732.93453212h165.70089876v165.70089876h110.46726671V622.46726541H125.36456912v110.46726671z m165.70089876-441.86906424h-165.70089876v110.46726671h276.16816547V125.36456912h-110.46726671v165.70089876z m331.40179753 607.569963h110.46726671v-165.70089876h165.70089876v-110.46726671H622.46726541v276.16816547z m110.46726671-607.569963v-165.70089876h-110.46726671v276.16816547h276.16816547v-110.46726671h-165.70089876z";

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
registerIcon("volume", createIcon(volume));
registerIcon("muted", createIcon(muted));
registerIcon("enterFullscreen", createIcon(enterFullscreen));
registerIcon("exitFullscreen", createIcon(exitFullscreen));

export { Icon };
