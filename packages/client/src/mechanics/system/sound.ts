export class Sound {
  sound: HTMLAudioElement
  constructor(src: string) {
    this.sound = document.createElement('audio')
    this.sound.src = src
    this.sound.setAttribute('preload', 'auto')
    this.sound.setAttribute('controls', 'none')
    this.sound.style.display = 'none'
    document.body.append(this.sound)
  }
  play = () => {
    this.sound.play()
  }
  stop() {
    this.sound.pause()
  }
}
