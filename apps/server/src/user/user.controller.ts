import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getProfile(@Req() req) {
    const { id } = req.user;

    if (!id) {
      throw new Error('User ID not logged in');
    }
    return this.userService.getProfile(id);
  }
}
