import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentailsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentailsDto);
    }

    async signIn(authCredentailsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
        const username = await this.userRepository.validateUserPassword(authCredentailsDto);
        console.log(username);

        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
