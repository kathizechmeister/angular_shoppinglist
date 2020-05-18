import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormArray, Validators } from '@angular/forms';
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {Item, Shoppinglist,Comment} from "../shared/shoppinglist";
import {ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";
import {compareSegments} from "@angular/compiler-cli/ngcc/src/sourcemaps/segment_marker";

@Component({
    selector: 'bs-shoppinglist-form',
    templateUrl: './shoppinglist-form.component.html'
})
export class ShoppinglistFormComponent implements OnInit {
    shoppinglistform: FormGroup;
    shoppinglist = ShoppinglistFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingShoppinglist = false;
    deadline: undefined;
    user: null;
    items: FormArray;
    comments: FormArray;
    helper_id: null;
    helper:null;
    ishelper:false;



    constructor(private fb: FormBuilder, private bs:ShoppinglistStoreService,
                private route: ActivatedRoute, private router: Router, public authService:AuthenticationService) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        let userid;
        if (id) {
            this.isUpdatingShoppinglist = true;
            this.bs.getSingle(id).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;

                if(this.shoppinglist.user_id){
                    userid=this.shoppinglist.user_id;
                }
                this.initShoppinglist(userid);
            });
            console.log(this.shoppinglist);
        }
        this.initShoppinglist(userid);
    }


    initShoppinglist(olduserid) {
        this.buildThumbnailsArray();
        //this.shoppinglist.user_id=this.getCurrentUserId();
        //console.log(userid);

        console.log(this.authService.getCurrentUserId());
        let user_id;
        let helper_id;
        if(olduserid){
            user_id = olduserid;
        }
        else {
            user_id = this.shoppinglist.user_id;
        }
        if(this.shoppinglist.helper_id){

        }

        this.shoppinglistform = this.fb.group({
            id: this.shoppinglist.id,
            title: [this.shoppinglist.title, Validators.required],
            deadline: this.shoppinglist.deadline,
            items: this.items,
          //
             //comments: this.comments,
           // user_id: this.shoppinglist.user_id,
            user_id: user_id,
            //helper_id: this.shoppinglist.helper,
            //maybe_helper_id:0,
            //ishelper:false
        });

       /* this.helperform=this.fb.group({
            helper_id:null,
            maybe_helper_id:0,
            ishelper: false

        });*/
        console.log("DEADLINE"+this.shoppinglist.deadline);

        this.shoppinglistform.statusChanges.subscribe(() => this.updateErrorMessages());

    }

    buildThumbnailsArray() {
        console.log(this.shoppinglist.items);
        if(this.shoppinglist.items.length == 0){ //if new book had no images -> but no in edit mode
            this.shoppinglist.items.push(new Item(null,'',0, 0))
        }
        this.items = this.fb.array(
            this.shoppinglist.items.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    description: this.fb.control(t.description),
                    amount: this.fb.control(t.amount),
                    maxprice: this.fb.control(t.maxprice)
                })
            )
        );

       /* if(this.shoppinglist.comments.length == 0){ //if new book had no images -> but no in edit mode
            this.shoppinglist.comments.push(new Comment(null,'',null))
        }
        this.comments = this.fb.array(
            this.shoppinglist.comments.map(
                comment => this.fb.group({
                    id: this.fb.control(comment.id),
                    commenttext: this.fb.control(comment.commenttext),
                    user_id: this.fb.control(comment.user_id)
                })
            )
        );
*/


        console.log(this.items);
      //  console.log(this.comments);
    }

  /*  addThumbnailsArrayForComments(){
        //COMMENTS
        if(this.shoppinglist.comments.length == 0){ //if new book had no images -> but no in edit mode
            this.shoppinglist.comments.push(new Comment(null,'',null))
        }
        this.comments = this.fb.array(
            this.shoppinglist.comments.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    commenttext: this.fb.control(t.commenttext),
                    user_id: this.fb.control(t.user_id)
                })
            )
        );
    }

    addThumbnailControlforComments() {
        this.comments.push(this.fb.group({commenttext:null}));
    }
*/
    addThumbnailControl() {
        this.items.push(this.fb.group({ description: null, amount: 0, maxprice:0 }));
    }

    submitForm() {

        const shoppinglist:Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistform.value);
        shoppinglist.items = this.shoppinglistform.value.items;
        shoppinglist.user_id = this.shoppinglistform.value.user_id;
        shoppinglist.deadline = this.shoppinglistform.value.deadline;
        shoppinglist.comments = this.shoppinglist.comments;
        shoppinglist.user = this.shoppinglist.user;


        shoppinglist.user = this.shoppinglist.user;
        console.log(shoppinglist.user);
        if (this.isUpdatingShoppinglist) {
            this.bs.update(shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists/', shoppinglist.id], { relativeTo: this.route });
            });
        } else {
           /* for(var comment of shoppinglist.comments){
                comment.user_id = this.getCurrentUserId();
            }
           // shoppinglist.comments[0].user_id = this.getCurrentUserId();
            //shoppinglist.user_id = 1;// jsut for testing*/
            shoppinglist.user_id = this.getCurrentUserId();

            this.bs.create(shoppinglist).subscribe(res => {
                this.shoppinglist = ShoppinglistFactory.empty();
                this.shoppinglistform.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../shoppinglists'], {relativeTo: this.route})
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppinglistFormErrorMessages) {
            const control = this.shoppinglistform.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }
    public getCurrentUser(){
        return
    }

   /* submitHelperForm(){
        console.log("HELPER")
    }*/
}