import { LightningElement } from 'lwc';
const CRV_VARIANTS = [
    {
      variant:"VTi",
      price:38900,
      formattedPrice:"$38,900",
      fuelConsumption:7,
      seatingCapacity:5,
      allowWheels:17,
      checked:true,
      imageName:"ignite_red"
    },
    {
      variant:"VTi 7",
      formattedPrice:"$40,900",
      price:40900,
      fuelConsumption:7.3,
      seatingCapacity:7,
      allowWheels:17,
      imageName:"ignite_red"
    },
    {
      variant:"VTi X",
      formattedPrice:"$41,900",
      price:41900,
      fuelConsumption:7.3,
      seatingCapacity:5,
      allowWheels:18,
      imageName:"ignite_red"
    },
    {
      variant:"VTi LX AWD",
      formattedPrice:"$53,600",
      price:53600,
      fuelConsumption:7.4,
      seatingCapacity:5,
      allowWheels:19,
      imageName:"ignite_red"
    }
  ]
// Define the colors available for the car
const COLORS = [
    {label:"Ignite Red (Metallic)", value:"ignite_red", checked:true},
    {label:"Brilliant Sporty Blue", value:"sporty_blue"},
    {label:"Crystal Black", value:"crystal_black"},
    {label:"Platinum White (Pearlescent)", value:"platinum_white"}
  ]

  const ANIMATED_STARTING_PRICE = 38000;
export default class BuildAndPrice extends LightningElement {
  showModal =false;
  selectedVariant = CRV_VARIANTS[0];
    crvVariants = CRV_VARIANTS;
    colorsList = COLORS;
    selectedPrice = this.selectedVariant.price;
    selectedImageName = this.colorsList[0].value;
    selectedColorName = this.colorsList[0].label;
    animatedPriceValue;

    connectedCallback(){
      this.animatedPrice()
    }

    animatedPrice(){
      this.animatedPriceValue = ANIMATED_STARTING_PRICE;
      let interval = window.setInterval(()=>{
        if(this.selectedPrice != this.animatedPriceValue){
          this.animatedPriceValue = this.animatedPriceValue+100;
        }else{
          window.clearInterval(interval);
        }
      },10)
    }

    selectionHandler(evt){
        const {selectedProperty,variant} = evt.detail;
        this.selectedVariant = {...selectedProperty, imageName:this.selectedImageName};
        this.selectedPrice = this.selectedVariant.price;
        this.updateVariant(variant);
        this.animatedPrice();
    }

    //Handler for when a color is selected
    colorSelectionHandler(event){
        this.selectedImageName = event.detail;
        this.selectedVariant = {...this.selectedVariant,imageName:this.selectedImageName};
        this.updateColors(this.selectedImageName);
    }

    //based on the selected Value
    updateColors(value){
        this.colorsList = this.colorsList.map(item=>{
            let checked = item.value ==value;
            if(checked) this.selectedColorName = item.label;
            return {...item, checked};
        })
    }


    //based on the selected variant
    updateVariant(value){
        this.crvVariants = this.crvVariants.map(item=>{
            let checked = item.variant == value;
            return {...item, checked};
        })
    }

    //open the modal 
    openModalHandler(){
      this.showModal = true
    }

    cancelHandler(){
      this.showModal = false
    }

    submitHandler(){
      console.log("Form Submitted!!");
      this.showModal = false;
    }
}