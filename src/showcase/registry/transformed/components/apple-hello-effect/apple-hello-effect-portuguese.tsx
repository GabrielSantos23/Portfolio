"use client"

import type { ComponentProps } from "react"
import type { TargetAndTransition } from "motion/react"
import { motion } from "motion/react"

import { cn } from "@/showcase/lib/utils"

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
}

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
}

export type AppleHelloEffectProps = Omit<
  ComponentProps<typeof motion.svg>,
  "durationScale" | "onAnimationComplete"
> & {
  /**
   * Scales the duration and delay of the handwriting animation.
   * Values below 1 speed up, values above 1 slow down.
   * @defaultValue 1
   */
  durationScale?: number
  /** Called when the full handwriting animation completes. */
  onAnimationComplete?: () => void
}

export function AppleHelloEffectPortuguese({
  className,
  durationScale = 1,
  onAnimationComplete,
  ...props
}: AppleHelloEffectProps) {
  const calc = (x: number) => x * durationScale

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="40 0 552 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.888"
      strokeLinecap="round"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>olá</title>
      {/* olá */}
      <motion.path
        d="M234.601 94.36c-24.822 2.006-43.39 23.044-46.898 51.861-3.226 26.302 11.414 46.154 34.739 46.154 28.288 0 46.65-24.318 47.891-54.591.992-29.032-12.903-43.672-31.762-43.672-14.888 0-22.829 11.166-22.332 24.813.484 18.661 14.478 39.612 43.839 42.289 40.725 3.714 96.424-26.396 118.914-85.593 6.487-17.074 8.959-33.18 8.959-44.436 0-13.346-4.219-23.593-16.129-23.593-11.663 0-19.355 9.056-26.303 23.355-8.14 16.583-14.162 40.503-16.625 67.542-6.204 67.846 7.692 92.893 37.42 92.893 30.127 0 50.049-26.113 58.664-56.317"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(1.6),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.2, delay: calc(0.8) },
        }}
      />
      {/* a */}
      <motion.path
        d="M503.236 112.864c-4.864-11.195-15.204-18.753-31.664-18.753-27.295 0-47.808 27.296-49.155 56.576-1.174 26.799 11.192 41.864 28.805 41.687 25.001-.25 43.378-24.805 51.581-76.763 1.012-6.41 2.061-13.104 3.073-19.514"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeInOut",
          delay: calc(2.2),
          opacity: { duration: 0.2, delay: calc(2.3) },
        }}
      />
      <motion.path
        d="m505.875 96.097-3.073 19.507c-4.482 28.44-6.549 39.66-6.327 46.994.518 17.121 6.675 28.784 22.06 28.784 19.355 0 30.21-13.152 35.421-27.544"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(2.8),
          opacity: { duration: 0.2, delay: calc(2.8) },
        }}
      />
      {/* acento */}
      <motion.path
        d="M492 62c9-10 20-18 33-24"
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.4),
          ease: "easeOut",
          delay: calc(3.4),
          opacity: { duration: 0.2, delay: calc(3.4) },
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  )
}
