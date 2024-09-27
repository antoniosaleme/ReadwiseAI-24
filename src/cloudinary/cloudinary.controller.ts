import { Controller } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // @Post()
  // create(@Body() createCloudinaryDto: CreateCloudinaryDto) {
  //   return this.cloudinaryService.create(createCloudinaryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.cloudinaryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cloudinaryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCloudinaryDto: UpdateCloudinaryDto) {
  //   return this.cloudinaryService.update(+id, updateCloudinaryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cloudinaryService.remove(+id);
  // }
}
