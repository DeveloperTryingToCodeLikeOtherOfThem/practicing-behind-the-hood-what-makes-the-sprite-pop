namespace sprites {
    export class Sprite2 extends sprites.BaseSprite {
        _x: Fx8;
        _y: Fx8;
        _sx: Fx8;
        _sy: Fx8;
        _width: Fx8;
        _height: Fx8;
        private _image: Image;
        flags: number;

        constructor(img: Image) {
            super(scene.SPRITE_Z);
            this._x = Fx8(screen.width - img.width >> 1);
            this._y = Fx8(screen.height - img.height >> 1);
            this._sx = Fx.oneFx8;
            this._sy = Fx.oneFx8;
            this.setImage(img);
            this.flags = 0;
        }

        get image(): Image { return this._image; }
        setImage(img: Image) {
            if (!img || img === this._image) return;
            this._image = img;
            this.recalcSize();
        }
        protected recalcSize(): void {
            this._width = Fx8(this._image.width * this.sx);
            this._height = Fx8(this._image.height * this.sy);
        }

        get sx(): number { return Fx.toFloat(this._sx); }
        set sx(v: number) {
            this._sx = Fx8(Math.max(0, v));
            this.recalcSize();
        }
        get sy(): number { return Fx.toFloat(this._sy); }
        set sy(v: number) {
            this._sy = Fx8(Math.max(0, v));
            this.recalcSize();
        }
        get width() { return Fx.toFloat(this._width); }
        get height() { return Fx.toFloat(this._height); }
        get left() { return Fx.toFloat(this._x); }
        get top() { return Fx.toFloat(this._y); }

        protected isScaled(): boolean {
            return this._sx !== Fx.oneFx8 || this._sy !== Fx.oneFx8;
        }

        protected drawSprite(drawLeft: number, drawTop: number) {
            if (!this.isScaled())
                screen.drawTransparentImage(this._image, drawLeft, drawTop);
            else
                screen.blit(
                    drawLeft, drawTop,
                    this.width,
                    this.height,
                    this._image,
                    0, 0,
                    this._image.width, this._image.height,
                    true, false
                );
        }

        // Example draw method for manual drawing (usually engine handles)
        draw(camera?: scene.Camera) {
            const ox = camera ? camera.drawOffsetX : 0;
            const oy = camera ? camera.drawOffsetY : 0;
            const l = Math.floor(this.left - ox);
            const t = Math.floor(this.top - oy);
            this.drawSprite(l, t);
        }
    }
   
    //% block="%img=screen_image_picker %kind=spritekind"
    export function create2(img: Image, kind?: number) {
        const sprite2 = new Sprite2(img)
        sprites.create(img, kind)
        return sprite2
    }
}
