import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWishlist } from 'app/shared/model/wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
    selector: 'jhi-wishlist-delete-dialog',
    templateUrl: './wishlist-delete-dialog.component.html'
})
export class WishlistDeleteDialogComponent {
    wishlist: IWishlist;

    constructor(private wishlistService: WishlistService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wishlistService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wishlistListModification',
                content: 'Deleted an wishlist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wishlist-delete-popup',
    template: ''
})
export class WishlistDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wishlist }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WishlistDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.wishlist = wishlist;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
