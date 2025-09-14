import { Response } from 'express';

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  const commonOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  };

  res.cookie('accessToken', accessToken, {
    ...commonOptions,
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  res.cookie('refreshToken', refreshToken, {
    ...commonOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}
