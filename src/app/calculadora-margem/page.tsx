import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { MarginCalculator } from "@/components/margin-calculator";
import { ContentBlock, faqJsonLd, JsonLd, StepList, webAppJsonLd } from "@/components/seo";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Calculadora de margem e preco de venda - Utilia",
  description:
    "Calcule preco de venda, margem, lucro e custos de forma simples para pequenos negocios.",
};

const faq = [
  {
    question: "Como calcular preco de venda?",
    answer: "Informe o custo, a margem desejada e taxas como cartao, frete e imposto. A calculadora estima o preco necessario.",
  },
  {
    question: "O que e margem de lucro?",
    answer: "E a parcela do preco de venda que sobra como lucro depois dos custos considerados.",
  },
  {
    question: "Essa calculadora substitui um contador?",
    answer: "Nao. Ela e uma estimativa simples e nao substitui analise contabil ou financeira profissional.",
  },
  {
    question: "Posso considerar taxa de cartao?",
    answer: "Sim. Use o campo de taxa de cartao ou marketplace para incluir esse percentual no calculo.",
  },
  {
    question: "Posso usar para loja fisica e online?",
    answer: "Sim. Ela serve como apoio para pequenas vendas, servicos, lojas fisicas e vendas online.",
  },
  {
    question: "Qual a diferenca entre margem e markup?",
    answer: "Margem compara o lucro com o preco de venda. Markup costuma ser um multiplicador aplicado sobre o custo. Esta calculadora trabalha com margem estimada sobre o preco final.",
  },
  {
    question: "A taxa de marketplace muda o preco sugerido?",
    answer: "Sim. Quanto maior a taxa percentual, maior tende a ser o preco necessario para manter a margem desejada.",
  },
];

export default function MarginPage() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={webAppJsonLd({
          name: "Calculadora de margem e preco de venda",
          description:
            "Calculadora gratis para estimar preco de venda, lucro, custos e margem para pequenos negocios.",
          url: "https://utilia.up.railway.app/calculadora-margem",
        })}
      />
      <MonetizedLayout>
        <PageHeader
          title="Calculadora de margem e preco de venda"
          description="Calcule preco de venda, margem, lucro e custos de forma simples para pequenos negocios, lojas, servicos e vendas online."
        />
        <AdBanner variant="banner-top" />
        <MarginCalculator />
        <AdBanner variant="banner-bottom" />
        <ContentBlock title="Como calcular preco de venda com margem">
          <StepList
            items={[
              "Informe o custo do produto ou servico.",
              "Defina a margem desejada em porcentagem.",
              "Inclua taxas de cartao, marketplace, impostos, frete e outros custos.",
              "Confira o preco sugerido, o lucro bruto estimado e a margem real.",
            ]}
          />
        </ContentBlock>
        <ContentBlock title="Por que considerar taxas e custos extras">
          <p>
            Um erro comum em pequenos negocios e calcular o preco apenas em cima
            do custo de compra. Na pratica, taxa de cartao, comissao de
            marketplace, imposto, embalagem, frete subsidiado e outros custos
            reduzem o lucro real.
          </p>
          <p>
            A calculadora ajuda a visualizar esses efeitos antes da venda. Ela
            nao substitui uma analise financeira completa, mas serve como ponto
            de partida para evitar precos muito baixos ou margens apertadas.
          </p>
        </ContentBlock>
        <ContentBlock title="Exemplo simples">
          <p>
            Se um produto custa R$ 50,00 e voce deseja margem de 30%, uma taxa
            de cartao de 3% e mais R$ 5,00 de custo extra, o preco final precisa
            considerar todos esses fatores. Caso contrario, a margem real pode
            ficar bem menor do que a margem planejada.
          </p>
        </ContentBlock>
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
