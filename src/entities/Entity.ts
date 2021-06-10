import { Entity as E } from 'core_types';
import { Data } from './Data';



export class Entity<T extends object> {
  constructor(
    public _id: string,
    public _read: E['_read'],
    public _update: E['_update'],
    public _delete: E['_delete'],
    public values: Data<T>
  ) {}

  // copyWith(values: Data<T>, _id?: string) {
  //   return new Entity(_id ?? this._id, {
  //     ...this.values,
  //     ...values,
  //   });
  // }
}

// const d = new Entity('', {
//   _read: 'huiohdgf',
//   _update: 'huiohdgf',
//   _delete: 'huiohdgf',
// });
