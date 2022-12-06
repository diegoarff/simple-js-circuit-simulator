import Component from "./Component.js";

export default class Wire extends Component {

    constructor(x, y, img, rotate) {
        super(x, y, img);
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
    }


}