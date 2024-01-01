import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

const Container: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div {...props} className={`${props.className} container px-4 mx-auto`}>
      {children}
    </div>
  )
}

export default Container
