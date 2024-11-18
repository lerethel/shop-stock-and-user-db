import { Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  solveProblems() {
    return this.userService.solveProblems();
  }
}
