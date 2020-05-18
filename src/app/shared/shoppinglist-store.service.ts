import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Shoppinglist, User} from "./shoppinglist";

@Injectable()
export class ShoppinglistStoreService {
    private api = 'http://shoppinglist.s1710456035.student.kwmhgb.at/api';
    constructor(private http:HttpClient) { }
    getAll():Observable<Array<Shoppinglist>> {
        return this.http.get(`${this.api}/shoppinglists`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    getListByUser(userid){
        return this.http.get(`${this.api}/user/${userid}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    getSingle(id):Observable<Shoppinglist> {
        return this.http.get<Shoppinglist>(`${this.api}/shoppinglist/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    create(shoppinglist:Shoppinglist):Observable<any> {
        console.log("create");
        console.log(shoppinglist);
        return this.http.post(`${this.api}/shoppinglist`, shoppinglist)
            .pipe(retry(3)).pipe(catchError(this.errorHandler))
    }
    update(shoppinglist:Shoppinglist):Observable<any> {
        return this.http.put(`${this.api}/shoppinglist/${shoppinglist.id}`, shoppinglist)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    accept(shoppinglist:Shoppinglist, helperid):Observable<any> {
        return this.http.post(`${this.api}/shoppinglist/${shoppinglist.id}/helper/${helperid}`, '')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    remove(id:number):Observable<any> {
        return this.http.delete(`${this.api}/shoppinglist/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    removeComment(id):Observable<any>{
        return this.http.delete(`${this.api}/shoppinglists/comment/$id`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }

    getUserById(id):Observable<User> {
        return this.http.get<User>(`${this.api}/users/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
    addComment(shoppinglist:Shoppinglist, userid):Observable<any> {
        return this.http.post(`${this.api}/shoppinglist/${shoppinglist.id}/comment/`, '')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
}