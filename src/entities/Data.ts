import { Entity, NOmit } from 'core_types';
import { AtomicData } from './AtomicData';

export type ExcludeFromData =
  | keyof NOmit<AtomicData, 'data'>
  | keyof Pick<Entity, '_id'>;
/**
 * SIgnature only
 */


export type Data<T extends object> = {
  [key in keyof Omit<T, ExcludeFromData>]: AtomicData<T[key]>;
};
