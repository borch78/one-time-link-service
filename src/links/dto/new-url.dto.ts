import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class NewUrlDto {
  @ApiProperty({ example: 'http://google.com/' })
  @IsUrl()
  url!: string;
}
