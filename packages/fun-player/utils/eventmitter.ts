// 事件处理器
import { Dispose } from "./dispose";

export class EventEmitter {
    private _events: Record<string, Array<Function>>;

    constructor() {
        this._events = Object.create(null);
    }

    /**
     * 事件触发器
     * @param evt 事件名称
     * @param args 触发参数
     * @returns boolean
     */
    emit(evt: string, ...args: any[]): boolean {
        if (!this._events[evt]) return false;

        const fns = [...this._events[evt]];
        fns.forEach((fn) => {
            fn.apply(this, args);
        });

        return true;
    }

    /**
     * 事件注册器
     * @param evt 事件名称
     * @param fn 事件处理方法
     * @returns 事件销毁对象
     */
    on(evt: string, fn?: Function): Dispose {
        if (typeof fn !== "function") {
            throw new TypeError(
                "The event-triggered callback must be a function.",
            );
        }

        if (!this._events[evt]) {
            this._events[evt] = [fn];
        } else {
            this._events[evt].push(fn);
        }

        return { dispose: this.off.bind(this, evt, fn) };
    }

    /**
     * 事件注销器, 移除某一事件的某一个处理器
     * @param evt 事件名
     * @param fn 事件处理函数
     * @returns this
     */
    off(evt: string, fn?: Function): this {
        if (!this._events[evt]) return this;
        if (!fn) {
            // eslint-disable-next-line no-unused-expressions
            this._events[evt] && (this._events[evt].length = 0);
            return this;
        }

        let cb;
        const cbLen = this._events[evt].length;
        for (let i = 0; i < cbLen; i++) {
            cb = this._events[evt][i];
            if (cb === fn) {
                this._events[evt].splice(i, 1);
                break;
            }
        }

        return this;
    }

    /**
     * 移除所有事件处理器
     * @param evt 事件名称
     * @returns this
     */
    removeAllListeners(evt?: string): this {
        if (evt) {
            // eslint-disable-next-line no-unused-expressions
            this._events[evt] && (this._events[evt].length = 0);
        } else {
            this._events = Object.create(null);
        }

        return this;
    }
}
