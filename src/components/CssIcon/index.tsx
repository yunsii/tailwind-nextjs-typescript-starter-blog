export interface ICssIconProps {
  className?: string
  style?: React.CSSProperties
}

const CssIcon: React.FC<ICssIconProps> = (props) => {
  const { className, style } = props
  return <span className={className} style={style} />
}

export default CssIcon
