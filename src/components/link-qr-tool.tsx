"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { CopyButton, inputClass, InputField } from "@/components/ui";
import { QrPreview } from "@/components/qr-preview";
import { isLikelyUrl, normalizeUrl } from "@/lib/format";

export function LinkQrTool() {
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [result, setResult] = useState("");
  const [qr, setQr] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    if (!isLikelyUrl(url)) {
      setError("Cole uma URL valida, como utilia.com.br ou https://exemplo.com.");
      setResult("");
      setQr("");
      return;
    }
    const cleanUrl = normalizeUrl(url);
    setResult(cleanUrl);
    setQr(await QRCode.toDataURL(cleanUrl, { margin: 2, width: 640 }));
    setError("");
  }

  function clear() {
    setUrl("");
    setLabel("");
    setResult("");
    setQr("");
    setError("");
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4">
        <InputField label="URL">
          <input
            className={inputClass}
            placeholder="https://seusite.com.br"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </InputField>
        <InputField label="Rotulo opcional">
          <input
            className={inputClass}
            placeholder="Instagram, Cardapio, Site, Pagamento"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
        </InputField>
        {error ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={generate} className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Gerar QR Code
          </button>
          <button type="button" onClick={clear} className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
            Limpar
          </button>
        </div>
      </div>
      {result ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{label.trim() || "Link gerado"}</p>
            <p className="mt-2 break-all text-sm text-slate-700">{result}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <CopyButton value={result} label="Copiar link" />
              <a href={result} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Abrir link
              </a>
            </div>
          </div>
          {qr ? <QrPreview dataUrl={qr} filename="qr-code-link-utilia.png" /> : null}
        </div>
      ) : null}
    </section>
  );
}
