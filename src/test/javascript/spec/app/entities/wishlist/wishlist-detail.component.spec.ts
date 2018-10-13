/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlinrOrderApplicationTestModule } from '../../../test.module';
import { WishlistDetailComponent } from 'app/entities/wishlist/wishlist-detail.component';
import { Wishlist } from 'app/shared/model/wishlist.model';

describe('Component Tests', () => {
    describe('Wishlist Management Detail Component', () => {
        let comp: WishlistDetailComponent;
        let fixture: ComponentFixture<WishlistDetailComponent>;
        const route = ({ data: of({ wishlist: new Wishlist(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlinrOrderApplicationTestModule],
                declarations: [WishlistDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WishlistDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WishlistDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.wishlist).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
