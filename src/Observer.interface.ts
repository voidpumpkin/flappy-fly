export interface Observer {
    notify(...args: unknown[]): void;
}
