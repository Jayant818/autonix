import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './DTO/sign-up.dto';
import { SignInDTO } from './DTO/sign-in.dto';
import { setAuthCookies } from '../common/utils/cookie.util';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async SignUp(@Body() data: SignUpDTO, @Response({ passthrough: true }) res) {
    const { accessToken, refreshToken } = await this.authService.SignUp(data);
    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'user Signed up successfully',
    };
  }

  @Post('/signin')
  async SignIn(@Body() data: SignInDTO, @Response() res) {
    const { accessToken, refreshToken } = await this.authService.SignIn(data);
    setAuthCookies(res, accessToken, refreshToken);
    return {
      message: 'user Signed in successfully',
    };
  }

  @Post('/refresh-token')
  async refreshToken(@Body('email') email: string, @Response() res) {
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(email);
    setAuthCookies(res, accessToken, refreshToken);

    return {
      message: 'Token refreshed successfully',
    };
  }
}
