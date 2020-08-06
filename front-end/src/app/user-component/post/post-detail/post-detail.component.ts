import { Component, OnInit, Injector, Input } from '@angular/core';
import { Post } from '../../../core/model/post.model';
import { AppComponentBase } from '../../../core/app.component.base';
import {Question} from '../../../core/model/question.model';
import {ActivatedRoute} from '@angular/router';



@Component({
    selector: 'app-post-detail',
    templateUrl: 'post-detail.component.html'
})
export class PostDetailComponent extends AppComponentBase implements OnInit {
    currentPost: Post=new Post();
    postInput: Post = new Post();
    questionInput:Question=new Question;

    isShowComment:boolean=false;
    isBusy: boolean = false;
    ngOnInit() {
        this.getCurrentUser();
        this.currentPost.POST_ID=this.route.snapshot.paramMap.get("post_Id");
        this.getCurrentPost();
    }

    constructor(
        injector: Injector,
        private route :ActivatedRoute,

    ) {
        super(injector);
        this.titleService.setTitle('Chi tiết bài đăng');
        this.wowService.init();
    }

    getCurrentPost() {
        this.isBusy = true;
        this.postService.getPost(this.currentPost.POST_ID).subscribe(res => {
            this.currentPost= res["data"][0];
            if(!this.unAuth)
                this.checkMaker(this.currentPost.POST_USER_ID);
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
                this.redirectTo('/post/post-detail/',this.currentPost.POST_ID);
                
            }else{
                this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
            }
        })
        }

    }

    showComment(index: number) {
        this.isShowComment=!this.isShowComment;
        
    }

    editPost(){

    }

    deletePost(){
        this.isBusy=true;
        this.postService.deletePost(this.currentPost.POST_ID).subscribe(res =>{
            this.isBusy=false;
            if(res["data"].RESULT=='0')
            {
                this.notificationService.showSuccess('Xóa bài đăng thành công!','Thông báo');
                this.location.back();
            }else this.notificationService.showError(res["data"].ERROR_DESC,'Lỗi');
        })
    }
}