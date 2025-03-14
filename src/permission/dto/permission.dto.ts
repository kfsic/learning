import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: "ID de l'utilisateur",
    type: Number, // Utilisez le type Number pour être plus explicite
  })
  roleId: number;

  @ApiProperty({
    description: 'ID de la fonctionnalité associée',
    type: Number, // Ajoutez une description appropriée et utilisez le type Number
  })
  featureId: number;
}

export class UpdatePermissionDto {
  roleId?: number;
  featureId?: number;
}
