import { useRef } from 'react'

import type { LazyFramerMotionChildrenProps } from '@/components/LazyFramerMotion'

export function LazyLogo(props: LazyFramerMotionChildrenProps) {
  const { modules, fallback } = props
  const { motion } = modules
  const constraintsRef = useRef(null)

  return (
    <>
      <motion.div ref={constraintsRef}>
        <motion.div drag dragConstraints={constraintsRef}>
          {fallback}
        </motion.div>
      </motion.div>
    </>
  )
}
