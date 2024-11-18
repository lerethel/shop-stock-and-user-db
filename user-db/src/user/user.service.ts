import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly manager: EntityManager) {}

  async solveProblems() {
    return (
      await this.manager
        .createQueryBuilder(User)
        .update({ problems: false })
        .where({ problems: true })
        .execute('run')
    ).affectedRows;
  }
}
