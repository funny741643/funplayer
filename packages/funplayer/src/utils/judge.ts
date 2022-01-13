export function isString(o: any): o is string {
    return typeof o === "string" || toString.call(o) === "[object String]";
}

export function isHTMLElement(o: any): o is HTMLElement {
    return typeof HTMLElement === "object"
        ? o instanceof HTMLElement
        : o
              && typeof o === "object"
              && o.nodeType === 1
              && typeof o.nodeName === "string";
}

export function isFunction(o: any): o is Function {
    return typeof o === "function" || toString.call(o) === "[object Boolean]";
}
