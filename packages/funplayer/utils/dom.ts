import { isString, isHTMLElement } from "./judge";
import { CLASS_PREFIX } from "../constants";

// e.g. 'div#id.className' to get 'div', 'id', '.className'
const SELECTOR_REGEX = /([\w-]+)?(?:#([\w-]+))?((?:\.(?:[\w-]+))*)/;

export function getEle(
    el: HTMLElement | string | undefined,
): HTMLElement | null {
    if (!el) return null;
    if (isString(el)) return document.querySelector(el);
    if (isHTMLElement(el)) return el;

    throw new Error(
        "The container element you are currently passing in is not an HTML element",
    );
}

export function createEle<T extends HTMLElement>(
    tag?: string,
    attrs?: Record<string, any>,
    children?: string | Array<Node>,
    classPrefix = CLASS_PREFIX,
): T {
    const diviTag = classPrefix === "" ? "" : "_";

    let match: string[] = [];
    if (tag) {
        match = SELECTOR_REGEX.exec(tag) || [];
    }

    const ele = document.createElement(match[1] || "div");

    // eslint-disable-next-line prefer-destructuring
    if (match[2]) ele.id = match[2];

    if (match[3]) {
        ele.className = match[3]
            .replace(/\./g, `${classPrefix}${diviTag}`)
            .trim();
    }

    if (attrs) {
        Object.keys(attrs).forEach((attr) => {
            const value = attrs[attr];
            if (value === undefined) return;
            if (/^on\w+$/.test(attr)) {
                (ele as any)[attr] = value;
            } else {
                ele.setAttribute(attr, value);
            }
        });
    }

    if (children) {
        if (isString(children)) {
            ele.innerHTML = children;
        } else {
            children.forEach((c) => ele.appendChild(c));
        }
    }

    return ele as T;
}
