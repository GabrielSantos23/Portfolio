import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/showcase/components/kibo-ui/marquee"
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/showcase/registry/transformed/components/testimonial"

export default function TestimonialsMarqueeDemo() {
  return (
    <div className="w-full bg-background">
      <Marquee
        data-slot="marquee"
        className="border-y border-line [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
      >
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent>
          {TESTIMONIALS.map((item) => (
            <MarqueeItem
              key={item.authorName}
              className="mx-0 h-full w-xs border-r border-line"
            >
              <a
                className="block h-full transition-[background-color] ease-out hover:bg-accent/20"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Testimonial>
                  <TestimonialQuote className="font-serif">
                    <p>{item.quote}</p>
                  </TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarImg src={item.authorAvatar} />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorName>
                      {item.authorName}
                    </TestimonialAuthorName>

                    <TestimonialAuthorTagline>
                      {item.authorTagline}
                    </TestimonialAuthorTagline>
                  </TestimonialAuthor>
                </Testimonial>
              </a>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  )
}

const TESTIMONIALS = [
    {
      authorAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%2327272a'/%3E%3Ccircle cx='12' cy='9' r='4' fill='%23a1a1aa'/%3E%3Cpath d='M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8' fill='%23a1a1aa'/%3E%3C/svg%3E",
      authorName: "Cliente Satisfeito",
      authorTagline: "Cliente",
      url: "#",
      quote: "Trabalho incrível! Atendimento excelente e entrega superou o que eu esperava.",
    },
    {
      authorAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%2327272a'/%3E%3Ccircle cx='12' cy='9' r='4' fill='%23a1a1aa'/%3E%3Cpath d='M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8' fill='%23a1a1aa'/%3E%3C/svg%3E",
      authorName: "Maria Oliveira",
      authorTagline: "Empreendedora",
      url: "#",
      quote: "Profissional dedicado, entregou tudo no prazo e com uma qualidade impressionante.",
    },
    {
      authorAvatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%2327272a'/%3E%3Ccircle cx='12' cy='9' r='4' fill='%23a1a1aa'/%3E%3Cpath d='M4 22c0-4.4 3.6-8 8-8s8 3.6 8 8' fill='%23a1a1aa'/%3E%3C/svg%3E",
      authorName: "João Pereira",
      authorTagline: "Gerente de Projetos",
      url: "#",
      quote: "Recomendo demais — resolveu nosso problema com uma solução simples e elegante.",
    },
]
