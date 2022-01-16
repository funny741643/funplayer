import { I18n, SPEED, NORMAL } from "../i18n";
import { ISettingItem } from "../controller/types";

export const speedSettingItem = (): ISettingItem<number> => ({
    id: "speed",
    type: "select",
    html: I18n.trans(SPEED),
    value: 1,
    options: [
        { value: 0.25, html: "0.25" },
        { value: 0.5, html: "0.5" },
        { value: 1, html: I18n.trans(NORMAL) },
        { value: 1.5, html: "1.5" },
        { value: 2, html: "2" },
    ],
    init(player) {
        // eslint-disable-next-line no-param-reassign
        player.playbackRate = 1;
    },
    change(value, player) {
        // eslint-disable-next-line no-param-reassign
        player.playbackRate = value;
        this.value = value;
    },
});
