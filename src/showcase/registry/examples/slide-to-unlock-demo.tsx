"use client"

import { toast } from "sonner"

import { clickSoftSound } from "@/showcase/lib/soundcn/click-soft"
import { useSound } from "@/showcase/registry/hooks/sound/use-sound"
import { ShimmeringText } from "@/showcase/registry/transformed/components/shimmering-text"
import {
  SlideToUnlock,
  SlideToUnlockHandle,
  SlideToUnlockText,
  SlideToUnlockTrack,
} from "@/showcase/registry/transformed/components/slide-to-unlock"

export default function SlideToUnlockDemo() {
  // O CDN do outro site bloqueia CORS fora do domínio dele; usa o clique embutido.
  const [play] = useSound(clickSoftSound.dataUri, {
    volume: 0.5,
  })

  return (
    <SlideToUnlock
      onUnlock={() => {
        play()
        toast.success("Unlocked")
      }}
    >
      <SlideToUnlockTrack>
        <SlideToUnlockText>
          {({ isDragging }) => (
            <ShimmeringText text="slide to unlock" isStopped={isDragging} />
          )}
        </SlideToUnlockText>
        <SlideToUnlockHandle />
      </SlideToUnlockTrack>
    </SlideToUnlock>
  )
}
