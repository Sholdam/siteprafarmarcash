import type { Metadata } from "next";
import { AudioLines, FileText, ImageIcon } from "lucide-react";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { AudioConverter } from "@/components/audio-converter";
import { ContentBlock, faqJsonLd, JsonLd, StepList, webAppJsonLd } from "@/components/seo";
import { FaqSection, PageHeader, PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conversor de áudio online grátis - MP3, MP4, OGG e WAV | Utilia",
  description:
    "Converta áudio online entre MP3, WAV e OGG ou extraia o áudio de MP4. Grátis, sem cadastro e sem enviar arquivos ao servidor.",
};

const faq = [
  {
    question: "Quais formatos o conversor aceita?",
    answer:
      "Você pode enviar arquivos MP3, MP4, OGG, WAV e M4A. Os formatos disponíveis para download são MP3, WAV e OGG.",
  },
  {
    question: "É possível converter MP4 para MP3?",
    answer:
      "Sim. Ao enviar um MP4, o Utilia extrai a faixa de áudio e permite baixar o resultado em MP3, WAV ou OGG.",
  },
  {
    question: "Meu arquivo é enviado para algum servidor?",
    answer:
      "Não. A conversão acontece localmente no navegador usando WebAssembly. O arquivo permanece no seu dispositivo.",
  },
  {
    question: "Qual é o tamanho máximo do arquivo?",
    answer:
      "O limite atual é 200 MB. Arquivos grandes podem demorar mais, principalmente em celulares com pouca memória.",
  },
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. Basta abrir a página em um navegador moderno, escolher o arquivo e iniciar a conversão.",
  },
];

export default function ConverterPage() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={webAppJsonLd({
          name: "Conversor de áudio online",
          description:
            "Conversor gratuito de MP3, MP4, OGG, WAV e M4A executado diretamente no navegador.",
          url: "https://utilia.up.railway.app/converter",
        })}
      />
      <MonetizedLayout>
        <PageHeader
          title="Conversor de áudio online"
          description="Converta arquivos de áudio ou extraia o som de um MP4. O processamento acontece no seu navegador, sem cadastro e sem upload para o servidor."
        />

        <div
          className="mb-6 grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
          role="tablist"
          aria-label="Tipos de conversor"
        >
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white"
          >
            <AudioLines className="size-4" aria-hidden="true" />
            Áudio
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            disabled
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-400"
            title="Em breve"
          >
            <ImageIcon className="size-4" aria-hidden="true" />
            Imagem
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            disabled
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-400"
            title="Em breve"
          >
            <FileText className="size-4" aria-hidden="true" />
            Documento
          </button>
        </div>

        <AudioConverter />
        <AdBanner variant="banner-middle" />

        <ContentBlock title="Como converter um arquivo de áudio">
          <StepList
            items={[
              "Escolha ou arraste um arquivo MP3, MP4, OGG, WAV ou M4A.",
              "Selecione MP3, WAV ou OGG como formato de saída.",
              "Clique em converter e aguarde o processamento no navegador.",
              "Ouça o resultado e baixe o novo arquivo.",
            ]}
          />
        </ContentBlock>

        <ContentBlock title="Conversão privada no navegador">
          <p>
            O conversor de áudio do Utilia usa tecnologia WebAssembly para executar o processamento diretamente no seu dispositivo. Isso significa que o arquivo não precisa ser enviado e armazenado em um servidor externo.
          </p>
          <p>
            Arquivos MP4 também são aceitos: o conversor remove a parte de vídeo e gera somente o áudio no formato escolhido. O tempo de processamento depende do tamanho do arquivo e da velocidade do aparelho.
          </p>
        </ContentBlock>

        <FaqSection items={faq} />
        <AdBanner variant="banner-bottom" />
      </MonetizedLayout>
    </PageShell>
  );
}
