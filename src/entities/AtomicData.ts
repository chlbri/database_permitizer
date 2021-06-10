import { Entity, NOmit } from 'core_types';

export interface AtomicData<T = any>
  extends NOmit<Entity, '_id'> {
  data: T;
}
