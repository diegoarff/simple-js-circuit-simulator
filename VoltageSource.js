import Component from "./Component.js";

export default class VoltageSource extends Component {
    constructor(x, y, img) {
        super(x, y, img);

    this.value;
    this.id=id;
    id++;

        this.dialog=document.createElement("div")
        this.dialog.id=`volt-modal-${id}`
        this.dialog.classList.add("centrado")


        this.dialog.innerHTML=`
        <div class="items-center">
        <div id="modal-content-${this.id}" class="items-center ">
        <h1 class="title-modal"> Voltage Source ${this.id} </h1>
        
        <div class="data-column">
        
        <label> Ohms </label>
        <input class="inputs-modal" type="text" id="volt-input-${this.id}" placeholder="Volts Value" />
        
        <button class="button-close" id="modal-volt-close-${this.id}"> Cerrar </button>
        </div>
        `
    }


    openModal(){

        document.body.appendChild(this.dialog)

        let voltsInput = document.getElementById(`volt-input-${this.id}`)
        

        let closeBTN = document.getElementById(`modal-volt-close-${this.id}`)
        closeBTN.addEventListener('click', ()=>{

            this.dialog.remove();
        })
    }

    
}

var id=0;