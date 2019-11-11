import { Observer } from './Observer.interface';

interface Observarable {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notifyObservers(...args: unknown[]): void;
}

export { Observarable };
