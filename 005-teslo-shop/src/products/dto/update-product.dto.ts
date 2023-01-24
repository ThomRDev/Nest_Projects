// la diferencia es que con swagger si me saldra en la documentacion
// mientras que con nestjs no saldra en swagger
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
