import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthGuard } from './Guards/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTAuthGuard],
  exports: [JWTAuthGuard],
})
export class AuthModule {}
