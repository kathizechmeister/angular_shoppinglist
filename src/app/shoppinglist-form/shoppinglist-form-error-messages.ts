export class ErrorMessage {

    constructor(

        public forControl: string,

        public forValidator: string,

        public text: string

    ) { }

}

export const ShoppinglistFormErrorMessages = [

    new ErrorMessage('title', 'required', 'Ein Einkaufslistenname muss angegeben werden'),

    new ErrorMessage('deadline', 'required', 'Es muss eine Deadline angegeben werden'),

    new ErrorMessage('authors', 'required', 'Es muss ein Autor angegeben werden'),


];