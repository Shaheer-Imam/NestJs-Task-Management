import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){}

    async signUp(authCredentailsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentailsDto);
    }
}
