import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinkService } from './links/link.service';
import { NewUrlDto, ShortLinkDto } from './links/dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LINKS_SERVICE } from './links/di.constant';

@Controller()
export class AppController {
  constructor(
    @Inject(LINKS_SERVICE) private readonly linkService: LinkService,
  ) {}

  @ApiOperation({ summary: 'Redirect for origin link' })
  @ApiOkResponse({ description: 'Success redirect' })
  @ApiResponse({
    status: 404,
    description: 'Long link not found',
  })
  @Get('/:short')
  async redirectForLongLink(@Param('short') short: string) {
    const longLink = await this.linkService.getLongLink(short);
    if (!longLink) {
      throw new NotFoundException('LINK NOT FOUND');
    }
    return { result: longLink };
  }

  @ApiOperation({ summary: 'Create short link' })
  @ApiOkResponse({
    description: 'Success create short link',
    type: ShortLinkDto,
  })
  @Post('createShortLink')
  @UsePipes(new ValidationPipe())
  async createShortLink(@Body() body: NewUrlDto): Promise<ShortLinkDto> {
    const url: string = body.url;
    const shortLink = await this.linkService.createShortLink(url);
    return { shortLink };
  }
}
