import Component from "./Component.js";

export default class Resistance extends Component {

    constructor(x, y, img) {
        super(x, y, img);
        
        this.value=0;
        this.ampere;
        this.volts;
        this.power;

        this.id=id;
        id++;
        
        this.dialog=document.createElement("div")
        this.dialog.id=`res-modal-${id}`
        this.dialog.classList.add("centrado")
        
        this.dialog.innerHTML=`
        <div class="items-center">
        <div id="modal-content-${this.id}" class="items-center ">
        <h1 class="title-modal"> Resistencia ${this.id} </h1>
        
        <div class="data-column">
        
        <label> Ohms </label>
        <input class="inputs-modal" type="text" id="res-ohm-${this.id}" placeholder="Ohms Value" />
        
        </div>
        
        <div class="data-column">
        
        <label> Volts </label>
        <input class="inputs-modal"  type="text" id="res-volt-${this.id}"/>
        
        </div>
        
        <div class="data-column">

        <label> Ampere </label>
        <input class="inputs-modal"  type="text" id="res-ampere-${this.id}"/>
        
        </div>
        
        
        <div class="data-column">
        
        <label> Power </label>
        <input class="inputs-modal" disabled type="text" id="res-power-${this.id}"/>
        
        </div>
        
        <button class="button-close" id="modal-close-${this.id}"> Cerrar </button>
        
        </div>`
        
       
        
    }
    
    openModal(){
        
        document.body.appendChild(this.dialog)
        

        let ohmInput = document.getElementById(`res-ohm-${this.id}`)
        ohmInput.blur();
        
        let voltInput = document.getElementById(`res-volt-${this.id}`)
        let ampInput = document.getElementById(`res-ampere-${this.id}`)
        let powerInput = document.getElementById(`res-power-${this.id}`)

        ohmInput.addEventListener('change', ()=>{
            this.value=Number(ohmInput.value)
            this.ampere=this.volts/this.value;
            this.volts=this.value*this.ampere;
            this.power=this.value*this.ampere*this.ampere;

            voltInput.value=this.volts;
            ampInput.value=this.ampere;
            powerInput.value=this.power;
            
        })

        ampInput.addEventListener('change', ()=>{
            this.ampere=Number(ampInput.value)
           
            this.volts=this.value*this.ampere;
            this.power=this.value*this.ampere*this.ampere;

            voltInput.value=this.volts;
            ampInput.value=this.ampere;
            powerInput.value=this.power;
            
        })

        voltInput.addEventListener('change', ()=>{
            this.volts=Number(voltInput.value)
            this.ampere=this.volts/this.value;
            
            this.power=this.value*this.ampere*this.ampere;

            voltInput.value=this.volts;
            ampInput.value=this.ampere;
            powerInput.value=this.power;
            
        })

    
        document.getElementById(`modal-close-${this.id}`).addEventListener("click", ()=>{
    
            
            this.dialog.remove();
    
        })
    }

}
var id=0;