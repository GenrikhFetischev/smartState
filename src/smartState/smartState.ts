import {SubscribersTree} from "./subscribersTree";
import get from "lodash.get";
import set from "lodash.set";

export class SmartState<T extends object> {
  private data: T;
  private currentPath: string = "";
  private subscribersTree: SubscribersTree<T>;

  constructor(initialState?: T) {
    this.data = initialState ?? ({} as T);
    this.subscribersTree = new SubscribersTree<T>(initialState);
  }

  proxyGetter = (target: any, path: string): any => {
    this.currentPath =
      this.currentPath === "" ? path : `${this.currentPath}.${path}`;

    return this.state;
  };

  private resetTempData = () => {
    this.currentPath = "";
  };

  private notifySubscribers = (path: string) => {
    const subscribers = this.subscribersTree.getSubscribers(path);
    subscribers.forEach((subscriber) => subscriber(this.data));
  };

  getData = (_path: any, subscriber: (state: T) => void) => {
    const data = get(this.data, this.currentPath);

    this.subscribersTree.setSubscriber(this.currentPath, subscriber);

    this.resetTempData();
    return data;
  };

  setData = (_path: any, value: any) => {
    set(this.data, this.currentPath, value);
    this.notifySubscribers(this.currentPath);
    this.resetTempData();
  };

  state = new Proxy<T>({} as T, {
    get: this.proxyGetter,
  });
}
