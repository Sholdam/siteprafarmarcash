import type { Metadata } from "next";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { ConverterTabs } from "@/components/converter-tabs";
import { ContentBlock, faqJsonLd, JsonLd, StepList, webAppJsonLd } from "@/components/seo";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conversor de áudio e imagem online grátis | Utilia",
  description:
    "Converta áudio entre MP3, WAV e OGG, extraia áudio de MP4 ou transforme imagens JPG, PNG e WebP gratuitamente no navegador.",
};

const faq = [
  {
    question: "Quais formatos de áudio o conversor aceita?",
    answer:
      "Você pode enviar arquivos MP3, MP4, OGG, WAV e M4A. Os formatos disponíveis para download são MP3, WAV e OGG.",
  },
  {
    question: "Quais formatos de imagem podem ser convertidos?",
    answer:
      "A aba Imagem aceita JPG, JPEG, PNG e WebP e permite baixar o resultado em JPG, PNG ou WebP.",
  },
  {
    question: "É possível converter MP4 para MP3?",
    answer:
      "Sim. Ao enviar um MP4 na aba Áudio, o Utilia extrai a faixa sonora e permite baixar o resultado em MP3, WAV ou OGG.",
  },
  {
    question: "Posso transformar PNG em JPG ou WebP?",
    answer:
      "Sim. Escolha a imagem PNG, selecione JPG ou WebP e ajuste a qualidade antes de converter.",
  },
  {
    question: "Meus arquivos são enviados para algum servidor?",
    answer:
      "Não. Tanto o áudio quanto a imagem são processados localmente no navegador e permanecem no seu dispositivo.",
  },
  {
    question: "Qual é o tamanho máximo do arquivo?",
    answer:
      "O limite é de 200 MB para áudio e 30 MB ou 40 megapixels para imagem. Arquivos grandes podem demorar mais em celulares.",
  },
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. Basta abrir a página em um navegador moderno, escolher a aba e iniciar a conversão.",
  },
];

export default function ConverterPage() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={webAppJsonLd({
          name: "Conversor de áudio e imagem online",
          description:
            "Conversor gratuito de áudio MP3, MP4, OGG, WAV e M4A e de imagens JPG, PNG e WebP executado diretamente no navegador.",
          url: "https://utilia.up.railway.app/converter",
        })}
      />
      <MonetizedLayout>
        <PageHeader
          title="Conversor de áudio e imagem online"
          description="Converta arquivos de áudio, extraia o som de um MP4 ou transforme imagens entre JPG, PNG e WebP. Tudo acontece no seu navegador, sem cadastro e sem upload para o servidor."
        />

        <ConverterTabs />
        <AdBanner variant="banner-middle" />

        <ContentBlock title="Como converter um arquivo">
          <StepList
            items={[
              "Escolha a aba Áudio ou Imagem.",
              "Selecione ou arraste o arquivo que deseja transformar.",
              "Defina o formato de saída e, para imagens, ajuste a qualidade.",
              "Converta, confira o resultado e baixe o novo arquivo.",
            ]}
          />
        </ContentBlock>

        <ContentBlock title="Conversão privada no navegador">
          <p>
            Os conversores do Utilia executam o processamento diretamente no seu dispositivo. Seus arquivos não precisam ser enviados ou armazenados em um servidor externo.
          </p>
          <p>
            A aba Áudio usa WebAssembly para trabalhar com diferentes codecs. A aba Imagem utiliza os recursos nativos do navegador para preservar as dimensões e gerar JPG, PNG ou WebP com rapidez.
          </p>
        </ContentBlock>

        <FaqSection items={faq} />
        <AdBanner variant="banner-bottom" />
      </MonetizedLayout>
    </PageShell>
  );
}
