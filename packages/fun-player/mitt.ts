type Handler<T = unknown> = (event: T) => void;

export type EventHandlerList<T = unknown> = Array<Handler<T>>

export type EventHandlerMap<Events extends Record<string, unknown>> = Map<
    string, EventHandlerList<Events[keyof Events]>
>

export interface IEmitter {
    on(type: string, handler: Handler): void;

    fire(type: string): void;

    removeListener(type: string, handler?: Handler): void;

    removeAllListener(type?: string): void;
}

export class Emitter implements IEmitter {
    private all = new Map();

    on(type: string, handler: Handler) {
        const handlers: Array<Handler> | undefined = this.all!.get(type);
        if (handlers) {
            handlers.push(handler);
        } else {
            this.all!.set(type, [handler] as EventHandlerList<unknown>);
        }
    }

    fire(type: string, evt?: unknown) {
        const handlers = this.all!.get(type);
        if (handlers) {
            // eslint-disable-next-line array-callback-return
            (handlers as EventHandlerList<unknown>).slice().map((handler) => {
                handler(evt!);
            });
        }
    }

    removeListener(type: string, handler?: Handler<unknown>): void {
        const handlers: Array<Handler> | undefined = this.all!.get(type);
        if (handlers) {
            if (handler) {
                // eslint-disable-next-line no-bitwise
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            } else {
                this.all!.set(type, []);
            }
        }
    }

    removeAllListener(type?: string): void {
        if (!type) {
            this.all.clear();
        } else {
            this.all!.set(type, []);
        }
    }
}
