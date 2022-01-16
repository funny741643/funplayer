import { I18n, MIRRORING } from "../i18n";
import { removeClass, toggleClass } from "../../utils/dom";
import { ISettingItem } from "../controller/types";

const classMirroring = "video_mirroring";
export const MirroringSettingItem = (): ISettingItem<boolean> => ({
    id: "mirroring",
    type: "switch",
    html: I18n.trans(MIRRORING),
    checked: false,
    init(player) {
        removeClass(player.video, classMirroring);
    },
    change(value, player) {
        toggleClass(player.video, classMirroring, value);
    },
});
