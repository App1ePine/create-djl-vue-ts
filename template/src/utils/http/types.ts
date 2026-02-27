export interface Result {
  code: number;
  msg: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <no reason>
export interface ResultData<T = any> extends Result {
  data: T;
}
