import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlock } from "@/components/seo";
import { PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre o Utilia",
  description:
    "Conheca o Utilia, um conjunto de ferramentas online gratuitas para tarefas rapidas do dia a dia.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <PageHeader
          title="Sobre o Utilia"
          description="O Utilia reune ferramentas online gratuitas, diretas e faceis de usar para resolver pequenas tarefas sem cadastro e sem instalar programas."
        />

        <ContentBlock title="O que e o Utilia">
          <p>
            O projeto nasceu para concentrar recursos praticos em um unico
            lugar. Hoje, voce pode criar QR Codes para WhatsApp e links, calcular
            margem e preco de venda e converter arquivos de audio e imagem.
          </p>
          <p>
            Cada ferramenta e desenvolvida para funcionar bem tanto no celular
            quanto no computador. As instrucoes e explicacoes publicadas nas
            paginas fazem parte do produto: queremos que o resultado seja util e
            que o usuario entenda como utiliza-lo.
          </p>
        </ContentBlock>

        <ContentBlock title="Nossa forma de trabalhar">
          <p>
            Priorizamos ferramentas simples, desempenho leve e processamento no
            proprio navegador sempre que isso e possivel. Os conversores de
            audio e imagem, por exemplo, trabalham localmente no dispositivo e
            nao enviam o arquivo escolhido para o servidor do Utilia.
          </p>
          <p>
            O site esta em evolucao continua. Novos recursos podem ser
            adicionados conforme sua utilidade, seguranca e capacidade de
            funcionar de maneira clara e confiavel.
          </p>
        </ContentBlock>

        <ContentBlock title="Transparencia">
          <p>
            O Utilia e um produto do ecossistema Pangeia/Famulus. Consulte nossa
            politica para entender como dados tecnicos, cookies e servicos de
            terceiros podem ser utilizados.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link className="text-emerald-700 hover:text-emerald-800" href="/privacidade">
              Politica de Privacidade
            </Link>
            <Link className="text-emerald-700 hover:text-emerald-800" href="/contato">
              Fale com o Utilia
            </Link>
          </div>
        </ContentBlock>
      </main>
    </PageShell>
  );
}
