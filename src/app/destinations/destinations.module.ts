import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
    imports: [AuthModule, JwtModule.register(jwtConfig)],
    providers: [DestinationsService],
    controllers: [DestinationsController],
    exports: []
})
export class DestinationsModule {}
