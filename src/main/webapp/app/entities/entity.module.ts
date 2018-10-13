import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OnlinrOrderApplicationCategoryModule } from './category/category.module';
import { OnlinrOrderApplicationProductModule } from './product/product.module';
import { OnlinrOrderApplicationCustomerModule } from './customer/customer.module';
import { OnlinrOrderApplicationAddressModule } from './address/address.module';
import { OnlinrOrderApplicationWishlistModule } from './wishlist/wishlist.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        OnlinrOrderApplicationCategoryModule,
        OnlinrOrderApplicationProductModule,
        OnlinrOrderApplicationCustomerModule,
        OnlinrOrderApplicationAddressModule,
        OnlinrOrderApplicationWishlistModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlinrOrderApplicationEntityModule {}
