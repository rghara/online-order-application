/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { OnlinrOrderApplicationTestModule } from '../../../test.module';
import { WishlistUpdateComponent } from 'app/entities/wishlist/wishlist-update.component';
import { WishlistService } from 'app/entities/wishlist/wishlist.service';
import { Wishlist } from 'app/shared/model/wishlist.model';

describe('Component Tests', () => {
    describe('Wishlist Management Update Component', () => {
        let comp: WishlistUpdateComponent;
        let fixture: ComponentFixture<WishlistUpdateComponent>;
        let service: WishlistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [OnlinrOrderApplicationTestModule],
                declarations: [WishlistUpdateComponent]
            })
                .overrideTemplate(WishlistUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WishlistUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WishlistService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Wishlist(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.wishlist = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Wishlist();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.wishlist = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
