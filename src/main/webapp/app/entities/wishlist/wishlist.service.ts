import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWishlist } from 'app/shared/model/wishlist.model';

type EntityResponseType = HttpResponse<IWishlist>;
type EntityArrayResponseType = HttpResponse<IWishlist[]>;

@Injectable({ providedIn: 'root' })
export class WishlistService {
    private resourceUrl = SERVER_API_URL + 'api/wishlists';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/wishlists';

    constructor(private http: HttpClient) {}

    create(wishlist: IWishlist): Observable<EntityResponseType> {
        return this.http.post<IWishlist>(this.resourceUrl, wishlist, { observe: 'response' });
    }

    update(wishlist: IWishlist): Observable<EntityResponseType> {
        return this.http.put<IWishlist>(this.resourceUrl, wishlist, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWishlist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWishlist[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWishlist[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
