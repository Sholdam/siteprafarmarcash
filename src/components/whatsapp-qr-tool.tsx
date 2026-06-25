"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { CopyButton, inputClass, InputField } from "@/components/ui";
import { QrPreview } from "@/components/qr-preview";
import { onlyDigits } from "@/lib/format";

export function WhatsAppQrTool() {
  const [ddi, setDdi] = useState("55");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    const cleanDdi = onlyDigits(ddi || "55");
    let cleanPhone = onlyDigits(phone);
    if (cleanPhone.startsWith(cleanDdi)) {
      cleanPhone = cleanPhone.slice(cleanDdi.length);
    }

    if (!cleanPhone) {
      setError("Informe um telefone para gerar o link do WhatsApp.");
      setResult("");
      setQr("");
      return;
    }

    const base = `https://wa.me/${cleanDdi}${cleanPhone}`;
    const link = message.trim()
      ? `${base}?text=${encodeURIComponent(message.trim())}`
      : base;
    setResult(link);
    setQr(await QRCode.toDataURL(link, { margin: 2, width: 640 }));
    setError("");
  }

  function clear() {
    setDdi("55");
    setPhone("");
    setMessage("");
    setResult("");
    setQr("");
    setError("");
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <InputField label="DDI">
            <input className={inputClass} value={ddi} onChange={(event) => setDdi(event.target.value)} />
          </InputField>
          <InputField label="Telefone">
            <input
              className={inputClass}
              inputMode="tel"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </InputField>
        </div>
        <InputField label="Mensagem opcional">
          <textarea
            className={`${inputClass} min-h-28 resize-y`}
            placeholder="Ola! Vim pelo QR Code."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </InputField>
        {error ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={generate}
            className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Gerar QR Code
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Limpar
          </button>
        </div>
      </div>

      {result ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Link gerado</p>
            <p className="mt-2 break-all text-sm text-slate-700">{result}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <CopyButton value={result} label="Copiar link" />
              <a
                href={result}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Abrir no WhatsApp
              </a>
            </div>
          </div>
          {qr ? <QrPreview dataUrl={qr} filename="qr-code-whatsapp-utilia.png" /> : null}
        </div>
      ) : null}
    </section>
  );
}
