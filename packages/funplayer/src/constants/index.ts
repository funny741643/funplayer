export const CLASS_PREFIX = "funplayer";

export const EVENT = {
    PLAY: "Play",
    PAUSE: "Pause",
    CONTROLLER_SHOW: "ControlShow",
    CONTROLLER_HIDE: "ControlHide",
    LOADED_METADATA: "Loadedmetadata",
    UPDATE_SIZE: "UpdateSize",

    TIME_UPDATE: "TimeUpdate",
    PROGRESS: "Progress",

    VOLUME_CHANGE: "VolumeChange",
    POPOVER_SHOW_CHANGE: "PopoverShowChange",
} as const;

export const TIME = {
    CONTROLLER_BAR_HIDE: 3000,
    POPOVER_HIDE: 300,
    CLICK_TOGGLE_DELAY: 220,
};
