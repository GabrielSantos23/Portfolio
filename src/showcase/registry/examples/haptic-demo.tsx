"use client"

import { QRCode } from "react-qr-code"

import { Button } from "@/showcase/components/ui/button"
import { haptic } from "@/showcase/registry/lib/haptic"

const HAPTIC_DEMO_URL =
  process.env.NEXT_PUBLIC_HAPTIC_DEMO_URL || "https://gabriel-santos.vercel.app"

export default function HapticDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 pointer-coarse:py-0">
      <Button onClick={() => haptic()}>Haptic</Button>

      <ScanToTryOnMobile />
    </div>
  )
}

function ScanToTryOnMobile() {
  return (
    <div className="flex flex-col items-center gap-6 pointer-coarse:hidden">
      <p className="text-center text-sm text-muted-foreground">
        Escaneie o QR code abaixo para
        <br />
        testar no celular.
      </p>

      <div className="rounded-lg border bg-white p-2 dark:border-transparent">
        <QRCode size={96} value={HAPTIC_DEMO_URL} />
      </div>
    </div>
  )
}
