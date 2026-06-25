import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";
import { LinkQrTool } from "@/components/link-qr-tool";

export const metadata: Metadata = {
  title: "Gerador de QR Code para links gratis - Utilia",
  description:
    "Transforme qualquer link em QR Code para baixar e usar em materiais impressos, cardapios, redes sociais e divulgacoes.",
};

const faq = [
  {
    question: "Como transformar um link em QR Code?",
    answer: "Cole a URL, confira o preview e baixe o QR Code em PNG para usar onde quiser.",
  },
  {
    question: "O QR Code pode ser usado impresso?",
    answer: "Sim. O arquivo PNG pode ser colocado em materiais impressos e digitais.",
  },
  {
    question: "Posso usar QR Code para Instagram, cardapio ou site?",
    answer: "Sim. Qualquer link publico pode virar QR Code, incluindo redes sociais, cardapios e paginas de pagamento.",
  },
  {
    question: "O QR Code expira?",
    answer: "Nao pelo Utilia. Ele aponta diretamente para o link informado; se o destino sair do ar, o QR Code deixa de abrir aquele conteudo.",
  },
];

export default function LinkQrPage() {
  return (
    <PageShell>
      <MonetizedLayout>
        <PageHeader
          title="Gerador de QR Code para links"
          description="Transforme qualquer link em QR Code para usar em materiais impressos, redes sociais, cardapios, apresentacoes, campanhas e divulgacoes."
        />
        <AdBanner variant="banner-top" />
        <LinkQrTool />
        <AdBanner variant="banner-bottom" />
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
