import { Component } from '@angular/core' ;
import {AuthenticationService} from "./shared/authentication.service" ;
import {ShoppinglistStoreService} from "./shared/shoppinglist-store.service";
import {Shoppinglist} from "./shared/shoppinglist";

@ Component ({
    selector : 'bs-root' ,
    templateUrl : 'app.component.html'
})
export class AppComponent {
    shoppinglists:Shoppinglist[];

    constructor ( public authService: AuthenticationService) { }


    isLoggedIn () {
        return this.authService.isLoggedIn ();
    }
    isHelper(){
        return this.authService.getCurrentUserIsHelper();
    }
    getLoginLabel (){
        if ( this.isLoggedIn ()){
            return "Logout" ;
        } else {
            return "Login" ;
        }
    }

}


