import { ApiProperty } from '@nestjs/swagger';

export class ShortLinkDto {
  @ApiProperty({ example: '0.0.0.0:3000/JE49Vn4Yj' })
  shortLink!: string;
}
