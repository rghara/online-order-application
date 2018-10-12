import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { OnlinrOrderApplicationSharedLibsModule, OnlinrOrderApplicationSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [OnlinrOrderApplicationSharedLibsModule, OnlinrOrderApplicationSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [OnlinrOrderApplicationSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlinrOrderApplicationSharedModule {}
