import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({
      description: 'Titre du role',
      type: String,
    })
  title: string;
}

export class UpdateRoleDto {
  title?: string;
}
