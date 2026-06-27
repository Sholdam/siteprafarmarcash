import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BadgeCheck,
  Calculator,
  Check,
  FileOutput,
  Link2,
  MessageCircleMore,
  MousePointerClick,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { AdBanner, MonetizedLayout } from "@/components/ads";
import { JsonLd, webAppJsonLd } from "@/components/seo";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Utilia — Ferramentas online rápidas e grátis",
  description:
    "Use ferramentas online simples para criar QR Code de WhatsApp, converter áudio e calcular margem de venda.",
};

const activeTools = [
  {
    title: "QR Code para WhatsApp",
    description:
      "Crie um QR Code com número e mensagem pronta para clientes entrarem em contato com um clique.",
    href: "/qr-code-whatsapp",
    cta: "Criar QR Code",
    icon: MessageCircleMore,
    tone: "emerald",
  },
  {
    title: "QR Code para links",
    description:
      "Transforme qualquer link em um QR Code para cardápios, panfletos, redes sociais e materiais impressos.",
    href: "/qr-code-link",
    cta: "Gerar QR Code",
    icon: QrCode,
    tone: "sky",
  },
  {
    title: "Calculadora de margem",
    description:
      "Calcule preço de venda, custos, lucro e margem estimada para produtos e serviços.",
    href: "/calculadora-margem",
    cta: "Calcular margem",
    icon: Calculator,
    tone: "amber",
  },
  {
    title: "Conversor de áudio",
    description:
      "Converta MP3, WAV e OGG ou extraia o áudio de um arquivo MP4 diretamente no navegador.",
    href: "/converter",
    cta: "Converter áudio",
    icon: AudioLines,
    tone: "cyan",
  },
];

const benefits = [
  {
    title: "Sem cadastro",
    description: "Use as ferramentas rapidamente, sem criar conta.",
    icon: ShieldCheck,
  },
  {
    title: "Feito para tarefas reais",
    description: "QR Codes, links e cálculos comerciais para o dia a dia.",
    icon: BadgeCheck,
  },
  {
    title: "Pronto para celular",
    description: "Interface leve, rápida e responsiva em qualquer tela.",
    icon: Smartphone,
  },
];

const steps = [
  {
    title: "Escolha a ferramenta",
    description: "Encontre o recurso certo para o que precisa resolver.",
    icon: MousePointerClick,
  },
  {
    title: "Preencha as informações",
    description: "Informe apenas os dados necessários para gerar o resultado.",
    icon: FileOutput,
  },
  {
    title: "Baixe, copie ou compartilhe",
    description: "Use o resultado na hora, no celular ou no computador.",
    icon: Check,
  },
];

export default function Home() {
  return (
    <PageShell>
      <JsonLd
        data={webAppJsonLd({
          name: "Utilia",
          description:
            "Ferramentas online grátis para criar QR Code de WhatsApp, converter áudio e calcular margem de venda.",
          url: "https://utilia.up.railway.app/",
        })}
      />
      <MonetizedLayout>
        <section className="relative overflow-hidden rounded-lg border border-emerald-100 bg-[#effaf5] px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-800 shadow-sm sm:text-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              Ferramentas rápidas • grátis • sem cadastro
            </div>
            <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Ferramentas online simples para resolver tarefas rápidas
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Crie QR Codes, converta arquivos de áudio e calcule margens em poucos segundos.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/qr-code-whatsapp"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Usar ferramentas grátis
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="#ferramentas"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Ver ferramentas
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-slate-600">
              {[
                [ShieldCheck, "Sem cadastro"],
                [Zap, "Rápido"],
                [BadgeCheck, "Grátis"],
                [Smartphone, "Funciona no celular"],
              ].map(([Icon, label]) => (
                <span key={label as string} className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-emerald-600" aria-hidden="true" />
                  {label as string}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4" aria-hidden="true">
            {[
              [MessageCircleMore, "WhatsApp", "bg-emerald-600"],
              [Link2, "QR Link", "bg-sky-600"],
              [Calculator, "Margem", "bg-amber-500"],
              [AudioLines, "Áudio", "bg-cyan-600"],
            ].map(([Icon, label, color]) => (
              <div key={label as string} className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-white bg-white/90 px-2 py-3 text-xs font-bold text-slate-700 shadow-sm sm:px-4 sm:text-sm">
                <span className={`grid size-8 shrink-0 place-items-center rounded-md text-white ${color as string}`}>
                  <Icon className="size-4" />
                </span>
                <span className="truncate">{label as string}</span>
              </div>
            ))}
          </div>
        </section>

        <AdBanner variant="banner-top" />

        <section id="ferramentas" className="scroll-mt-24 py-10 sm:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-emerald-700">Ferramentas</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
              Escolha uma ferramenta
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
              Comece por uma das ferramentas mais usadas do Utilia.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {activeTools.map((tool) => {
              const Icon = tool.icon;
              const iconTone = {
                emerald: "bg-emerald-50 text-emerald-700",
                sky: "bg-sky-50 text-sky-700",
                amber: "bg-amber-50 text-amber-700",
                cyan: "bg-cyan-50 text-cyan-700",
              }[tool.tone];

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex min-h-64 flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                >
                  <span>
                    <span className={`grid size-12 place-items-center rounded-lg ${iconTone}`}>
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-slate-950">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                    {tool.cta}
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}

          </div>
        </section>

        <AdBanner variant="banner-middle" />

        <section className="border-y border-slate-200 py-12 sm:py-16">
          <div className="text-center">
            <p className="text-sm font-bold text-emerald-700">Feito para facilitar</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Por que usar o Utilia?</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="size-6 text-emerald-600" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-slate-950">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-sky-700">Simples do início ao fim</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Como funciona</h2>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative border-l-2 border-emerald-200 pl-5">
                  <span className="text-xs font-black text-emerald-700">0{index + 1}</span>
                  <Icon className="mt-4 size-6 text-slate-800" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="rounded-lg border border-sky-100 bg-sky-50 px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
              Ferramentas online para o dia a dia
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              O Utilia reúne ferramentas simples para quem precisa resolver tarefas rápidas sem instalar programas. Você pode gerar QR Code para WhatsApp, transformar links em QR Code, converter áudio e calcular margem de venda diretamente pelo navegador.
            </p>
          </div>
        </section>

        <AdBanner variant="banner-bottom" />
      </MonetizedLayout>
    </PageShell>
  );
}
