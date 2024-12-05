import { Module, Global } from '@nestjs/common';
import { FirebaseAdminService } from './auth.service';

@Global() // Makes this module globally available
@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {}