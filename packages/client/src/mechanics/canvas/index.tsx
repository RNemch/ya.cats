import { Game } from '@mechanics/engine/game'
import { useEffect, useRef } from 'react'
import styles from './canvas.module.css'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef) throw new Error('Canvas not found')
    const game = new Game(canvasRef)
    game.start()

    return () => game.destroy()
  }, [])
  return <canvas id="canvas" className={styles.canvas} ref={canvasRef}></canvas>
}
