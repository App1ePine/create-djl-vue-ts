export interface Result {
  code: number;
  message: string;
  success?: boolean;
}

// biome-ignore lint/suspicious/noExplicitAny: <no reason>
export interface ResultData<T = any> extends Result {
  data: T;
}
