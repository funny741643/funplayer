export const CLASS_PREFIX = "funplayer";

export const EVENT = {
    PLAY: "Play",
    PAUSE: "Pause",
    CONTROLLER_SHOW: "ControlShow",
    CONTROLLER_HIDE: "ControlHide",
    LOADED_METADATA: "Loadedmetadata",
    UPDATE_SIZE: "UpdateSize",

    TIME_UPDATE: "TimeUpdate",
    DURATION_CHANGE: "DurationChange",
    PROGRESS: "Progress",

    VOLUME_CHANGE: "VolumeChange",
    POPOVER_SHOW_CHANGE: "PopoverShowChange",

    ENTER_FULLSCREEN: "EnterFullscreen",
    EXIT_FULLSCREEN: "ExitFullscreen",
    WEB_ENTER_FULLSCREEN: "WebEnterFullscreen",
    WEB_EXIT_FULLSCREEN: "WebExitFullscreen",

    MOUNTED: "Mounted",
} as const;

export const TIME = {
    CONTROLLER_BAR_HIDE: 3000,
    POPOVER_HIDE: 300,
    CLICK_TOGGLE_DELAY: 220,
};
