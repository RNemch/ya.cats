
export class GameScreen {
  constructor(gameSettings) {
    this.width = gameSettings.width;
    this.height = gameSettings.height;

    this.gameSettings = gameSettings;

    this.bg1_x = 0;
    this.bg2_x = 0;
    this.bg3_x = 0;

    this.widthOffset = this.width - 2;
    this.bg1_2_x = this.widthOffset;
    this.bg2_2_x = this.widthOffset;
    this.bg3_2_x = this.widthOffset;

    this.bg1_xv = 1
    this.bg2_xv = 1.3
    this.bg3_xv = 2;

    this.bg1 = new Image();
    this.bg2 = new Image();
    this.bg3 = new Image();

    this.init();
  }

  init() {
    this.bg1.src = "./background_layer_1.png";
    this.bg2.src = "./background_layer_2.png";
    this.bg3.src = "./background_layer_3.png";
  }

  draw(ctx) {
    ctx.drawImage(this.bg1, Math.floor(this.bg1_x), 0, this.width, this.height);
    ctx.drawImage(this.bg1, Math.floor(this.bg1_2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg2, Math.floor(this.bg2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg2, Math.floor(this.bg2_2_x), 0, this.width, this.height);
    ctx.drawImage(this.bg3, Math.floor(this.bg3_x), 0, this.width, this.height);
    ctx.drawImage(this.bg3, Math.floor(this.bg3_2_x), 0, this.width, this.height);
  }

  update(dt) {
    this.bg1_x -= this.bg1_xv * this.gameSettings.gameSpeed * dt;
    this.bg2_x -= this.bg2_xv * this.gameSettings.gameSpeed * dt;
    this.bg3_x -= this.bg3_xv * this.gameSettings.gameSpeed * dt;

    this.bg1_2_x -= this.bg1_xv * this.gameSettings.gameSpeed * dt;
    this.bg2_2_x -= this.bg2_xv * this.gameSettings.gameSpeed * dt;
    this.bg3_2_x -= this.bg3_xv * this.gameSettings.gameSpeed * dt;

    if (this.bg1_x <= -this.widthOffset) {
      this.bg1_x = this.widthOffset;
    }
    if (this.bg1_2_x <= -this.widthOffset) {
      this.bg1_2_x = this.widthOffset;
    }
    if (this.bg2_x <= -this.widthOffset) {
      this.bg2_x = this.widthOffset;
    }
    if (this.bg2_2_x <= -this.widthOffset) {
      this.bg2_2_x = this.widthOffset;
    }
    if (this.bg3_x <= -this.widthOffset) {
      this.bg3_x = this.widthOffset;
    }
    if (this.bg3_2_x <= -this.widthOffset) {
      this.bg3_2_x = this.widthOffset;
    }
  }
}
