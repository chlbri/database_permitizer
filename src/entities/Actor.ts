import { WithoutPermissions, Entity } from 'core_types';
import { IActorPermissions } from '../helpers';

export interface Actor
  extends Required<WithoutPermissions<Entity>> {
  login: string;
  ip: string;
  location?: string;
  permissions: IActorPermissions;
}
