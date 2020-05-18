import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as decode from "jwt-decode";
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from "rxjs";
import {Shoppinglist} from "./shoppinglist";
//npm install --save-dev jwt-decode
interface User {
    result: {
        created_at: Date,
        email: string,
        id: number,
        firstname: string,
        lastname: string,
        is_helper: boolean,
        updated_at: Date
    }
}
@Injectable()
export class AuthenticationService {
    private api:string =
        'http://shoppinglist.s1710456035.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';
    constructor(private http: HttpClient) {
    }
    login(email: string, password: string) {
        return this.http.post(`${this.api}/login`, {'email': email,
            'password': password});
    }
    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('firstname', res.result.firstname.toString());
            }
        );

    }
    public getCurrentUserId(){
       return Number.parseInt(localStorage.getItem('userId'));
       console.log(this.setCurrentUserId());
    }
    public getCurrentUserFirstname(){
        //const decodedToken = decode(token);
        //console.log(localStorage.getItem('firstname'));
        return localStorage.getItem('firstname');
       // return localStorage;

    }
    public getCurrentUserLastname(){
        return localStorage.getItem('lastname');
    }
    public getCurrentUserIsHelper(){
        let ishelper= localStorage.getItem('is_helper');
        if( ishelper == '1'){
            //console.log(localStorage.getItem('is_helper'))
            return true;
        }
        else {
           // console.log(localStorage.getItem('is_helper'))
            return false;
        }
    }


    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log(decodedToken.user);
        //console.log(decodedToken);
        localStorage.setItem('token', token);
       // console.log(token);
        localStorage.setItem('userId', decodedToken.user.id);
        localStorage.setItem('firstname', decodedToken.user.firstname);
        localStorage.setItem('lastname', decodedToken.user.lastname);
        localStorage.setItem('is_helper', decodedToken.user.is_helper);

    }


    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }
    public isLoggedIn() {
        if(localStorage.getItem("token")){
            let token : string = localStorage.getItem("token");
           // console.log(token);
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if(expirationDate < new Date()){
                console.log("token expired");
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getSingleUser(id):Observable<User> {
        return this.http.get<User>(`${this.api}/users/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }




    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }
}
