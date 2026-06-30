import type { Metadata } from "next";
import { ExternalLink, MessageSquareText } from "lucide-react";
import { ContentBlock } from "@/components/seo";
import { PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contato - Utilia",
  description:
    "Entre em contato com o Utilia para relatar problemas, enviar sugestoes ou esclarecer duvidas sobre o site.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <PageHeader
          title="Contato"
          description="Encontrou um problema, tem uma sugestao de ferramenta ou precisa falar sobre o funcionamento do site? Use o canal publico do projeto."
        />

        <ContentBlock title="Como falar com o Utilia">
          <p>
            O atendimento do projeto e feito pelo repositorio oficial no GitHub.
            Abra uma solicitacao e descreva a pagina utilizada, o que voce tentou
            fazer e o resultado encontrado. Nao publique telefone, documentos,
            senhas, arquivos pessoais ou outros dados confidenciais.
          </p>
          <a
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            href="https://github.com/Sholdam/siteprafarmarcash/issues/new"
            target="_blank"
            rel="noreferrer"
          >
            <MessageSquareText className="size-4" aria-hidden="true" />
            Abrir uma solicitacao
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </ContentBlock>

        <ContentBlock title="O que informar">
          <ul className="list-disc space-y-2 pl-5">
            <li>Qual ferramenta ou pagina voce estava usando.</li>
            <li>O formato e o tamanho do arquivo, quando aplicavel.</li>
            <li>O navegador e o tipo de dispositivo utilizado.</li>
            <li>Uma descricao objetiva do erro ou da sugestao.</li>
          </ul>
          <p>
            Informacoes completas ajudam a reproduzir o problema e avaliar uma
            correcao, mas o envio nao cria obrigacao de prazo ou atendimento
            individual.
          </p>
        </ContentBlock>
      </main>
    </PageShell>
  );
}
