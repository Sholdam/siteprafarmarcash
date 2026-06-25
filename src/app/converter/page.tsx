import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { ConverterTool } from "@/components/converter-tool";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conversor simples de arquivos online - Utilia",
  description: "Converta texto em PDF, texto em Word e imagens em PDF de forma simples e rapida.",
};

const faq = [
  {
    question: "O conversor salva meus arquivos?",
    answer: "Nao. As conversoes implementadas no MVP acontecem no navegador e nao mantem arquivos armazenados.",
  },
  {
    question: "Posso converter texto em PDF?",
    answer: "Sim. Cole o texto, adicione um titulo opcional e baixe um PDF simples.",
  },
  {
    question: "Posso transformar imagens em PDF?",
    answer: "Sim. Envie imagens PNG ou JPG e o Utilia gera um PDF com uma imagem por pagina.",
  },
  {
    question: "O conversor faz PDF para Word?",
    answer: "Nao nesta versao. O MVP evita prometer conversoes complexas ou OCR.",
  },
  {
    question: "Existe limite de tamanho?",
    answer: "Sim. Imagens para PDF aceitam ate 8 MB por arquivo para manter a ferramenta leve.",
  },
];

export default function ConverterPage() {
  return (
    <PageShell>
      <MonetizedLayout>
        <PageHeader
          title="Conversor simples de arquivos"
          description="Converta texto em PDF, texto em Word e imagens em PDF de forma simples, rapida e sem complicacao."
        />
        <AdBanner variant="banner-top" />
        <ConverterTool />
        <AdBanner variant="banner-bottom" />
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
