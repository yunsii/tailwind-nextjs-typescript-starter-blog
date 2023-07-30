import React from 'react'

import type { FunctionComponent } from 'mdx/types'

export interface IRubyProps extends React.HTMLAttributes<HTMLElement> {
  children: string
  rubyText: string
  rubyTextProps?: React.HTMLAttributes<HTMLElement>
}

const Ruby: FunctionComponent<IRubyProps> = (props) => {
  const { children, rubyText, rubyTextProps, ...rubyProps } = props

  if (rubyText.includes("'")) {
    return (
      <ruby {...rubyProps}>
        {rubyText.split("'").map((item, index) => {
          return (
            <React.Fragment key={item}>
              {children.split('')[index]}
              <rp>(</rp>
              <rt {...rubyTextProps}>{item}</rt>
              <rp>)</rp>
            </React.Fragment>
          )
        })}
      </ruby>
    )
  }

  return (
    <ruby {...rubyProps}>
      {children}
      <rp>(</rp>
      <rt {...rubyTextProps}>{rubyText}</rt>
      <rp>)</rp>
    </ruby>
  )
}

export default Ruby
