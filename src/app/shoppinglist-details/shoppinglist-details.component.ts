import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'bs-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})
export class ShoppinglistDetailsComponent implements OnInit {

    shoppinglist:Shoppinglist = ShoppinglistFactory.empty();

    commentform:FormGroup;



  constructor(
      private bs:ShoppinglistStoreService,
      private router:Router,
      private route:ActivatedRoute,
      public authService: AuthenticationService,
      private fb:FormBuilder


  ) { }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.bs.getSingle(params['id']).subscribe(res=> {
            this.shoppinglist = res;
            console.log(this.shoppinglist);
        });
        //this.shoppinglist = this.bs.getSingle(params['id']);
        console.log(this.shoppinglist);
       this.commentform= this.fb.group({
            commenttext:''
        });

  }

  removeShoppinglist(){
      if(confirm('Shoppingliste wirklich löschen?')){
          this.bs.remove((this.shoppinglist.id)).subscribe(res=>this.router.navigate(
              ['../'], {relativeTo:this.route}
          ));
      }
  }
  /*
  Kommentare funktioniert leider nicht
   */
    removeComment(id){
        if(confirm('Kommentar wirklich löschen?')){
            console.log(this.shoppinglist.comments);
            console.log(id);
            //console.log(this.shoppinglist.comments['id'][$id]);
            //console.log(this.shoppinglist.comments[$id]);
            let searchedComment;
            let count = 0;

            console.log(count);
            console.log(searchedComment)
            for(var comm of this.shoppinglist.comments){
                if(comm.id == id){
                    searchedComment = comm;
                }
                else count++;
            }
            console.log("Dieser Kommentar soll gelöscht werden");
            console.log(searchedComment)
            //TODO Kommentar löschen
            console.log(this.shoppinglist.comments[count]);
           // this.bs.remove((this.shoppinglist.comments[count])).subscribe(res=>this.router.navigate(['../'], {relativeTo:this.route}));
        }
    }

    getCommentfirstname(id){
      let user =  this.bs.getUserById(id);
      console.log(user);
    }
    addComment(userid){
        let newcomment = ShoppinglistFactory.fromObjectComment(this.commentform.value);
        newcomment.shoppinglist_id = this.shoppinglist.id;
        newcomment.user_id = this.authService.getCurrentUserId();
        newcomment.commenttext = this .commentform.value.commenttext;
        this.commentform = this.fb.group({
            id:null,
            //commenttext: this.commentform.commenttext,
            shoppinglist_id: this.shoppinglist.id,
            user_id: this.authService.getCurrentUserId()
        });
        this.bs.addComment((this.shoppinglist), (this.shoppinglist.helper_id)).subscribe(res => {
            this.router.navigate(['../../shoppinglists/', this.shoppinglist.id], { relativeTo: this.route });
        });
    }

    /*
    Helper übernimmt eine Liste
     */
    accept(helperid){
        if(confirm('Liste wirklci übernehmen?')){
            console.log("Liste übernommen");
            console.log(this.shoppinglist);
            this.shoppinglist.helper_id = helperid;
            console.log(this.shoppinglist);
            this.bs.accept((this.shoppinglist), (this.shoppinglist.helper_id)).subscribe(res => {
                this.router.navigate(['../../shoppinglists/', this.shoppinglist.id], { relativeTo: this.route });
            });


        }
    }



}
