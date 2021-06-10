import {
  DSO,
  Entity,
  ID,
  IDs,
  PDP,
  PDPA
} from 'core_types';
import { Entity as E } from './entities';

export interface IDAOWithPermissions<T extends Entity = Entity> {
  readOne: <K extends (keyof E<T>)[] = (keyof E<T>)[]>(
    search: DSO<T>,
    projection?: K
  ) => PDP<E<T>, K>;

  readOneById: <K extends (keyof E<T>)[] = (keyof E<T>)[]>(
    _id: ID<T>,
    projection?: K
  ) => PDP<E<T>, K>;

  readMany: <K extends (keyof E<T>)[] = (keyof E<T>)[]>(
    search?: DSO<T>,
    options?: {
      projection?: K;
      limit?: number;
    }
  ) => PDPA<E<T>, K>;

  readManyByIds: <K extends (keyof E<T>)[] = (keyof E<T>)[]>(
    ids: IDs<T>,
    options?: {
      projection?: K;
      limit?: number;
      search?: DSO<T>;
    }
  ) => PDPA<E<T>, K>;
}
