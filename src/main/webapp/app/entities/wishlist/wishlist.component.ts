import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWishlist } from 'app/shared/model/wishlist.model';
import { Principal } from 'app/core';
import { WishlistService } from './wishlist.service';

@Component({
    selector: 'jhi-wishlist',
    templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit, OnDestroy {
    wishlists: IWishlist[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private wishlistService: WishlistService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.wishlistService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IWishlist[]>) => (this.wishlists = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.wishlistService.query().subscribe(
            (res: HttpResponse<IWishlist[]>) => {
                this.wishlists = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWishlists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWishlist) {
        return item.id;
    }

    registerChangeInWishlists() {
        this.eventSubscriber = this.eventManager.subscribe('wishlistListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
