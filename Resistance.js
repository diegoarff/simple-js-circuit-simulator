import Component from "./Component.js";

export default class Resistance extends Component {

    constructor(x, y, img, rotate) {
        super(x, y, img);

        this.value = 0;
        this.ampere;
        this.volts;
        this.power;
        this.rotate = rotate;
        this.n1;
        this.n2;

        this.id = id;
        id++;

        this.dialog = document.createElement("div")
        this.dialog.classList.add("dialog")

        this.dialog.innerHTML = `
            <div class="items-center">
                <h1 class="title-modal">Resistance ${this.id} </h1>
        
                <div class="data">
                    <label>Ohms</label>
                    <input class="inputs-modal" type="text" id="res-ohm-${this.id}" autocomplete="off" placeholder="Ohms Value" />
                </div>
        
                <div class="data">
                    <label>Volts</label>
                    <input class="inputs-modal" type="text" id="res-volt-${this.id}"/>
                </div>

                <div class="data">
                    <label>Ampere</label>
                    <input class="inputs-modal" type="text" id="res-ampere-${this.id}"/>
                </div>

                <div class="data">
                    <label>Power</label>
                    <input class="inputs-modal" disabled type="text" id="res-power-${this.id}"/>
                </div>

                <button class="button-close" id="modal-close-${this.id}"> Cerrar </button>
            </div>`
    }

    changeNodes() {
        if (this.rotate) {
            this.n1 = { x: this.x + this.width / 2, y: this.y }
            this.n2 = { x: this.x + this.width / 2, y: this.y + this.height }
        } else {
            this.n1 = { x: this.x, y: this.y + this.height / 2 }
            this.n2 = { x: this.x + this.width, y: this.y + this.height / 2 }
        }
    }

    update(ctx) {
        this.draw(ctx);
        this.changeNodes();
        if (this.rotate) {
            ctx.fillText(`${this.value}Ω`, this.x + 70, this.y + this.height / 2);
        } else {
            ctx.fillText(`${this.value}Ω`, this.x + 80, this.y + 25);
        }

    }

    openModal() {

        document.body.appendChild(this.dialog)

        let ohmInput = document.getElementById(`res-ohm-${this.id}`)
        let voltInput = document.getElementById(`res-volt-${this.id}`)
        let ampInput = document.getElementById(`res-ampere-${this.id}`)
        let powerInput = document.getElementById(`res-power-${this.id}`)

        ohmInput.blur();

        ohmInput.addEventListener('change', () => {
            this.value = Number(ohmInput.value)
            this.ampere = this.volts / this.value;
            this.volts = this.value * this.ampere;
            this.power = this.value * this.ampere * this.ampere;

            voltInput.value = this.volts;
            ampInput.value = this.ampere;
            powerInput.value = this.power;
        });

        ampInput.addEventListener('change', () => {
            this.ampere = Number(ampInput.value)

            this.volts = this.value * this.ampere;
            this.power = this.value * this.ampere * this.ampere;

            voltInput.value = this.volts;
            ampInput.value = this.ampere;
            powerInput.value = this.power;

        })

        voltInput.addEventListener('change', () => {
            this.volts = Number(voltInput.value)
            this.ampere = this.volts / this.value;

            this.power = this.value * this.ampere * this.ampere;

            voltInput.value = this.volts;
            ampInput.value = this.ampere;
            powerInput.value = this.power;

        })

        document.getElementById(`modal-close-${this.id}`).addEventListener("click", () => {
            this.dialog.remove();
        });
    }
}

var id = 0;
