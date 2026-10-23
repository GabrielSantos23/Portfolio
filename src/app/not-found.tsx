import Link from "next/link";
import { PageIntro, SiteShell, inlineLink } from "@/components/sites/pablofr/shell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex flex-col gap-6">
        <PageIntro title="Página não encontrada" subtitle="Erro 404">
          O endereço que você abriu não existe ou foi movido.
        </PageIntro>
        <p className="text-base/[26px] text-tone-1100">
          <Link className={inlineLink} href="/">
            Voltar para o início
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
