import { Component, OnInit, Injector, Input } from '@angular/core';
import { Question } from '../../../core/model/question.model';
import { AppComponentBase } from '../../../core/app.component.base';


@Component({
    selector: 'app-question-list',
    templateUrl: 'question-list.component.html'
})
export class QuestionListComponent extends AppComponentBase implements OnInit {

    @Input() sortBy: string = null;
    @Input() isPaging: boolean = false;
    @Input() pageSize: number = 12;
    @Input() productID: string = null;
    @Input() isMinToMax: boolean = false;
    @Input() isProductQuestion: boolean = true;

    questionList: Question[] = [];
    questionInput: Question = new Question();

    isBusy: boolean = false;
    isEmpty: boolean = true;
    totalQuestion: number = 0;
    page: number = 1;
    indexShow:number=-1;
    isAnswer:boolean=false;
    ngOnInit() {
        this.getCurrentUser();
        this.getAllQuestions();
    }

    constructor(
        injector: Injector,

    ) {
        super(injector);

    }

    getAllQuestions() {
        this.isBusy = true;
        this.questionInput.PRODUCT_ID = this.productID;
        this.productService.getProductQuestion(this.questionInput.PRODUCT_ID).subscribe(res => {
            this.questionList = res["data"];
            this.totalQuestion = this.questionList.length;
            (this.totalQuestion == 0) ? this.isEmpty = true : this.isEmpty = false;

            if (this.sortBy != null) {
                for (var i = 0; i < this.totalQuestion; i++) {
                    for (var j = i + 1; j < this.totalQuestion; j++) {
                        if (!this.isMinToMax) {//từ lớn đến bé
                            if (this.questionList[i][this.sortBy] < this.questionList[j][this.sortBy]) {

                                let question: Question = this.questionList[i];
                                this.questionList[i] = this.questionList[j];
                                this.questionList[j] = question;
                            }
                        } else {
                            if (this.questionList[i][this.sortBy] > this.questionList[j][this.sortBy]) {

                                let question: Question = this.questionList[i];
                                this.questionList[i] = this.questionList[j];
                                this.questionList[j] = question;
                            }
                        }

                    }
                }
            }
            this.isBusy = false;
        })
    }

    answerQuestion(event, question: Question, index: number) {

        if (event.keyCode == 13 && this.questionInput.QUESTION_ANSWER != "") {

            this.isBusy = true;
            question.QUESTION_ANSWER = this.questionInput.QUESTION_ANSWER;
            this.productService.updateQuestion(question).subscribe(res => {
                this.isBusy = false;
                if (res["data"].RESULT == "0") {
                    this.questionList[index].QUESTION_ANSWER = this.questionInput.QUESTION_ANSWER;
                    this.notificationService.showSuccess( 'Phản hồi thành công.','Thông báo!');
                    this.questionInput.QUESTION_ANSWER="";
                } else {
                    this.notificationService.showError(res["data"].ERROR_DESC,"Lỗi");
                }
            });
        }

    }

    showAnswer(index: number) {
        (this.indexShow != index) ? this.isAnswer = true : this.isAnswer = !this.isAnswer;
        this.indexShow = index;
        this.questionInput.QUESTION_CONTENT = "";
    }
}