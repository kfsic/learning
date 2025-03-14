import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FeatureModule } from './feature/feature.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ChapitreModule } from './Chapitre/chapitre.module';
import { sectionModule } from './Section/section.module';
import { FichierCoursModule } from './FichierCours/fichier.cours.module';
import { FichierModule } from './Fichier/fichier.module';
import { RessourceModule } from './Ressource/ressource.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { StreamingModule } from './streaming/streaming.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables disponibles dans tout le projet
    }),
    AuthModule,
    PrismaModule,
    FeatureModule,
    RoleModule,
    PermissionModule,
    ChapitreModule,
    sectionModule,
    FichierCoursModule,
    FichierModule,
    RessourceModule,
    FileUploadModule,
    StreamingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
