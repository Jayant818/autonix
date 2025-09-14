import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async SignUpUser() {
    // return this.userService.SignUpUser();
  }

  @Post('/signin')
  async login() {
    // return this.userService.SignInUser();
  }
}
