export default function generator({ item, cwd }) {
  return `
    import React from 'react'
    import SvgSpriteItem from '${cwd}/src/components/SvgSprite/Symbol/Item'

    export default React.forwardRef((props, ref) => {
      return React.createElement(SvgSpriteItem, {
        ref,
        ...props,
        item: ${JSON.stringify(item)},
      })
    })
  `
}
