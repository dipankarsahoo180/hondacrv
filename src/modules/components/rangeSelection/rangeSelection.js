import { LightningElement,api } from "lwc";

export default class RangeSelection extends LightningElement{
    @api variants;
    selectionHandler(evt){
        const {value} = evt.target;
        const selected = this.variants?.find(item=>item.variant === value);
        this.dispatchEvent(new CustomEvent("selection",{detail:{selectedProperty:selected,variant:value}}));
    }
}