"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/showcase/lib/soundcn/metal-click"
import { useSound } from "@/showcase/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * An isometric SVG mark whose outline is traced by a gradient highlight that
 * follows the cursor, paired with a springy press effect and a tactile click
 * sound.
 *
 * Swap the SVG paths below for your own artwork. The interaction is driven by:
 * - a `radialGradient` whose center springs toward the pointer (the spotlight),
 *   reused as a second stroke layered over the base outline.
 * - `whileTap="pressed"` morphing the path `d` values between two states.
 */
const G_SUBPATH =
  "M773 161L773 202L577 315L528 286L704 183L671 166L527 250L462 250L363 191L548 84L638 83L644 88L465 190L464 192L495 210L646 124L706 123Z"
const S_SUBPATH =
  "M546 334L350 447L278 447L145 370L146 316L334 210L381 239L207 339L206 342L211 345L321 407L444 336L411 316L343 354L297 327L414 258Z"
const TOP_D = `${G_SUBPATH} ${S_SUBPATH}`

const WALL_D =
  "M773 202L577 315L577 351L773 238ZM577 315L528 286L528 322L577 351ZM704 183L671 166L671 202L704 219ZM671 166L527 250L527 286L671 202ZM527 250L462 250L462 286L527 286ZM462 250L363 191L363 227L462 286ZM644 88L638 83L638 119L644 124ZM465 190L464 192L464 228L465 226ZM464 192L495 210L495 246L464 228ZM495 210L646 124L646 160L495 246ZM546 334L350 447L350 483L546 370ZM350 447L278 447L278 483L350 483ZM145 370L146 316L146 352L145 406ZM334 210L381 239L381 275L334 246ZM207 339L206 342L206 378L207 375ZM211 345L321 407L321 443L211 381ZM414 258L546 334L546 370L414 294Z"
const WALL_D_PRESSED =
  "M773 218L577 331L577 351L773 238ZM577 331L528 302L528 322L577 351ZM704 199L671 182L671 202L704 219ZM671 182L527 266L527 286L671 202ZM527 266L462 266L462 286L527 286ZM462 266L363 207L363 227L462 286ZM644 104L638 99L638 119L644 124ZM465 206L464 208L464 228L465 226ZM464 208L495 226L495 246L464 228ZM495 226L646 140L646 160L495 246ZM546 350L350 463L350 483L546 370ZM350 463L278 463L278 483L350 483ZM145 386L146 332L146 352L145 406ZM334 226L381 255L381 275L334 246ZM207 355L206 358L206 378L207 375ZM211 361L321 423L321 443L211 381ZM414 274L546 350L546 370L414 294Z"

export function SpotlightLogo() {
  const id = useId()
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [125, 795]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [60, 505]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return
    if (window.matchMedia("(hover: none)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_14%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_20%,var(--background))]"
      viewBox="125 60 670 445"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#fff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-180 440L980 -160" />
        <path d="M-160 -60L1040 530" />
        <path d="M100 530L920 -50" />
      </g>

      <motion.path
        d={WALL_D}
        variants={{
          normal: { d: WALL_D },
          pressed: { d: WALL_D_PRESSED },
        }}
        transition={transition}
        className="fill-background"
      />
      <motion.path
        d={WALL_D}
        variants={{
          normal: { d: WALL_D },
          pressed: { d: WALL_D_PRESSED },
        }}
        transition={transition}
        stroke="var(--stroke)"
      />

      <motion.g
        variants={{
          normal: { transform: "translate(0px, 0px)" },
          pressed: { transform: "translate(0px, 16px)" },
        }}
        transition={transition}
      >
        <path d={TOP_D} className="fill-background" fillRule="evenodd" />
        <path d={TOP_D} fill={`url(#${ids.facePattern})`} fillRule="evenodd" />
        <path d={TOP_D} fillRule="evenodd" stroke="var(--stroke)" />
        <path
          d={TOP_D}
          fillRule="evenodd"
          stroke={`url(#${ids.radialGradient})`}
        />
      </motion.g>
    </motion.svg>
  )
}
