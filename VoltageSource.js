import Component from "./Component.js";

export default class VoltageSource extends Component {
    constructor(x, y, img) {
        super(x, y, img);

        this.value = 0;
        this.id = id;
        id++;

        this.n1;
        this.n2;

        this.dialog = document.createElement("div")
        this.dialog.classList.add("dialog")

        this.dialog.innerHTML = `
        <div class="items-center">
            <div id="modal-content-${this.id}" class="items-center">
                <h1 class="title-modal">Voltage Source ${this.id}</h1>
        
                <div class="data">
                    <label>Volts</label>
                    <input class="inputs-modal" type="text" id="volt-input-${this.id}" autocomplete="off" placeholder="Volts Value" />
                </div>

                <button class="button-close" id="modal-volt-close-${this.id}"> Cerrar </button>
            </div>
        </div>`
    }

    changeNodes() {
        this.n1 = { x: this.x + this.width / 2, y: this.y }
        this.n2 = { x: this.x + this.width / 2, y: this.y + this.height }
    }

    update(ctx) {
        this.draw(ctx);
        this.changeNodes();
        ctx.fillText(`${this.value}V`, this.x - 30, this.y + this.height / 2);
    }

    openModal() {

        document.body.appendChild(this.dialog)

        let voltsInput = document.getElementById(`volt-input-${this.id}`);

        voltsInput.addEventListener('change', () => {
            this.value = Number(voltsInput.value);
        });

        document.getElementById(`modal-volt-close-${this.id}`).addEventListener("click", () => {
            this.dialog.remove();
        });
    }
}

var id = 0;