import {Comment, Shoppinglist} from "./shoppinglist";


export class ShoppinglistFactory {

    static empty(): Shoppinglist {
        return new Shoppinglist(
            0, '', 0, [],[], null,
            0, [],null, []);
    }
    static commentEmpty(): Comment{
        return new Comment(
            0, '', 0,0
        );
    }

    static fromObject(rawShoppinglist:any):Shoppinglist{
        return new Shoppinglist(
            rawShoppinglist.id,
            rawShoppinglist.title,
            rawShoppinglist.user_id,
            rawShoppinglist.user,
            rawShoppinglist.items,
            rawShoppinglist.costs,
            rawShoppinglist.helper_id,
            rawShoppinglist.helper,
            rawShoppinglist.deadline,
            rawShoppinglist.comments
        )
    }
    static fromObjectComment(rawComment:any):Comment{
        return new Comment(
            rawComment.id,
            rawComment.commenttext,
            rawComment.user_id,
            rawComment.shoppinglist_id
        )
    }
}
