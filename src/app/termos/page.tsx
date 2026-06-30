import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlock } from "@/components/seo";
import { PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Termos de Uso - Utilia",
  description:
    "Consulte as condicoes de uso das ferramentas gratuitas oferecidas pelo Utilia.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <PageHeader
          title="Termos de Uso"
          description="Ao acessar ou utilizar o Utilia, voce concorda com as condicoes descritas nesta pagina."
        />
        <p className="text-sm text-slate-500">Ultima atualizacao: 30 de junho de 2026.</p>

        <ContentBlock title="Finalidade do servico">
          <p>
            O Utilia oferece ferramentas gratuitas para gerar QR Codes, calcular
            estimativas comerciais e converter arquivos. Os recursos sao
            fornecidos para apoio em tarefas cotidianas e podem ser alterados,
            suspensos ou removidos conforme a evolucao do projeto.
          </p>
        </ContentBlock>

        <ContentBlock title="Responsabilidade do usuario">
          <p>
            Voce e responsavel pelos dados, links, numeros e arquivos que utiliza,
            bem como por conferir o resultado antes de publica-lo, imprimi-lo ou
            toma-lo como base para uma decisao. Nao utilize o site para violar
            direitos, distribuir conteudo ilegal, tentar comprometer o servico ou
            prejudicar terceiros.
          </p>
          <p>
            Ao converter ou compartilhar um arquivo, certifique-se de possuir os
            direitos e as autorizacoes necessarias sobre o material.
          </p>
        </ContentBlock>

        <ContentBlock title="Resultados e limitacoes">
          <p>
            Os resultados dependem das informacoes fornecidas, do navegador e do
            dispositivo. A calculadora apresenta estimativas e nao substitui
            orientacao contabil, financeira, juridica ou profissional. Conversoes
            podem alterar qualidade, compatibilidade, transparencia ou tamanho do
            arquivo.
          </p>
          <p>
            Embora busquemos manter o site disponivel e correto, nao garantimos
            funcionamento ininterrupto, compatibilidade com todos os aparelhos ou
            ausencia total de erros. Sempre mantenha uma copia do arquivo original.
          </p>
        </ContentBlock>

        <ContentBlock title="Servicos e marcas de terceiros">
          <p>
            O site pode conter links, publicidade ou integracoes de terceiros,
            sujeitos aos termos e politicas desses fornecedores. WhatsApp e uma
            marca de sua respectiva proprietaria; o Utilia nao possui afiliacao ou
            patrocinio oficial da plataforma.
          </p>
        </ContentBlock>

        <ContentBlock title="Privacidade, alteracoes e contato">
          <p>
            O tratamento de informacoes esta descrito na Politica de Privacidade.
            Estes termos podem ser atualizados quando houver mudancas relevantes
            no projeto. A versao publicada nesta pagina sera a versao vigente.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link className="text-emerald-700 hover:text-emerald-800" href="/privacidade">
              Politica de Privacidade
            </Link>
            <Link className="text-emerald-700 hover:text-emerald-800" href="/contato">
              Pagina de contato
            </Link>
          </div>
        </ContentBlock>
      </main>
    </PageShell>
  );
}
