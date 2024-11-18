import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { UserSex } from '../enums/user-sex.enum';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  age: number;

  @Enum(() => UserSex)
  sex: UserSex;

  @Property()
  @Index()
  problems: boolean;
}
