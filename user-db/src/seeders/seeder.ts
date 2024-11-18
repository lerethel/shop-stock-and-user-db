import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../user/entities/user.entity';
import { firstNames, lastNames, sexes } from './seeder.data';

export class DatabaseSeeder extends Seeder {
  run(manager: EntityManager) {
    for (let i = 0; i < 1e5; i++) {
      manager.create(User, {
        firstName: this.getRandomElement(firstNames),
        lastName: this.getRandomElement(lastNames),
        age: this.getRandomNumber(15, 60),
        sex: this.getRandomElement(sexes),
        problems: this.getRandomBoolean(),
      });
    }
  }

  private getRandomElement(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomBoolean() {
    return Math.random() < 0.5;
  }
}
