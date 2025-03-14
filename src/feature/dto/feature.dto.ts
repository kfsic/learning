import { ApiProperty } from "@nestjs/swagger";

export class CreateFeatureDto {
  @ApiProperty({
      description: 'Titre du feature',
      type: String,
    })
  title: string;
}

export class UpdateFeatureDto {
  title?: string;
}
