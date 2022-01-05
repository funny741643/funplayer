import { isString, isHTMLElement } from "./judge";
import { CLASS_PREFIX } from "../constants";

// e.g. 'div#id.className' to get 'div', 'id', '.className'
const SELECTOR_REGEX = /([\w-]+)?(?:#([\w-]+))?((?:\.(?:[\w-]+))*)/;

const svgNS = "http://www.w3.org/2000/svg";

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

export function removeEle(el: Element): void {
    if (!el) return;
    if (el.remove) {
        el.remove();
    } else if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

export function show(node: HTMLElement | SVGElement): void {
    // eslint-disable-next-line no-param-reassign
    node.style.display = "";
}

export function hide(node: HTMLElement | SVGElement): void {
    // eslint-disable-next-line no-param-reassign
    node.style.display = "none";
}

export function addClass<T extends Element>(dom: T, cls = "", prefix = CLASS_PREFIX): T {
    // eslint-disable-next-line no-param-reassign
    cls = cls.trim();
    if (!cls) return dom;
    if (dom.classList) {
        cls.split(" ").forEach((c) => dom.classList.add(`${prefix}_${c}`));
    } else {
        const oldCls = (dom.className && (dom.className as any).baseVal) || "";
        dom.setAttribute(
            "class",
            (oldCls ? `${oldCls} ` : "")
          + cls
              .split(" ")
              .map((c) => prefix + c)
              .join(" "),
        );
    }
    return dom;
}

export function createSvg(cls?: string, d?: string, viewBox = "0 0 1024 1024"): SVGSVGElement {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", viewBox);
    if (cls) addClass(svg, cls);
    if (d) {
        const path = document.createElementNS(svgNS, "path");
        path.setAttributeNS(null, "d", d);
        svg.appendChild(path);
    }
    return svg;
}
