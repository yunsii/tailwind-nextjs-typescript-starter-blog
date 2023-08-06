import { useRef, useState } from 'react'

import { idleQueue } from '@/helpers/idle'

import { useMountOnce } from './react'

import type React from 'react'
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
const callbacks: (() => void)[] = []

export function useFramerMotion() {
  const [ready, setReady] = useState(!!modules)

  useMountOnce(() => {
    callbacks.push(() => setReady(true))

    if (pushed) {
      return
    }
    pushed = true

    idleQueue.pushTask(async () => {
      const coreFramerMotionModules = await importFramerMotion()
      const { interpolate } = await import('flubber')

      const useFlubber = (progress: MotionValue<number>, paths: string[]) => {
        return coreFramerMotionModules.useTransform(
          progress,
          paths.map(getIndex),
          paths,
          {
            mixer: (a, b) => {
              return interpolate(a, b, { maxSegmentLength: 0.1 })
            },
          },
        )
      }

      // normalize path
      // https://svg-path-visualizer.netlify.app/
      // run script: Array.from($$('#root > div > div.cards > div.animation-wrapper > div > ul li code')).map(item=> item.innerText).join(' ')

      modules = {
        ...coreFramerMotionModules,
        useFlubber,
      }

      callbacks.forEach((item) => item())
    })
  })

  return { ready, modules } as UseFramerMotionResult
}

export function useRuntimeComponent<T>(component: React.FC<T>) {
  return useRef(component).current
}
