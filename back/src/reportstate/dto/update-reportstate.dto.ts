import { PartialType } from '@nestjs/swagger';
import { CreateReportStateDto } from './create-reportstate.dto';

export class UpdateReportStateDto extends PartialType(CreateReportStateDto) {}
