export class Question{
    QUESTION_ID :string;
	PRODUCT_ID :string;
	QUESTION_CONTENT :string;
	QUESTION_ANSWER :string;
    QUESTION_TIME:string;
    PRODUCT_RATING:number;
    
    constructor(){
        this.QUESTION_ID =null;
	    this.PRODUCT_ID =null;
	    this.QUESTION_CONTENT =null;
	    this.QUESTION_ANSWER =null;
        this.QUESTION_TIME=null;
        this.PRODUCT_RATING=1;
    }
}