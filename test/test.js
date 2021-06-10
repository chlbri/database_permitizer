const { writeFileSync } = require('fs');
const { EOL } = require('os');
const keys = [
  'createOne',
  'createMany',
  'upsertOne',
  'readOne',
  'readOneById',
  'readMany',
  'readManyByIds',
  'count',
  'updateOne',
  'updateOneById',
  'updateMany',
  'updateManyByIds',
  'bulkUpdate',
  'deleteOne',
  'deleteOneById',
  'deleteMany',
  'deleteManyByIds',
];

const write = keys
  .map(
    key =>
      `export const ${key} = "${key}" as keyof Pick<IDAO, '${key}'>`
  )
  .join(EOL);
writeFileSync('G:/wert.txt', write);
console.log('done');
