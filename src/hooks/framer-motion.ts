import { useRef, useState } from 'react'

import { idleQueue } from '@/helpers/idle'

import { useMountOnce } from './react'

import type React from 'react'

async function importFramerMotion() {
  return await import('framer-motion')
}

export type FramerMotionModules = Awaited<ReturnType<typeof importFramerMotion>>

export type UseFramerMotionResult =
  | {
      ready: false
      modules: null
    }
  | {
      ready: true
      modules: FramerMotionModules
    }

let modules: FramerMotionModules | null = null
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
      modules = await importFramerMotion()
      callbacks.forEach((item) => item())
    })
  })

  return { ready, modules } as UseFramerMotionResult
}

async function importFlubber() {
  return await import('flubber')
}

export type InterpolateFn = Awaited<
  ReturnType<typeof importFlubber>
>['interpolate']

export type UseFlubberInterpolateResult =
  | {
      ready: false
      interpolate: null
    }
  | {
      ready: true
      interpolate: InterpolateFn
    }

let interpolate: InterpolateFn | null = null
let interpolateTaskPushed = false
const interpolateCallbacks: (() => void)[] = []

export function useFlubberInterpolate(): UseFlubberInterpolateResult {
  const [ready, setReady] = useState(!!interpolate)

  useMountOnce(() => {
    callbacks.push(() => setReady(true))

    if (interpolateTaskPushed) {
      return
    }
    interpolateTaskPushed = true

    idleQueue.pushTask(async () => {
      const result = await importFlubber()

      interpolate = result.interpolate

      interpolateCallbacks.forEach((item) => item())
    })
  })

  return { ready, interpolate } as UseFlubberInterpolateResult
}

export function useRuntimeComponent<T>(component: React.FC<T>) {
  return useRef(component).current
}
