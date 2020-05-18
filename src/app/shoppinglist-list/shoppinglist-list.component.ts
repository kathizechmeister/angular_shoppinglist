import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Item, Shoppinglist, User} from "../shared/shoppinglist";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {Observable} from "rxjs";
import {AuthenticationService} from "../shared/authentication.service";
import {forEachComment} from "tslint";

@Component({
  selector: 'bs-shoppinglist-list',
  templateUrl: './shoppinglist-list.component.html',
  styles: []
})
export class ShoppinglistListComponent implements OnInit {
    shoppinglists:Shoppinglist[];
    //shoppinglists$: Observable<Shoppinglist[]>;
    @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

    constructor ( private bs:ShoppinglistStoreService,  public authService: AuthenticationService){ }
    ngOnInit () {

        this.bs.getAll().subscribe(res =>this.shoppinglists = res);

    }



    showDetails (shoppinglist:Shoppinglist) {
        this.showDetailsEvent.emit (shoppinglist);
    }


}
