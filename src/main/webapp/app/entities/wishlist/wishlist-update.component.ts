import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWishlist } from 'app/shared/model/wishlist.model';
import { WishlistService } from './wishlist.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-wishlist-update',
    templateUrl: './wishlist-update.component.html'
})
export class WishlistUpdateComponent implements OnInit {
    wishlist: IWishlist;
    isSaving: boolean;

    customers: ICustomer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private wishlistService: WishlistService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wishlist }) => {
            this.wishlist = wishlist;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.wishlist.id !== undefined) {
            this.subscribeToSaveResponse(this.wishlistService.update(this.wishlist));
        } else {
            this.subscribeToSaveResponse(this.wishlistService.create(this.wishlist));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWishlist>>) {
        result.subscribe((res: HttpResponse<IWishlist>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
}
