import {User} from "./shoppinglist";

export class Comment {
    constructor(public id: number,
                public commenttext: string,
                public user_id: number,
                public shoppinglist_id: number
    )
    {}
}
