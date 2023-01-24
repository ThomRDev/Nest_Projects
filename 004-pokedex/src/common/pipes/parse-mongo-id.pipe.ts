import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// los pipes transforman la data
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {

    // console.log({ value,metadata })
    // return value.toLowerCase();
    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid mongoId`)
    }
    return value 
  }
}
