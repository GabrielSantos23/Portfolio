import Markdown from "react-markdown"

import {
  TimescaleAge,
  TimescaleContent,
  TimescaleHeader,
  TimescaleIntroScroll,
  TimescaleItem,
  TimescaleRail,
  TimescaleRoot,
  TimescaleTick,
  TimescaleTrack,
  TimescaleViewport,
  TimescaleYear,
} from "@/showcase/registry/components/timescale"

export default function TimescaleDemo() {
  return (
    <TimescaleIntroScroll>
      <TimescaleRoot className="mt-4">
        <TimescaleHeader>
          <TimescaleAge>Age</TimescaleAge>
          <TimescaleYear>Years</TimescaleYear>
        </TimescaleHeader>

        <TimescaleViewport>
          <TimescaleTrack>
            <TimescaleRail />

            {MILESTONES.map((milestone) => (
              <TimescaleItem key={milestone.year}>
                <TimescaleTick />

                <TimescaleAge>{milestone.year - BIRTH_YEAR}</TimescaleAge>
                <TimescaleYear>{milestone.year}</TimescaleYear>

                {milestone.content && (
                  <TimescaleContent className="typeset typeset-timescale">
                    <Markdown>{milestone.content}</Markdown>
                  </TimescaleContent>
                )}
              </TimescaleItem>
            ))}
          </TimescaleTrack>
        </TimescaleViewport>
      </TimescaleRoot>
    </TimescaleIntroScroll>
  )
}

const BIRTH_YEAR = 2002

type Milestone = {
  year: number
  content?: string
}

const MILESTONES: Milestone[] = [
  { year: 2002 },
  { year: 2003 },
  { year: 2004 },
  { year: 2005 },
  { year: 2006 },
  { year: 2007 },
  { year: 2008 },
  { year: 2009 },
  { year: 2010 },
  { year: 2011 },
  { year: 2012 },
  { year: 2013 },
  { year: 2014 },
  { year: 2015 },
  { year: 2016 },
  { year: 2017 },
  { year: 2018 },
  {
    year: 2019,
    content:
      "Primeiro emprego como Assistente Administrativo em uma empresa local.",
  },
  {
    year: 2022,
    content: "Começou projetos pessoais de sistemas e áudio.",
  },
  {
    year: 2023,
    content:
      "Projetos de análise de dados. Começou como Assistente Administrativo em um escritório local.",
  },
  {
    year: 2024,
    content:
      "Começou o projeto pessoal de portfólio full-stack e projetos web & data engineering.",
  },
  {
    year: 2025,
    content:
      "Ingressou no tecnólogo em Análise e Desenvolvimento de Sistemas na Faculdade Católica de Santos.",
  },
  {
    year: 2026,
    content:
      "Trabalhos freelance — sites, APIs e análise de dados. Projeto CS Player Eras Database.",
  },
]
