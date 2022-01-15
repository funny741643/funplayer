import { removeClass, toggleClass } from "../../utils/dom";
import { ISettingItem } from "../controller/types";

const classMirroring = "video_mirroring";
export const MirroringSettingItem = (): ISettingItem<boolean> => ({
    id: "mirroring",
    type: "switch",
    html: "",
    checked: false,
    init(player) {
        removeClass(player.video, classMirroring);
    },
    change(value, player) {
        toggleClass(player.video, classMirroring, value);
    },
});
