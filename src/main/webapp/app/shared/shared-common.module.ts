import { NgModule } from '@angular/core';

import { OnlinrOrderApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [OnlinrOrderApplicationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [OnlinrOrderApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OnlinrOrderApplicationSharedCommonModule {}
