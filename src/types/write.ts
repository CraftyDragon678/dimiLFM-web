export interface WriteProps<T> {
  verify: (isValid: boolean) => void;
  data: T;
  dataHandler: (data: T) => void;
}
