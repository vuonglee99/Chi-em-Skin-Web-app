import { Component, OnInit, Injector,ViewChild} from '@angular/core';
import { AppComponentBase } from '../../../core/app.component.base';
import { ProductType } from '../../../core/model/product-type.model';
import { Post } from '../../../core/model/post.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-add-post',
    templateUrl: 'add-post.component.html'
})
export class AddPostComponent extends AppComponentBase implements OnInit {

    newPostForm: FormGroup;
    newPostInput: Post = new Post();
    image: any = null;
    selectedFile: File = null;
    productTypeInput: ProductType = new ProductType();
    productTypeList: ProductType[] = [];
    typeNameList:string[]=[];

    isBusy: boolean;
    imgURL: any;


    @ViewChild('instance', {static: true}) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    ngOnInit() {
        this.checkAuth();
        this.titleService.setTitle("Đăng bài");
        this.postService.getPostId().subscribe(res => {
            this.newPostInput.POST_ID = res["data"].POST_ID;
        });
        this.getProductTypes();
    }

    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.newPostForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(10)]),
            'content': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]),
        });
        this.wowService.init();
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;
    
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
          map(term => (term === '' ? this.typeNameList
            :this.typeNameList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
      }
    addNewPost() {
        if (this.image != null && this.newPostForm.valid && this.newPostInput.POST_PRODUCT_TYPE!="") {
            this.newPostInput.POST_USER_ID = this.currentUser.USER_ID;
            this.newPostInput.POST_DATE=this.getDate(new Date());
            console.log(this.newPostInput);
            this.isBusy=true;
            this.postService.insert(this.newPostInput).subscribe(res => {
                if (res["data"].RESULT == "0") {
                    this.postService.addAvatar(this.newPostInput.POST_ID, this.image).subscribe(response => {
                        console.log(response);
                        if (response["data"].RESULT == "0") {
                            this.isBusy = false;
                            this.toastService.addSingle('success', '', 'Đăng bài thành công.');
                        }
                        else if (response["data"].RESULT == "-1") {
                            this.toastService.addSingle('error', '', response["data"].ERROR_DESC);
                        }
                    })
                } else if (res["data"].RESULT == "-1") {
                    this.toastService.addSingle('error', '', res["data"].ERROR_DESC);
                }
            });
        } else {
            this.notificationService.showError( "Cần hoàn thành tất cả các trường dữ liệu!","Lỗi");
        }
    }

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }

        console.log(this.image);
    }

    editorInit(event) {
        const quill = event.editor;
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', () => {
            const range = quill.getSelection();
            const value = prompt('What is the image URL');

            quill.insertEmbed(range.index, 'image', value, '');
        });
    }

    getProductTypes() {
        this.isBusy = true;
        this.productService.getAllProductType(this.productTypeInput).subscribe(res => {
            this.isBusy = false;
            this.productTypeList = res["data"];
            this.newPostInput.POST_PRODUCT_TYPE = this.productTypeList[0].PRODTYPE_NAME;
            for(var i=0;i<this.productTypeList.length;i++){
                this.typeNameList.push(this.productTypeList[i].PRODTYPE_NAME);
            }
        })
    }
}