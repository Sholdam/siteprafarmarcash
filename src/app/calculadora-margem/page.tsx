import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { MarginCalculator } from "@/components/margin-calculator";
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
];

export default function MarginPage() {
  return (
    <PageShell>
      <MonetizedLayout>
        <PageHeader
          title="Calculadora de margem e preco de venda"
          description="Calcule preco de venda, margem, lucro e custos de forma simples para pequenos negocios, lojas, servicos e vendas online."
        />
        <AdBanner variant="banner-top" />
        <MarginCalculator />
        <AdBanner variant="banner-bottom" />
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
