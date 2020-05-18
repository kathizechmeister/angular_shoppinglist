import {Component, Input, OnInit} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {AuthenticationService} from "../shared/authentication.service";
@Component({
    selector: 'a.bs-shoppinglist-list-item',
    templateUrl: './shoppinglist-list-item.component.html',
    styles: []
})
export class ShoppinglistListItemComponent implements OnInit {
        @Input() shoppinglist:Shoppinglist;

    constructor( public authService: AuthenticationService) { }
  ngOnInit(): void {

  }


}
