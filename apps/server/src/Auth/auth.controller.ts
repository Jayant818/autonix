import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async SignUpUser() {
    return this.authService.SignUpUser();
  }

  @Post('/signin')
  async login() {
    return this.authService.SignInUser();
  }
}
