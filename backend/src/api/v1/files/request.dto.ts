import { Transform } from 'class-transformer';

export class CreateFileRequestDto {
  file: Express.Multer.File;

  @Transform((raw) => {
    if (raw.value) {
      return parseInt(raw.value);
    }
    return raw.value;
  })
  subjectId: number;

  subjectEntityName: string;

  subjectField: string;
}
