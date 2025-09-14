import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDTO } from './DTO/sign-up.dto';
import { SignInDTO } from './DTO/sign-in.dto';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ReturningStatementNotSupportedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private getToken(email: string) {
    const accessToken = this.jwtService.sign(
      { email },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign({ email }, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async SignUp(data: SignUpDTO) {
    const hashedPassword = await hash(data.password, 10);

    const secret = process.env.TOKEN_SECRET;
    if (!secret) throw new Error('TOKEN_SECRET is not defined');
    const user = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });

    return this.getToken(user.email);
  }

  async SignIn(data: SignInDTO) {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) throw new Error('Invalid credentials');

    const isValidPassword = await compare(data.password, user.password);

    if (!isValidPassword) throw new Error('Invalid credentials');

    return this.getToken(user.email);
  }

  async refreshToken(email: string) {
    return this.getToken(email);
  }
}
