import { TagTuple } from 'src/data/tags';

export interface WriteProps<T> {
  verify: (isValid: boolean) => void;
  data: T;
  dataHandler: (data: T | ((prev: T) => T)) => void;
  tags: TagTuple;
}

export interface WriteFinalProps<T> {
  data: T;
}
