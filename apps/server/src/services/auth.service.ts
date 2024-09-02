import bcrypt from 'bcryptjs';
import config from '../config';

import { UserRepository } from '../repositories/user.repository';
import { AuthorizeError, NotFoundError, ValidationError } from '../utils/error';
import { signJwt, verifyJwt } from '../utils/jwt';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async signTokens(userId: string) {
    const access_token = signJwt({ sub: userId }, 'accessTokenPrivateKey', {
      expiresIn: `${config.jwt.accessTokenExpiresIn}m`,
    });

    const refresh_token = signJwt({ sub: userId }, 'refreshTokenPrivateKey', {
      expiresIn: `${config.jwt.refreshTokenExpiresIn}d`,
    });

    return { access_token, refresh_token };
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError(
        'Invalid credentials! No User with this email found.'
      );
    }

    const isPasswordMatches = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatches) {
      throw new ValidationError('Incorrect email or password.');
    }

    const { access_token, refresh_token } = await this.signTokens(user.id);

    return { access_token, refresh_token };
  }

  async refreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new AuthorizeError('Could not refresh access token');
    }

    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      throw new AuthorizeError('Could not refresh access token');
    }

    // Check if the user still exists
    const user = await this.userRepository.findById(decoded.sub);

    if (!user) {
      throw new NotFoundError('No user with this id found');
    }

    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
      expiresIn: `${config.jwt.accessTokenExpiresIn}m`,
    });

    return access_token;
  }
}
