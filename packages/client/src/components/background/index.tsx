import styles from './styles.module.css'

type BackgroundProps = {
  children: React.ReactNode
  className?: string
  images?: string[]
}

export const Background = ({
  children,
  className,
  images = ['background_layer_1.png'],
}: BackgroundProps) => {
  const urls = images
    .reduce((acc, el) => acc + `url(./public/${el}) `, '')
    .trim()
    .replaceAll(' ', ', ')
  const root = document.documentElement
  root.style.setProperty('--background-images', urls)

  const stylesBackground = {
    backgroundImage: `${urls}`,
  }

  console.log(stylesBackground, urls)

  return (
    <div className={`${styles.background} ${className || ''}`}>{children}</div>
  )
}