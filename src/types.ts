export type Subscriber<T extends Record<string, any>> = (data: T) => void;
