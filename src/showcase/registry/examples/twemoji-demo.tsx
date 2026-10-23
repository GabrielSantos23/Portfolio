import { Twemoji } from "@/showcase/registry/transformed/components/twemoji"

export default function TwemojiDemo() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="text-lg">
        <Twemoji>👍 ❤️ 🤣 😲 😭 😡</Twemoji>
      </p>
      <p className="text-lg">
        <Twemoji>Olá do Brasil 🇧🇷</Twemoji>
      </p>
      <p className="text-base">
        <Twemoji>Built with 💛 and ☕️</Twemoji>
      </p>
    </div>
  )
}
