export default function generator({ cwd, ...rest }) {
  return `
    import React from 'react'
    import SvgSpriteSymbol from '${cwd}/src/components/SvgSprite/Symbol'

    export default function SvgSpriteSymbolWrapper(props) {
      return React.createElement(SvgSpriteSymbol, {
        ...props,
        ...${JSON.stringify(rest)}
      })
    }
  `
}
