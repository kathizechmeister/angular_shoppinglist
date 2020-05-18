import {Item} from "./item";
import {Comment} from "./comment";
import {User} from "./user";
export {Item};
export {Comment};
export {User};

export class Shoppinglist {
    constructor(
        public id:number,
        public title: string,
        public user_id: number,
        public items: Item[],
        public user:User[],
        public costs?: number,
        public helper_id?: number,
        public helper?:User[],
        public deadline?: Date,
        public comments?: Comment[]


    )
    {}

}

