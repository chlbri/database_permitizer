import {
  Entity,
  IDAO,
  NExclude,
  PromiseReturnData as PD
} from 'core_types';
import {
  readMany,
  readManyByIds,
  readOne,
  readOneById
} from './constants/strings';
import { IDAOWithPermissions } from './DAOWithPermissions';
import { ExcludeFromData } from './entities';

interface IDAOPermission<T extends Entity = Entity> {
  superAdmin: string;
  group: Rules<T>;
  other: Rules<T>;
}

export type IDAOPermissions<T extends Entity = Entity> = {
  [key in keyof IDAO<any>]: IDAOPermission<T>;
};

export type IActorPermissions = {
  [key in keyof IDAO<any>]: string[];
};

// #region GetPass

export type GetPassOne<T extends Entity = Entity> = Parameters<
  IDAOWithPermissions<T>[typeof readOne]
>;

export type GetPassOneById<
  T extends Entity = Entity
> = Parameters<IDAOWithPermissions<T>[typeof readOneById]>;

export type GetPassMany<T extends Entity = Entity> = Parameters<
  IDAOWithPermissions<T>[typeof readMany]
>;

export type GetPassManyByIds<
  T extends Entity = Entity
> = Parameters<IDAOWithPermissions<T>[typeof readManyByIds]>;

// #endregion

// #region _GetPass

export type _GetPassOne<T extends Entity = Entity> = (
  permission: string,
  ...args: Parameters<IDAOWithPermissions<T>[typeof readOne]>
) => PD<
  | undefined
  | boolean
  | [string, NExclude<keyof T, ExcludeFromData>[]]
>;

export type _GetPassOneById<T extends Entity = Entity> = (
  permission: string,
  ...args: Parameters<IDAOWithPermissions<T>[typeof readOneById]>
) => PD<
  | boolean
  | [string, NExclude<keyof T, ExcludeFromData>[]]
  | undefined
>;

export type _GetPassMany<T extends Entity = Entity> = (
  permission: string,
  ...args: Parameters<IDAOWithPermissions<T>[typeof readMany]>
) => PD<
  | boolean
  | {
      _id: string;
      projection: NExclude<keyof T, ExcludeFromData>[];
      limit: number;
    }[]
  | undefined
>;

export type _GetPassManyByIds<T extends Entity = Entity> = (
  permission: string,
  ...args: Parameters<
    IDAOWithPermissions<T>[typeof readManyByIds]
  >
) => PD<
  | boolean
  | {
      _id: string;
      projection: NExclude<keyof T, ExcludeFromData>[];
      limit: number;
    }[]
  | undefined
>;

// #endregion

export abstract class Rules<T extends Entity = Entity> {
  abstract permission: string;
  protected abstract _one: _GetPassOne<T>;
  [readOne] = (...args: GetPassOne<T>) => {
    return this._one(this.permission, ...args);
  };
  protected abstract _oneById: _GetPassOneById<T>;
  [readOneById] = (...args: GetPassOneById<T>) => {
    return this._oneById(this.permission, ...args);
  };
  protected abstract _many: _GetPassMany<T>;
  [readMany] = (...args: GetPassMany<T>) => {
    return this._many(this.permission, ...args);
  };
  protected abstract _manyByIds: _GetPassManyByIds<T>;
  [readManyByIds] = (...args: GetPassManyByIds<T>) => {
    return this._manyByIds(this.permission, ...args);
  };
}
