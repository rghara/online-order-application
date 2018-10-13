import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWishlist } from 'app/shared/model/wishlist.model';

@Component({
    selector: 'jhi-wishlist-detail',
    templateUrl: './wishlist-detail.component.html'
})
export class WishlistDetailComponent implements OnInit {
    wishlist: IWishlist;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wishlist }) => {
            this.wishlist = wishlist;
        });
    }

    previousState() {
        window.history.back();
    }
}
