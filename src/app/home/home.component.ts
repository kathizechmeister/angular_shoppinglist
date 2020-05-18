import { Component } from '@angular/core' ;
import {ActivatedRoute, Router} from "@angular/router";
import {Shoppinglist} from "../shared/shoppinglist";
import {User} from "../shared/user";
import {AuthenticationService} from "../shared/authentication.service";
@Component({
    selector : 'bs-home' ,
    template : `
        <div class="ui container">
            <h2 *ngIf="authService.isLoggedIn()">Hallo, 
                {{this.authService.getCurrentUserFirstname()}} 
                {{this.authService.getCurrentUserLastname()}} </h2>
            <p *ngIf="authService.isLoggedIn()">Du bist eingeloggt als: 
                <b *ngIf="authService.getCurrentUserIsHelper()">Helfer</b>
                <b *ngIf="!authService.getCurrentUserIsHelper()">Hilfesuchender</b>
            </p><p *ngIf="!authService.getCurrentUserIsHelper()">Du kannst also Listen anlegen</p>
            <h2 *ngIf="!authService.isLoggedIn()">Hallo :)  </h2>
            <p *ngIf="!authService.isLoggedIn()">Du bist noch nicht eingeloggt.
                <br>Melde dich an um Hilfe zu suchen oder zu spenden</p>
            
            <a routerLink="../shoppinglists" class="ui red button btn btn-default">
                Listen ansehen
                <i class="right arrow icon"></i>
            </a>
        </div>
    ` ,//TODO geht username, Helper
    styles : []
})
export class HomeComponent {
    constructor(private router: Router, private route: ActivatedRoute,  public authService: AuthenticationService) { }
    shoppinglistselected(shoppinglist: Shoppinglist) {
        this.router.navigate(['../shoppinglists', shoppinglist.id],
            { relativeTo: this.route
        });
       // let currentUser = this;

    }
}