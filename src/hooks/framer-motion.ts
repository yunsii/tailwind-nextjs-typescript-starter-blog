import { useEffect, useState } from 'react'
import { useTransform } from 'framer-motion'

import { idleQueue } from '@/helpers/idle'

import type { MotionValue } from 'framer-motion'

export const getIndex = (_: any, index: number) => index

async function importFramerMotion() {
  return await import('framer-motion')
}

type UseFlubber = (
  progress: MotionValue<number>,
  paths: string[],
) => MotionValue<string>

export type FramerMotionModules = Awaited<ReturnType<typeof importFramerMotion>>

export interface MergedFramerMotionModules extends FramerMotionModules {
  useFlubber: UseFlubber
}

export type UseFramerMotionResult =
  | {
      ready: false
      modules: null
    }
  | {
      ready: true
      modules: MergedFramerMotionModules
    }

let modules: MergedFramerMotionModules | null = null
let pushed = false

export function useFramerMotion() {
  const [ready, setReady] = useState(!!modules)

  useEffect(() => {
    if (pushed) {
      return
    }
    pushed = true

    idleQueue.pushTask(async () => {
      const result = await importFramerMotion()
      const { interpolate } = await import('flubber')

      const useFlubber = (progress: MotionValue<number>, paths: string[]) => {
        return useTransform(progress, paths.map(getIndex), paths, {
          mixer: (a, b) => {
            return interpolate(a, b, { maxSegmentLength: 0.1 })
          },
        })
      }

      // normalize path
      // https://svg-path-visualizer.netlify.app/
      // run script: Array.from($$('#root > div > div.cards > div.animation-wrapper > div > ul li code')).map(item=> item.innerText).join(' ')

      modules = {
        ...result,
        useFlubber,
      }

      setReady(true)
    })
  }, [])

  return { ready, modules } as UseFramerMotionResult
}
