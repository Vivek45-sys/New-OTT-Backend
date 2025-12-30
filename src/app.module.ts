import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     PrometheusModule.register({path: '/metrics' }),
     AuthModule,
     RolesModule,
     UserModule,
  ],
  providers: [
    PrismaService
  ],
})
export class AppModule {}
