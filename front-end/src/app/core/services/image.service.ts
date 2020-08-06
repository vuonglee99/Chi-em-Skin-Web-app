import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

   private brandImageObject: Array<object> = [{
        image: 'assets/img/brand/Innisfree_brand.jpg',
        thumbImage: 'assets/img/brand/Innisfree_brand.jpg',
    },
    {
        image: 'assets/img/brand/moi_logo.png',
        thumbImage: 'assets/img/brand/moi_logo.png',
    },
    {
        image: 'assets/img/brand/laneige-brand.png',
        thumbImage: 'assets/img/brand/laneige-brand.png',
    },
    {
        image: 'assets/img/brand/laroche-posay-brand.png',
        thumbImage: 'assets/img/brand/laroche-posay-brand.png',
    },
    {
        image: 'assets/img/brand/lancome_logo.jpeg',
        thumbImage: 'assets/img/brand/lancome_logo.jpeg',
    },
    {
        image: 'assets/img/brand/Loreal-Paris-brand.png',
        thumbImage: 'assets/img/brand/Loreal-Paris-brand.png',
    },
    {
        image: "assets/img/brand/paulas-choice-brand.png",
        thumbImage: "assets/img/brand/paulas-choice-brand.png",
    },
    {
        image: 'assets/img/brand/vichy-brand.png',
        thumbImage: 'assets/img/brand/vichy-brand.png',
    },

    {
        image: 'assets/img/brand/caryophy_logo.jpg',
        thumbImage: 'assets/img/brand/caryophy_logo.jpg',
    },

    {
        image: 'assets/img/brand/sakura_logo.png',
        thumbImage: 'assets/img/brand/sakura_logo.png',
    },
    {
        image: 'assets/img/brand/biore_logo.jpg',
        thumbImage: 'assets/img/brand/biore_logo.jpg',
    },
    {
        image: 'assets/img/brand/dove_logo.jpg',
        thumbImage: 'assets/img/brand/dove_logo.jpg',
    },
    {
        image: 'assets/img/brand/thefaceshop_loggo.jpg',
        thumbImage: 'assets/img/brand/thefaceshop_loggo.jpg',
    },
    {
        image: 'assets/img/brand/thebodyshop_logo.jpg',
        thumbImage: 'assets/img/brand/thebodyshop_logo.jpg',
    },
    ];


    private topImageObject: Array<object> = [
        {
            image: 'assets/img/skincare/top_image_1.jpg',
            thumbImage: 'assets/img/skincare/top_image_1.jpg',
        },
        {
            image: 'assets/img/skincare/top_image_2.jpg',
            thumbImage: 'assets/img/skincare/top_image_2.jpg',
        },
        {
            image: 'assets/img/skincare/top_image_5.jpg',
            thumbImage: 'assets/img/skincare/top_image_5.jpg',
        },
        {
            image: 'assets/img/skincare/top_image_4.jpg',
            thumbImage: 'assets/img/skincare/top_image_4.jpg',
        }
    ]

    getBrandImageObject(): Array<object> {
        return this.brandImageObject;
    }


    getTopImageObject():Array<object>{
        return this.topImageObject;
    }



}