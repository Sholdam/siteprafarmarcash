import { AdBanner, MonetizedLayout } from "@/components/ads";
import { ContentBlock, JsonLd, webAppJsonLd } from "@/components/seo";
import { PageShell, ToolCard } from "@/components/ui";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <PageShell>
      <JsonLd
        data={webAppJsonLd({
          name: "Utilia",
          description:
            "Ferramentas online gratis para criar QR Code de WhatsApp, QR Code de links e calcular margem de venda.",
          url: "https://utilia.up.railway.app/",
        })}
      />
      <MonetizedLayout>
        <section className="rounded-lg bg-gradient-to-br from-white via-emerald-50 to-sky-50 px-5 py-12 sm:px-10 sm:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Ferramentas online
            </p>
            <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Utilia
            </h1>
            <p className="mt-5 text-2xl font-semibold text-slate-800">
              Ferramentas rapidas, simples e uteis.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Crie QR Codes e use calculadoras praticas em poucos segundos.
            </p>
            <a
              href="#ferramentas"
              className="mt-8 inline-flex rounded-lg bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-700"
            >
              Comecar agora
            </a>
          </div>
        </section>

        <AdBanner variant="banner-top" />

        <section id="ferramentas" className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </section>

        <AdBanner variant="banner-middle" />

        <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Um site pequeno para tarefas rapidas</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            O Utilia reune ferramentas simples para resolver necessidades comuns sem login, sem banco de dados e sem complicacao. A primeira versao foca em QR Codes e calculos comerciais uteis para pequenos negocios.
          </p>
        </section>

        <ContentBlock title="Para quem o Utilia foi feito">
          <p>
            O Utilia foi pensado para pequenos negocios, profissionais autonomos,
            criadores de conteudo e qualquer pessoa que precise resolver uma
            tarefa simples sem instalar aplicativo. A ideia e abrir a ferramenta,
            preencher poucos campos e baixar ou copiar o resultado.
          </p>
          <p>
            As primeiras ferramentas ajudam em divulgacao, atendimento e venda:
            QR Code para WhatsApp, QR Code para links e calculadora de margem.
            Novas ferramentas devem seguir a mesma regra: serem leves, diretas e
            uteis no celular.
          </p>
        </ContentBlock>
      </MonetizedLayout>
    </PageShell>
  );
}
