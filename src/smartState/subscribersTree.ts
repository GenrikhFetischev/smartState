import set from "lodash.set";
import get from "lodash.get";

import { Subscriber } from "./types";

export type SubscribersTreeNode<T> = {
  __internal__subscribers: Set<Subscriber<T>>;
} & { [index: string]: SubscribersTreeNode<T> };

export class SubscribersTree<T extends Record<string, any>> {
  constructor(data: T) {
    this.transformDataToSubscribersTree(data);
  }

  tree: SubscribersTreeNode<T> = {
    __internal__subscribers: new Set(),
  } as SubscribersTreeNode<T>;

  checkIsNodeObject = (node: any): node is object =>
    typeof node === "object" && !Array.isArray(node);

  transformDataToSubscribersTree = (node: T, rootPath = "") => {
    if (rootPath !== "") {
      set(this.tree, rootPath, {
        __internal__subscribers: new Set(),
      });
    }

    if (this.checkIsNodeObject(node)) {
      Object.keys(node)
        .filter((key) => node.hasOwnProperty(key))
        .forEach((path) => {
          this.transformDataToSubscribersTree(
            node[path],
            `${rootPath === "" ? path : `${rootPath}.${path}`}`
          );
        });
    }
  };

  setSubscriber = (path: string, subscriber: Subscriber<T>) => {
    const subscribersNode = get(this.tree, path);
    if (subscribersNode && subscribersNode.__internal__subscribers) {
      subscribersNode.__internal__subscribers.add(subscriber);
    } else if (subscribersNode) {
      subscribersNode.__internal__subscribers = new Set([subscriber]);
    } else {
      set(this.tree, path, {
        __internal__subscribers: new Set([subscriber]),
      });
    }
  };

  getSubscribers = (path: string): Subscriber<T>[] => {
    const root = get(this.tree, path) as SubscribersTreeNode<T>;
    if (!root) {
      throw Error(`There is no subscribers node in path: ${path}`);
    }

    const subscribers = new Set<Subscriber<T>>();

    const nodes = [root];

    while (nodes.length) {
      const node = nodes.pop();
      [...node.__internal__subscribers.values()].forEach((subscriber) =>
        subscribers.add(subscriber)
      );

      Object.keys(node)
        .filter(
          (key) => node.hasOwnProperty(key) && key !== "__internal__subscribers"
        )
        .forEach((key) => nodes.push(node[key] as any));
    }

    path.split(".").forEach((_, i, array) => {
      if (i !== array.length - 1) {
        const path = array.slice(0, i + 1).join(".");
        const node = get(this.tree, path);
        if (node) {
          [...node.__internal__subscribers.values()].forEach((subscriber) =>
            subscribers.add(subscriber)
          );
        }
      }
    });

    return [...subscribers.values()];
  };
}
