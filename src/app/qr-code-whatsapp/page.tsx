import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { ContentBlock, faqJsonLd, JsonLd, StepList, webAppJsonLd } from "@/components/seo";
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
  {
    question: "O numero precisa ter DDD?",
    answer: "Sim. Informe o DDD junto com o telefone. O DDI do Brasil ja vem preenchido como 55, mas pode ser alterado.",
  },
  {
    question: "Posso usar em cartao de visita?",
    answer: "Sim. Baixe o PNG e coloque no cartao de visita, embalagem, vitrine, panfleto ou etiqueta.",
  },
];

export default function WhatsAppQrPage() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={webAppJsonLd({
          name: "Gerador de QR Code para WhatsApp",
          description:
            "Ferramenta gratis para gerar link e QR Code de WhatsApp com mensagem personalizada.",
          url: "https://utilia.up.railway.app/qr-code-whatsapp",
        })}
      />
      <MonetizedLayout>
        <PageHeader
          title="Gerador de QR Code para WhatsApp"
          description="Crie um QR Code de WhatsApp com mensagem personalizada para colocar em cartoes, panfletos, redes sociais, cardapios e materiais de divulgacao."
        />
        <AdBanner variant="banner-top" />
        <WhatsAppQrTool />
        <AdBanner variant="banner-bottom" />
        <ContentBlock title="Como criar um QR Code de WhatsApp">
          <StepList
            items={[
              "Digite o DDI e o numero de telefone com DDD.",
              "Escreva uma mensagem inicial, se quiser facilitar o primeiro contato.",
              "Clique em gerar para criar o link do WhatsApp e o QR Code.",
              "Copie o link ou baixe o QR Code em PNG para usar em materiais digitais ou impressos.",
            ]}
          />
        </ContentBlock>
        <ContentBlock title="Onde usar o QR Code para WhatsApp">
          <p>
            O QR Code de WhatsApp e util para cardapios, panfletos, cartoes de
            visita, embalagens, etiquetas, vitrines, posts de redes sociais e
            materiais de divulgacao. Ao escanear, a pessoa abre uma conversa
            direto com o numero informado.
          </p>
          <p>
            Para negocios locais, ele reduz o atrito no atendimento: o cliente
            nao precisa salvar o contato nem digitar o telefone. Se voce incluir
            uma mensagem automatica, tambem ajuda a identificar de onde veio o
            contato.
          </p>
        </ContentBlock>
        <ContentBlock title="Boas praticas antes de divulgar">
          <p>
            Confira o DDI, o DDD e o numero completo antes de baixar o arquivo.
            Abra o QR Code em outro celular e envie uma mensagem de teste para
            garantir que a conversa correta sera iniciada.
          </p>
          <p>
            Em materiais impressos, mantenha uma area branca ao redor do codigo
            e evite deixa-lo muito pequeno. Uma mensagem inicial curta, como
            &quot;Quero saber mais sobre o produto&quot;, facilita o atendimento sem
            limitar o que o cliente pode perguntar.
          </p>
        </ContentBlock>
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
