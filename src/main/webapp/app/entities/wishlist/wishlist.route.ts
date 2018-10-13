import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Wishlist } from 'app/shared/model/wishlist.model';
import { WishlistService } from './wishlist.service';
import { WishlistComponent } from './wishlist.component';
import { WishlistDetailComponent } from './wishlist-detail.component';
import { WishlistUpdateComponent } from './wishlist-update.component';
import { WishlistDeletePopupComponent } from './wishlist-delete-dialog.component';
import { IWishlist } from 'app/shared/model/wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistResolve implements Resolve<IWishlist> {
    constructor(private service: WishlistService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((wishlist: HttpResponse<Wishlist>) => wishlist.body));
        }
        return of(new Wishlist());
    }
}

export const wishlistRoute: Routes = [
    {
        path: 'wishlist',
        component: WishlistComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wishlists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wishlist/:id/view',
        component: WishlistDetailComponent,
        resolve: {
            wishlist: WishlistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wishlists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wishlist/new',
        component: WishlistUpdateComponent,
        resolve: {
            wishlist: WishlistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wishlists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wishlist/:id/edit',
        component: WishlistUpdateComponent,
        resolve: {
            wishlist: WishlistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wishlists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wishlistPopupRoute: Routes = [
    {
        path: 'wishlist/:id/delete',
        component: WishlistDeletePopupComponent,
        resolve: {
            wishlist: WishlistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Wishlists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
