"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { AppleHelloEffectEnglish } from "@/showcase/registry/transformed/components/apple-hello-effect/apple-hello-effect-english"
import { AppleHelloEffectHindi } from "@/showcase/registry/transformed/components/apple-hello-effect/apple-hello-effect-hindi"
import { AppleHelloEffectPortuguese } from "@/showcase/registry/transformed/components/apple-hello-effect/apple-hello-effect-portuguese"
import { AppleHelloEffectSpanish } from "@/showcase/registry/transformed/components/apple-hello-effect/apple-hello-effect-spanish"
import { AppleHelloEffectVietnamese } from "@/showcase/registry/transformed/components/apple-hello-effect/apple-hello-effect-vietnamese"

export default function AppleHelloEffectLanguagesDemo() {
  const [index, setIndex] = useState(0)

  const handleAnimationEnd = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 5)
  }

  const demos = [
    <AppleHelloEffectPortuguese
      key="portuguese"
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectEnglish
      key="english"
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectHindi
      key="hindi"
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectSpanish
      key="spanish"
      durationScale={0.8}
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectVietnamese key="vietnamese" durationScale={0.8} />,
  ]

  return <AnimatePresence mode="wait">{demos[index]}</AnimatePresence>
}
