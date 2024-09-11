import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportState } from './entities/reportstate.entity';
import { ReportStateController } from './reportstate.controller';
import { ReportStateService } from './reportstate.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportState])],
  controllers: [ReportStateController],
  providers: [ReportStateService],
  exports:[TypeOrmModule]
})
export class ReportStateModule {}
