import get from "lodash.get" 
export function typesafeGet<T, K1 extends keyof T>(obj: T, k1: K1):T[K1];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1]>(obj: T, k1: K1, k2: K2):T[K1][K2];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(obj: T, k1: K1, k2: K2, k3: K3):T[K1][K2][K3];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4):T[K1][K2][K3][K4];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5):T[K1][K2][K3][K4][K5];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6):T[K1][K2][K3][K4][K5][K6];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5], K7 extends keyof T[K1][K2][K3][K4][K5][K6]>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7):T[K1][K2][K3][K4][K5][K6][K7];
export function typesafeGet<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5], K7 extends keyof T[K1][K2][K3][K4][K5][K6], K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7]>(obj: T, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8):T[K1][K2][K3][K4][K5][K6][K7][K8];

export function typesafeGet(obj: any, ...keys: any) {
    return get(obj, keys.join("."))
}

