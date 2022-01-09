export const CLASS_PREFIX = "funplayer";

export const EVENT = {
    PLAY: "Play",
    PAUSE: "Pause",
    CONTROLLER_SHOW: "ControlShow",
    CONTROLLER_HIDE: "ControlHide",
    LOADED_METADATA: "loadedmetadata",
    UPDATE_SIZE: "updateSize",
    TIME_UPDATE: "timeUpdate",
} as const;

export const TIME = {
    CONTROLLER_BAR_HIDE: 3000,
    POPOVER_HIDE: 300,
    CLICK_TOGGLE_DELAY: 220,
};
