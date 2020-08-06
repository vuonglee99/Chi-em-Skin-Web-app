import { Component, OnInit, Injector, Input } from '@angular/core';
import { Post } from '../../../core/model/post.model';
import { AppComponentBase } from '../../../core/app.component.base';
import {Question} from '../../../core/model/question.model';

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html'
})
export class PostListComponent extends AppComponentBase implements OnInit {

    @Input() sortBy: any = null;
    @Input() isPaging: boolean = false;
    @Input() postOnRow: string="col-lg-12 col-md-12 col-sm-12";
    @Input() pageSize: number = 12;
    @Input() isMinToMax: boolean = false;
    @Input() userID: string = null;
    @Input() isMaker:boolean=false;

    postList: Post[] = [];
    postInput: Post = new Post();
    questionInput:Question=new Question;


    isBusy: boolean = false;
    isEmpty: boolean = true;
    totalPost: number = 0;
    page=1;

    indexShow: number = -1;
    content: string = null;
    isShowComment:boolean=false;
    ngOnInit() {
        this.getCurrentUser();
        this.getAllPosts();
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.wowService.init();
    }

    getAllPosts() {
        this.isBusy = true;
        this.postInput.POST_USER_ID = this.userID;
        this.postInput.POST_STATUS="1";
        this.postService.getAllPosts(this.postInput).subscribe(res => {
            this.postList = res["data"];
            console.log(this.postList[0]);
            this.totalPost = this.postList.length;
            (this.totalPost == 0) ? this.isEmpty = true : this.isEmpty = false;
            if (this.sortBy != null) {
                for (var i = 0; i < this.totalPost; i++) {
                    for (var j = i + 1; j < this.totalPost; j++) {
                        if (this.isMinToMax == false) {
                            if (this.postList[i][this.sortBy] < this.postList[j][this.sortBy]) {

                                let post: Post = this.postList[i];
                                this.postList[i] = this.postList[j];
                                this.postList[j] = post;
                            }
                        } else {
                            if (this.postList[i][this.sortBy] > this.postList[j][this.sortBy]) {

                                let post: Post = this.postList[i];
                                this.postList[i] = this.postList[j];
                                this.postList[j] = post;
                            }
                        }

                    }
                }
            }
            this.isBusy = false;
        })
    }

    addComment(event,post:Post) {
        if (event.keyCode == 13 && this.questionInput.QUESTION_CONTENT !="") {
            this.isBusy=true;
        this.questionInput.PRODUCT_ID=post.POST_ID;
        this.questionInput.QUESTION_TIME=this.getDate(new Date());
        this.productService.addQuestion(this.questionInput).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=="0"){
                this.redirectTo('/post/','');
                
            }else{
                this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
            }
        })
        }

    }

    showComment(index: number) {
        (this.indexShow!=index)? this.isShowComment=true:this.isShowComment = !this.isShowComment;
        this.indexShow = index;
        this.questionInput.QUESTION_CONTENT="";
    }
   
    deletePost(post:Post){
        this.isBusy=true;
        this.postService.deletePost(post.POST_ID).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=='0')
            {
                this.notificationService.showSuccess('Xóa bài đăng thành công!','Thông báo');
                this.location.back();
            }else this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
        })
    }


}