import { dispose, Dispose } from "./dispose";
import { createEle, removeEle } from "./dom";
import { isHTMLElement, isString } from "./judge";

// dom节点类
/**
 * container: 容器节点
 * tag: dom标签
 * attrs: dom属性
 * children: dom孩子节点
 * classPrefix: 类型前缀
 */
export class DomNode implements Dispose {
    el: HTMLElement;

    constructor(
        container?: HTMLElement,
        tag?: string | HTMLElement,
        attrs?: Record<string, any>,
        children?: string | Array<Node>,
        classPrefix?: string,
    ) {
        if (tag && !isString(tag) && isHTMLElement(tag)) {
            this.el = tag;
        } else {
            this.el = createEle(tag, attrs, children, classPrefix);
        }
        if (container) container.appendChild(this.el);
    }

    // 样式注入
    injectStyle(style?: Partial<CSSStyleDeclaration>): void {
        Object.assign(this.el.style, style);
    }

    // dom销毁?
    dispose() {
        removeEle(this.el);
        dispose(this);
    }
}
