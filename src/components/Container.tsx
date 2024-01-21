import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

const Container: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    useCustom?: boolean
  }
> = ({ children, useCustom, className, ...props }) => (
  <div
    {...props}
    className={`container px-4 mx-auto ${
      useCustom ? ' custom-container' : ''
    } ${className}`}
  >
    {children}
  </div>
)

export default Container
