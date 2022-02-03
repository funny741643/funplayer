import { DomListener } from "./dom";

// 注销接口
export interface Dispose {
    dispose: () => void;
}

// 注销器集合
const disposeMap: Map<any, Array<Dispose>> = new Map();

// 获取注销器集合
export function getDisposeMap(): Map<any, Array<Dispose>> {
    return disposeMap;
}

// 给注销器集合，增添注销器
export function addDispose<T extends Dispose>(key: any, d: T): T {
    if (!disposeMap.has(key)) disposeMap.set(key, []);
    disposeMap.get(key)?.push(d);
    return d;
}

// 注销
export function dispose(key: any): void {
    if (disposeMap.has(key)) {
        disposeMap.get(key)?.forEach((item) => item.dispose());
        disposeMap.delete(key);
    }
}

// 为添加监听器并注册其注销器
export function addDisposeListener<K extends keyof GlobalEventHandlersEventMap>(
    key: any,
    node: EventTarget,
    type: K,
    handler: (event: GlobalEventHandlersEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
): DomListener {
    const domListener = new DomListener(node, type, handler, options);
    if (key) addDispose(key, domListener);
    return domListener;
}
