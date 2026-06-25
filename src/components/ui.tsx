"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-600 text-lg font-black text-white">
            U
          </span>
          <span className="text-xl font-bold text-slate-950">Utilia</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <Link className="hover:text-emerald-700" href="/qr-code-whatsapp">
            WhatsApp
          </Link>
          <Link className="hover:text-emerald-700" href="/qr-code-link">
            QR Link
          </Link>
          <Link className="hover:text-emerald-700" href="/calculadora-margem">
            Margem
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <strong className="text-slate-900">Utilia</strong>
        <span>Utilia - um produto do ecossistema Pangeia/Famulus.</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mb-6">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
        Ferramenta Utilia
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
        {description}
      </p>
    </section>
  );
}

export function ToolCard({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-52 flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
    >
      <span>
        <span className="mb-4 grid size-11 place-items-center rounded-lg bg-emerald-50 text-lg font-bold text-emerald-700">
          {title.charAt(0)}
        </span>
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </span>
      <span className="mt-6 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
        {cta}
      </span>
    </Link>
  );
}

export function FaqSection({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">Perguntas frequentes</h2>
      <div className="mt-5 divide-y divide-slate-200">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="cursor-pointer list-none font-semibold text-slate-900">
              {item.question}
            </summary>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(value)}
      className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
    >
      {label}
    </button>
  );
}

export function DownloadButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

export function InputField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-800">
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";
