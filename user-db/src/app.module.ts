import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from './mikro-orm.config';
import { UserModule } from './user/user.module';

@Module({ imports: [UserModule, MikroOrmModule.forRoot(config)] })
export class AppModule {}
