import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlinrOrderApplicationSharedModule } from 'app/shared';
import {
    WishlistComponent,
    WishlistDetailComponent,
    WishlistUpdateComponent,
    WishlistDeletePopupComponent,
    WishlistDeleteDialogComponent,
    wishlistRoute,
    wishlistPopupRoute
} from './';

const ENTITY_STATES = [...wishlistRoute, ...wishlistPopupRoute];

@NgModule({
    imports: [OnlinrOrderApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WishlistComponent,
        WishlistDetailComponent,
        WishlistUpdateComponent,
        WishlistDeleteDialogComponent,
        WishlistDeletePopupComponent
    ],
    entryComponents: [WishlistComponent, WishlistUpdateComponent, WishlistDeleteDialogComponent, WishlistDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlinrOrderApplicationWishlistModule {}
