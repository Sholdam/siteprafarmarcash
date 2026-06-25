import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";
import { WhatsAppQrTool } from "@/components/whatsapp-qr-tool";

export const metadata: Metadata = {
  title: "Gerador de QR Code para WhatsApp gratis - Utilia",
  description:
    "Crie um link e QR Code de WhatsApp com mensagem personalizada para clientes, cartoes, panfletos e redes sociais.",
};

const faq = [
  {
    question: "Como criar QR Code para WhatsApp?",
    answer: "Informe o DDI, o telefone e, se quiser, uma mensagem inicial. O Utilia gera o link wa.me e o QR Code para baixar.",
  },
  {
    question: "Posso colocar mensagem automatica?",
    answer: "Sim. A mensagem opcional entra no link do WhatsApp e aparece preenchida quando a pessoa abre a conversa.",
  },
  {
    question: "O QR Code funciona em material impresso?",
    answer: "Sim. Depois de baixar o PNG, voce pode usar em cartoes, panfletos, cardapios e outros materiais.",
  },
  {
    question: "Preciso pagar para usar?",
    answer: "Nao. Esta ferramenta nasceu para uso simples e gratuito.",
  },
];

export default function WhatsAppQrPage() {
  return (
    <PageShell>
      <MonetizedLayout>
        <PageHeader
          title="Gerador de QR Code para WhatsApp"
          description="Crie um QR Code de WhatsApp com mensagem personalizada para colocar em cartoes, panfletos, redes sociais, cardapios e materiais de divulgacao."
        />
        <AdBanner variant="banner-top" />
        <WhatsAppQrTool />
        <AdBanner variant="banner-bottom" />
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
