export default class Component {
    constructor(x, y, img) {

        this.image = img;
        this.x = x;
        this.y = y;
        this.width = this.image.width;
        this.height = this.image.height;
        this.dragging = false;
        this.offsetX;
        this.offsetY;

    }

    draw(ctx) {
        if (this.dragging) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

        ctx.drawImage(this.image, this.x, this.y);
    }

}