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

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * An SVG mark whose outline is traced by a gradient highlight that follows the
 * cursor, paired with a springy press effect and a tactile click sound.
 *
 * Swap the SVG paths below for your own artwork. The interaction is driven by:
 * - a `radialGradient` whose center springs toward the pointer (the spotlight),
 *   reused as a second stroke layered over the base outline.
 * - `whileTap="pressed"` morphing the path `d` values between two states.
 *
 * The demo mark was designed by ncdai on Figma with the
 * [Fast Isometric Plugin](https://www.figma.com/community/plugin/1249759048471403961).
 * Reverted to original CD paths from git history, keeping custom export name.
 * Inspired by tailwindcss.com.
 */
export function SpotlightLogo() {
  const id = useId()
  const ids = {
    facePattern: `spotlight-logo-face-pattern-${id}`,
    faceFill: `spotlight-logo-face-fill-${id}`,
    stroke: `spotlight-logo-stroke-${id}`,
    radialGradient: `spotlight-logo-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)

  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [50, 670]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [30, 404]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      return
    }

    if (window.matchMedia("(hover: none)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-[40rem] w-full touch-manipulation [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="-5 -26 760 374"
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

        <motion.g
          id={ids.faceFill}
          variants={{
            normal: {
              transform: "translate(0px, 0px)",
            },
            pressed: {
              transform: "translate(0px, 16px)",
            },
          }}
          transition={transition}
        >
          <path d="M194.49 144.58L83.64 208.58L194.49 272.58L305.34 208.58L360.77 240.58L194.49 336.58L-27.21 208.58L139.06 112.58L194.49 144.58Z" />
          <path d="M360.77 176.58L305.34 208.58L194.49 144.58L249.91 112.58L360.77 176.58Z" />
          <path d="M249.92 48.58L305.34 16.58L360.77 48.58L388.48 32.58L443.91 64.58L471.62 48.58L360.77 -15.42L416.19 -47.42L637.90 80.58L582.47 112.58L527.05 80.58L499.33 96.58L443.91 64.58L416.19 80.58L527.05 144.58L471.62 176.58Z" />
        </motion.g>

        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // D
                "M305.34 208.58 L360.77 240.58 V272.58 L194.49 368.58 L-27.21 240.58 V208.58 L139.06 112.58 L305.34 208.58",
                "M-27.21 208.58 L194.49 336.58 L360.77 240.58",
                "M333.05 224.58 L360.77 208.58 V176.58 L249.91 112.58 L83.64 208.58 L194.49 272.58 L360.77 176.58",
                "M111.35 224.58 L194.49 176.58 L277.63 224.58",
                "M194.49 336.58 V368.58",
                "M194.49 144.58 V176.58",
                // N
                "M249.92 48.58L305.34 16.58L360.77 48.58L388.48 32.58L443.91 64.58L471.62 48.58L360.77 -15.42L416.19 -47.42L637.90 80.58L582.47 112.58L527.05 80.58L499.33 96.58L443.91 64.58L416.19 80.58L527.05 144.58L471.62 176.58Z",
                "M249.92 48.58 V80.58",
                "M471.62 176.58 V208.58",
                "M527.05 144.58 V176.58",
                "M582.47 112.58 V144.58",
                "M637.90 80.58 V112.58",
                "M637.90 112.58L582.47 144.58",
                "M582.47 144.58L527.05 112.58",
                "M527.05 112.58L499.33 128.58",
                "M527.05 176.58L471.62 208.58",
                "M471.62 208.58L249.92 80.58",
                "M416.20 80.58L499.33 128.58",
              ].join(""),
            },
            pressed: {
              d: [
                // D
                "M305.34 224.58 L360.77 256.58 V272.58 L194.49 368.58 L-27.21 240.58 V224.58 L139.06 128.58 L305.34 224.58",
                "M-27.21 224.58 L194.49 352.58 L360.77 256.58",
                "M319.20 232.58 L360.77 208.58 V192.58 L249.91 128.58 L83.64 224.58 L194.49 288.58 L360.77 192.58",
                "M97.49 232.58 L194.49 176.58 L291.48 232.58",
                "M194.49 352.58 V368.58",
                "M194.49 160.58 V176.58",
                // N
                "M249.92 64.58L305.34 32.58L360.77 64.58L388.48 48.58L443.91 80.58L471.62 64.58L360.77 0.58L416.19 -31.42L637.90 96.58L582.47 128.58L527.05 96.58L499.33 112.58L443.91 80.58L416.19 96.58L527.05 160.58L471.62 192.58Z",
                "M249.92 64.58 V80.58",
                "M471.62 192.58 V208.58",
                "M527.05 160.58 V176.58",
                "M582.47 128.58 V144.58",
                "M637.90 96.58 V112.58",
                "M637.90 112.58L582.47 144.58",
                "M582.47 144.58L527.05 112.58",
                "M527.05 112.58L499.33 128.58",
                "M527.05 176.58L471.62 208.58",
                "M471.62 208.58L249.92 80.58",
                "M430.00 88.60L499.33 128.58",
              ].join(""),
            },
          }}
          transition={transition}
        />

        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
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

      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: [
                "M471.62 48.58L360.77 -15.42L360.77 16.58L471.62 80.58Z",
                "M637.90 80.58L582.47 112.58L582.47 144.58L637.90 112.58Z",
                "M582.47 112.58L527.05 80.58L527.05 112.58L582.47 144.58Z",
                "M527.05 80.58L499.33 96.58L499.33 128.58L527.05 112.58Z",
                "M499.33 96.58L443.91 64.58L443.91 96.58L499.33 128.58Z",
                "M443.91 64.58L416.19 80.58L416.19 112.58L443.91 96.58Z",
                "M527.05 144.58L471.62 176.58L471.62 208.58L527.05 176.58Z",
                "M471.62 176.58L249.92 48.58L249.92 80.58L471.62 208.58Z",
              ].join(""),
            },
            pressed: {
              d: [
                "M471.62 64.58L360.77 0.58L360.77 16.58L471.62 80.58Z",
                "M637.90 96.58L582.47 128.58L582.47 144.58L637.90 112.58Z",
                "M582.47 128.58L527.05 96.58L527.05 112.58L582.47 144.58Z",
                "M527.05 96.58L499.33 112.58L499.33 128.58L527.05 112.58Z",
                "M499.33 112.58L443.91 80.58L443.91 96.58L499.33 128.58Z",
                "M443.91 80.58L416.19 96.58L416.19 112.58L443.91 96.58Z",
                "M527.05 160.58L471.62 192.58L471.62 208.58L527.05 176.58Z",
                "M471.62 192.58L249.92 64.58L249.92 80.58L471.62 208.58Z",
              ].join(""),
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M194.49 336.58L-27.21 208.58V240.58L194.49 368.58L360.77 272.58V240.58L194.49 336.58Z",
            },
            pressed: {
              d: "M194.49 352.58L-27.21 224.58V240.58L194.49 368.58L360.77 272.58V256.58L194.49 352.58Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M194.49 144.58L83.64 208.58V240.58L194.49 176.58L305.34 240.58L360.76 208.58V176.58L305.34 208.58L194.49 144.58Z",
            },
            pressed: {
              d: "M194.49 160.58L83.64 224.58V240.58L194.49 176.58L305.34 240.58L360.76 208.58V192.58L305.34 224.58L194.49 160.58Z",
            },
          }}
          transition={transition}
        />
      </g>

      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
      <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />
    </motion.svg>
  )
}
