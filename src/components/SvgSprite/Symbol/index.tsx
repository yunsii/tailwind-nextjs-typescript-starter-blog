import { useEffect, useState } from 'react'
import { cIC, rIC } from 'idlization'

import type React from 'react'

const ID = 'svg-sprite-dynamic'

export interface ISvgSpriteItemProps {
  domStr: string
  pathname: string
}

const SvgSpriteSymbol: React.FC<ISvgSpriteItemProps> = (props) => {
  const { domStr: _domStr, pathname } = props

  const [domStr, setDomStr] = useState(_domStr)

  useEffect(() => {
    if (!domStr) {
      return
    }

    const handleInject = () => {
      const div = document.createElement('div')
      div.innerHTML = domStr

      // 如果通过 DOMParser 解析 svg 后挂载 vite.svg 渲染有问题，
      // 暂不清楚原因。
      const targetSvg = div.querySelector('svg')

      if (!targetSvg) {
        return
      }

      targetSvg.id = ID
      document.body.appendChild(targetSvg)
    }

    const handle = rIC(handleInject)

    return () => {
      cIC(handle)

      const targetSvg = document.body.querySelector(`#${ID}`)
      if (targetSvg) {
        document.body.removeChild(targetSvg)
      }
    }
  }, [domStr])

  useEffect(() => {
    if (!pathname) {
      return
    }

    async function run() {
      const response = await fetch(pathname)

      if (response.ok) {
        const data = await response.text()
        setDomStr(data)
      }
    }

    run()
  }, [pathname])

  return null
}

export default SvgSpriteSymbol
