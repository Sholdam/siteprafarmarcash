import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { ContentBlock, faqJsonLd, JsonLd, StepList, webAppJsonLd } from "@/components/seo";
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
  {
    question: "Preciso colocar https no link?",
    answer: "Nao necessariamente. Se voce colar um dominio sem https, o Utilia tenta normalizar o endereco antes de gerar o QR Code.",
  },
  {
    question: "Posso baixar o QR Code?",
    answer: "Sim. Depois de gerar o preview, voce pode baixar o QR Code em PNG.",
  },
];

export default function LinkQrPage() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={webAppJsonLd({
          name: "Gerador de QR Code para links",
          description:
            "Ferramenta gratis para transformar links em QR Code para impressos, cardapios e redes sociais.",
          url: "https://utilia.up.railway.app/qr-code-link",
        })}
      />
      <MonetizedLayout>
        <PageHeader
          title="Gerador de QR Code para links"
          description="Transforme qualquer link em QR Code para usar em materiais impressos, redes sociais, cardapios, apresentacoes, campanhas e divulgacoes."
        />
        <AdBanner variant="banner-top" />
        <LinkQrTool />
        <AdBanner variant="banner-bottom" />
        <ContentBlock title="Como transformar um link em QR Code">
          <StepList
            items={[
              "Cole o link que deseja divulgar.",
              "Adicione um rotulo opcional para organizar o resultado.",
              "Gere o QR Code e confira o preview.",
              "Copie o link original ou baixe o QR Code em PNG.",
            ]}
          />
        </ContentBlock>
        <ContentBlock title="Ideias de uso para QR Code de link">
          <p>
            Um QR Code de link pode apontar para Instagram, cardapio digital,
            catalogo, pagina de pagamento, formulario, mapa, portfolio, site da
            empresa ou material de campanha. Ele e especialmente util quando o
            usuario esta vendo um material impresso e precisa abrir o endereco
            no celular.
          </p>
          <p>
            Antes de imprimir, teste o QR Code em mais de um celular e confirme
            se o link abre corretamente. Se o destino for alterado ou removido,
            sera preciso gerar um novo QR Code para o novo endereco.
          </p>
        </ContentBlock>
        <FaqSection items={faq} />
      </MonetizedLayout>
    </PageShell>
  );
}
