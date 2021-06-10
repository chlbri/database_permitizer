import { IDAO } from "core_types";

export const createOne = 'createOne' as keyof Pick<
  IDAO,
  'createOne'
>;
export const createMany = 'createMany' as keyof Pick<
  IDAO,
  'createMany'
>;
export const upsertOne = 'upsertOne' as keyof Pick<
  IDAO,
  'upsertOne'
>;
export const readOne = 'readOne' as keyof Pick<IDAO, 'readOne'>;
export const readOneById = 'readOneById' as keyof Pick<
  IDAO,
  'readOneById'
>;
export const readMany = 'readMany' as keyof Pick<
  IDAO,
  'readMany'
>;
export const readManyByIds = 'readManyByIds' as keyof Pick<
  IDAO,
  'readManyByIds'
>;
export const count = 'count' as keyof Pick<IDAO, 'count'>;
export const updateOne = 'updateOne' as keyof Pick<
  IDAO,
  'updateOne'
>;
export const updateOneById = 'updateOneById' as keyof Pick<
  IDAO,
  'updateOneById'
>;
export const updateMany = 'updateMany' as keyof Pick<
  IDAO,
  'updateMany'
>;
export const updateManyByIds = 'updateManyByIds' as keyof Pick<
  IDAO,
  'updateManyByIds'
>;
export const bulkUpdate = 'bulkUpdate' as keyof Pick<
  IDAO,
  'bulkUpdate'
>;
export const deleteOne = 'deleteOne' as keyof Pick<
  IDAO,
  'deleteOne'
>;
export const deleteOneById = 'deleteOneById' as keyof Pick<
  IDAO,
  'deleteOneById'
>;
export const deleteMany = 'deleteMany' as keyof Pick<
  IDAO,
  'deleteMany'
>;
export const deleteManyByIds = 'deleteManyByIds' as keyof Pick<
  IDAO,
  'deleteManyByIds'
>;
export const _permissions = 'permissions' as const;
export const _search = 'search' as const;
export const _newValue = 'newValue' as const;
export const _limit = 'limit' as const;
export const __id = '_id' as const;
export const __read = '_read' as const;