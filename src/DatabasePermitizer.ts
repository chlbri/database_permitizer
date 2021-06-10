import {
  CLIENT_ERROR_CONSTANTS,
  Entity as E,
  NOmit,
  SUCCESS_CONSTANTS,
  ThenArg,
} from 'core_types';
import {
  bulkUpdate,
  count,
  createMany,
  createOne,
  deleteMany,
  deleteManyByIds,
  deleteOne,
  deleteOneById,
  readMany,
  readManyByIds,
  readOne,
  readOneById,
  updateMany,
  updateManyByIds,
  updateOne,
  updateOneById,
  upsertOne,
  _permissions,
} from './constants/strings';
import { Actor } from './entities/Actor';
import { IDAOPermissions, Rules } from './helpers';
import { IDAOWithPermissions } from './DAOWithPermissions';

type _Rules<T extends E> = NOmit<Rules<T>, 'permission'>;

export class DatabasePermitizer<T extends E = E> {
  constructor(private permissions: IDAOPermissions<T>) {}

  // #region Checkers

  private async check<K extends keyof _Rules<T>>(
    key: K,
    actor_permissions: Actor[typeof _permissions][K],
    ...args: Parameters<IDAOWithPermissions<T>[K]>
  ) {
    const { superAdmin, group, other } = this.permissions[key];

    if (actor_permissions.includes(superAdmin)) {
      return SUCCESS_CONSTANTS[200];
    }

    if (actor_permissions.includes(group.permission)) {
      return group[key](...(args as any));
    }

    if (actor_permissions.includes(other.permission)) {
      return other[key](...(args as any));
    }

    return CLIENT_ERROR_CONSTANTS[400];
  }

  private checkCreateOrCount = (
    actor_permissions: Actor[typeof _permissions][typeof createOne],
    key: keyof Pick<
      IDAOPermissions,
      | typeof createOne
      | typeof createMany
      | typeof upsertOne
      | typeof count
    >
  ) => {
    const { superAdmin, group, other } = this.permissions[key];
    const check =
      actor_permissions.includes(superAdmin) ||
      actor_permissions.includes(group.permission) ||
      actor_permissions.includes(other.permission);
    return check;
  };

  // #endregion

  // #region Create

  [createOne] = async (
    actor_permissions: Actor[typeof _permissions][typeof createOne]
  ) => this.checkCreateOrCount(actor_permissions, createOne);

  [createMany] = async (
    actor_permissions: Actor[typeof _permissions][typeof createMany]
  ) => this.checkCreateOrCount(actor_permissions, createMany);

  [upsertOne] = async (
    actor_permissions: Actor[typeof _permissions][typeof upsertOne]
  ) => this.checkCreateOrCount(actor_permissions, upsertOne);

  // #endregion

  // #region Read

  readOne = (
    actor_permissions: Actor[typeof _permissions][typeof readOne],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readOne]>
  ) =>
    this.check(
      readOne,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOne]>;

  [readOneById] = (
    actor_permissions: Actor[typeof _permissions][typeof readOneById],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readOneById]
    >
  ) =>
    this.check(
      readOneById,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOneById]>;

  [count] = async (
    actor_permissions: Actor[typeof _permissions][typeof count]
  ) => this.checkCreateOrCount(actor_permissions, count);

  [readMany] = async (
    actor_permissions: Actor[typeof _permissions][typeof readMany],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readMany]>
  ) =>
    this.check(
      readMany,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readMany]>;

  [readManyByIds] = async (
    actor_permissions: Actor[typeof _permissions][typeof readManyByIds],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readManyByIds]
    >
  ) =>
    this.check(
      readManyByIds,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readManyByIds]>;

  // #endregion

  // #region Update

  [updateOne] = async (
    actor_permissions: Actor[typeof _permissions][typeof updateOne],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readOne]>
  ) =>
    this.check(
      readOne,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOne]>;

  [updateOneById] = async (
    actor_permissions: Actor[typeof _permissions][typeof updateOneById],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readOneById]
    >
  ) =>
    this.check(
      readOneById,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOneById]>;

  [updateMany] = async (
    actor_permissions: Actor[typeof _permissions][typeof updateMany],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readMany]>
  ) =>
    this.check(
      readMany,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readMany]>;

  [updateManyByIds] = async (
    actor_permissions: Actor[typeof _permissions][typeof updateManyByIds],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readManyByIds]
    >
  ) =>
    this.check(
      readManyByIds,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readMany]>;

  bulkUpdate = async (
    actor_permissions: Actor[typeof _permissions][typeof bulkUpdate],
    updates: Parameters<
      IDAOWithPermissions<T>[typeof readMany]
    >[]
  ) => {
    // #region First verifications
    const { superAdmin, group, other } = this.permissions[
      bulkUpdate
    ];
    if (actor_permissions.includes(superAdmin)) {
      return true;
    }

    if (
      !(
        actor_permissions.includes(group.permission) ||
        actor_permissions.includes(other.permission)
      )
    ) {
      return false;
    }

    // #endregion

    const out: ThenArg<
      ReturnType<Rules<T>[typeof readMany]>
    >[] = [];

    // #region Last verification
    const checker = async (args: typeof updates[number]) => {
      return await this.readMany(actor_permissions, ...args);
    };

    const push = async (update: typeof updates[number]) => {
      const pushed = await checker(update);
      out.push(pushed);
    };
    updates.forEach(push);
    // #endregion

    return out;
  };
  // #endregion

  // #region Delete

  [deleteOne] = async (
    actor_permissions: Actor[typeof _permissions][typeof deleteOne],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readOne]>
  ) =>
    this.check(
      readOne,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOne]>;

  [deleteOneById] = async (
    actor_permissions: Actor[typeof _permissions][typeof deleteOneById],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readOneById]
    >
  ) =>
    this.check(
      readOneById,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readOneById]>;

  [deleteMany] = async (
    actor_permissions: Actor[typeof _permissions][typeof deleteMany],
    ...args: Parameters<IDAOWithPermissions<T>[typeof readMany]>
  ) =>
    this.check(
      readMany,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readMany]>;

  [deleteManyByIds] = async (
    actor_permissions: Actor[typeof _permissions][typeof deleteManyByIds],
    ...args: Parameters<
      IDAOWithPermissions<T>[typeof readManyByIds]
    >
  ) =>
    this.check(
      readManyByIds,
      actor_permissions,
      ...args
    ) as ReturnType<Rules<T>[typeof readManyByIds]>;

  // #endregion
}
