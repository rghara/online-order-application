/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlinrOrderApplicationTestModule } from '../../../test.module';
import { WishlistComponent } from 'app/entities/wishlist/wishlist.component';
import { WishlistService } from 'app/entities/wishlist/wishlist.service';
import { Wishlist } from 'app/shared/model/wishlist.model';

describe('Component Tests', () => {
    describe('Wishlist Management Component', () => {
        let comp: WishlistComponent;
        let fixture: ComponentFixture<WishlistComponent>;
        let service: WishlistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlinrOrderApplicationTestModule],
                declarations: [WishlistComponent],
                providers: []
            })
                .overrideTemplate(WishlistComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WishlistComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Wishlist(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.wishlists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
