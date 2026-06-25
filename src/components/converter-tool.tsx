"use client";

import { useState } from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { downloadBlob } from "@/lib/download";
import { inputClass, InputField } from "@/components/ui";

const maxImageSize = 8 * 1024 * 1024;

function pdfBlob(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return new Blob([buffer], { type: "application/pdf" });
}

function linesFromText(text: string) {
  return text.split(/\r?\n/).flatMap((line) => {
    if (!line.trim()) return [""];
    const chunks = line.match(/.{1,92}(\s|$)|.{1,92}/g);
    return chunks?.map((chunk) => chunk.trimEnd()) ?? [line];
  });
}

export function ConverterTool() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  async function textToPdf() {
    if (!text.trim()) {
      setMessage("Cole um texto antes de gerar o PDF.");
      return;
    }

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    let page = pdf.addPage([595, 842]);
    let y = 792;

    if (title.trim()) {
      page.drawText(title.trim(), { x: 48, y, size: 18, font: bold, color: rgb(0.06, 0.1, 0.18) });
      y -= 34;
    }

    for (const line of linesFromText(text)) {
      if (y < 58) {
        page = pdf.addPage([595, 842]);
        y = 792;
      }
      page.drawText(line || " ", { x: 48, y, size: 11, font, color: rgb(0.1, 0.13, 0.2) });
      y -= 17;
    }

    const bytes = await pdf.save();
    downloadBlob(pdfBlob(bytes), "texto-utilia.pdf");
    setMessage("PDF gerado no navegador. Nenhum arquivo foi armazenado.");
  }

  async function textToDocx() {
    if (!text.trim()) {
      setMessage("Cole um texto antes de gerar o DOCX.");
      return;
    }

    const children = [
      ...(title.trim()
        ? [
            new Paragraph({
              text: title.trim(),
              heading: HeadingLevel.HEADING_1,
            }),
          ]
        : []),
      ...text.split(/\r?\n/).map(
        (line) =>
          new Paragraph({
            children: [new TextRun(line || " ")],
          }),
      ),
    ];

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    downloadBlob(blob, "texto-utilia.docx");
    setMessage("DOCX gerado no navegador. Nenhum arquivo foi armazenado.");
  }

  async function imagesToPdf(files: FileList | null) {
    if (!files?.length) return;
    const images = Array.from(files);
    const invalid = images.find((file) => !["image/png", "image/jpeg"].includes(file.type) || file.size > maxImageSize);
    if (invalid) {
      setMessage("Use apenas imagens PNG/JPG de ate 8 MB cada.");
      return;
    }

    const pdf = await PDFDocument.create();
    for (const file of images) {
      const bytes = await file.arrayBuffer();
      const image = file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
      const page = pdf.addPage([595, 842]);
      const maxWidth = 515;
      const maxHeight = 762;
      const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
      const width = image.width * scale;
      const height = image.height * scale;
      page.drawImage(image, {
        x: (595 - width) / 2,
        y: (842 - height) / 2,
        width,
        height,
      });
    }

    const bytes = await pdf.save();
    downloadBlob(pdfBlob(bytes), "imagens-utilia.pdf");
    setMessage("PDF com imagens gerado no navegador. Nenhum arquivo foi armazenado.");
  }

  return (
    <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
        Os arquivos sao processados apenas para gerar o resultado e nao sao armazenados.
      </p>

      <div className="grid gap-4">
        <InputField label="Titulo opcional">
          <input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} />
        </InputField>
        <InputField label="Texto">
          <textarea
            className={`${inputClass} min-h-52 resize-y`}
            placeholder="Cole aqui o texto que deseja converter."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </InputField>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={textToPdf} className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Baixar PDF
          </button>
          <button type="button" onClick={textToDocx} className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
            Baixar DOCX
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <InputField label="Imagens para PDF">
          <input
            className={inputClass}
            type="file"
            accept="image/png,image/jpeg"
            multiple
            onChange={(event) => imagesToPdf(event.target.files)}
          />
        </InputField>
        <p className="mt-2 text-xs text-slate-500">Uma imagem por pagina. Limite: 8 MB por imagem.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="font-bold text-slate-950">PDF para texto</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Em breve. A extracao leve e confiavel de PDF para texto sera adicionada sem OCR e sem prometer conversao perfeita.
        </p>
      </div>

      {message ? <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">{message}</p> : null}
    </section>
  );
}
