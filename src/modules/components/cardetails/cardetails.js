import { LightningElement,api } from 'lwc';

export default class Cardetails extends LightningElement {
    _selectedVariant = {};
    @api 
    get selectedVariant(){

    }

    set selectedVariant(data){
        if (data && data.variant){
            let model = data.variant.toLowerCase().replaceAll(' ','');
            let selectedImage = `/public/assets/honda/${model}/${data.imageName}.png`;
            this._selectedVariant = {...data,"selectedimage":selectedImage}
        }
    }
}