export interface WriteProps<T> {
  verify: (isValid: boolean) => void;
  data: T;
  dataHandler: (data: T | ((prev: T) => T)) => void;
}

export interface WriteFinalProps<T> {
  data: T;
}
