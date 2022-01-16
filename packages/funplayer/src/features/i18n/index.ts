import { isBrowser } from "../../utils/env";

const data: Record<string, Record<string, string>> = Object.create(null);

export const I18n = {
    currentLang: "",
    defaultLang: "",
    trans(key: string, lang?: string): string {
        return data[lang || this.currentLang || this.defaultLang]?.[key] || key;
    },
    add(lang: string, transData: Record<string, string>): void {
        data[lang.toLowerCase()] = { ...data[lang.toLowerCase()], ...transData };
    },
    setCurrentLang(lang?: string): void {
        this.currentLang = lang
            || navigator.language
            || (navigator as any).browserLanguage
            || (navigator as any).userLanguage;
        if (this.currentLang) {
            this.currentLang = this.currentLang.toLowerCase();
        }
    },
    setDefaultLang(lang?: string): void {
        this.defaultLang = (lang || "").toLowerCase();
    },
};

export const PLAY = "Play";
export const PAUSE = "Pause";
export const MIRRORING = "Mirroring";
export const SPEED = "Speed";
export const NORMAL = "Normal";
export const WEB_FULL_SCREEN = "Web fullscreen";
export const WEB_EXIT_FULL_SCREEN = "Exit web fullscreen";
export const FULL_SCREEN = "Fullscreen";
export const EXIT_FULL_SCREEN = "Exit fullscreen";
export const LOOP = "Loop";
export const FORWARD = "Forward";
export const REWIND = "Rewind";
export const SECOND = "Second";
export const SECONDS = "Seconds";

I18n.add("zh-cn", {
    [PLAY]: "播放",
    [PAUSE]: "暂停",
    [MIRRORING]: "镜像",
    [SPEED]: "播放速度",
    [NORMAL]: "正常",
    [WEB_FULL_SCREEN]: "网页全屏",
    [WEB_EXIT_FULL_SCREEN]: "退出网页全屏",
    [FULL_SCREEN]: "全屏",
    [EXIT_FULL_SCREEN]: "退出全屏",
    [LOOP]: "循环播放",
    [FORWARD]: "快进",
    [REWIND]: "快退",
    [SECOND]: "秒",
    [SECONDS]: "秒",
});

if (isBrowser) I18n.setCurrentLang();
