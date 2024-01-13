type KeyType = string | symbol | number;

export type PlanObject<K extends KeyType = string, V = unknown> = Record<K, V>;
