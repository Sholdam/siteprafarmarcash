"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileImage,
  ImageIcon,
  LoaderCircle,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";

type OutputFormat = "jpeg" | "png" | "webp";
type ConvertedImage = {
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
  mime: string;
};

const MAX_FILE_SIZE = 30 * 1024 * 1024;
const MAX_PIXELS = 40_000_000;
const acceptedExtensions = ["jpg", "jpeg", "png", "webp"];

const outputOptions: Array<{
  value: OutputFormat;
  label: string;
  description: string;
}> = [
  { value: "jpeg", label: "JPG", description: "Fotos e tamanho menor" },
  { value: "png", label: "PNG", description: "Transparência e nitidez" },
  { value: "webp", label: "WebP", description: "Leve para a web" },
];

const mimeTypes: Record<OutputFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

function getBaseName(filename: string) {
  const lastDot = filename.lastIndexOf(".");
  return (lastDot > 0 ? filename.slice(0, lastDot) : filename)
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim() || "imagem-convertida";
}

async function loadImage(file: File) {
  try {
    const bitmap = await createImageBitmap(file);
    return {
      source: bitmap as CanvasImageSource,
      width: bitmap.width,
      height: bitmap.height,
      release: () => bitmap.close(),
    };
  } catch {}

  const url = URL.createObjectURL(file);
  const image = document.createElement("img");
  image.src = url;
  await image.decode();
  return {
    source: image as CanvasImageSource,
    width: image.naturalWidth,
    height: image.naturalHeight,
    release: () => URL.revokeObjectURL(url),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("O navegador não gerou a imagem.")),
      type,
      quality,
    );
  });
}

export function ImageConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sourceUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("webp");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<ConvertedImage | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResult(null);
  }

  function clearSource() {
    if (sourceUrlRef.current) {
      URL.revokeObjectURL(sourceUrlRef.current);
      sourceUrlRef.current = null;
    }
    setSourceUrl("");
  }

  function selectFile(nextFile: File | undefined) {
    if (!nextFile) return;
    const extension = getExtension(nextFile.name);

    if (!acceptedExtensions.includes(extension)) {
      setError("Escolha uma imagem JPG, JPEG, PNG ou WebP.");
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setError("A imagem deve ter no máximo 30 MB.");
      return;
    }

    clearSource();
    clearResult();
    const nextUrl = URL.createObjectURL(nextFile);
    sourceUrlRef.current = nextUrl;
    setSourceUrl(nextUrl);
    setFile(nextFile);
    setError("");
  }

  async function convert() {
    if (!file) {
      setError("Escolha uma imagem antes de converter.");
      return;
    }

    clearResult();
    setError("");
    setIsConverting(true);
    let loadedImage: Awaited<ReturnType<typeof loadImage>> | null = null;

    try {
      loadedImage = await loadImage(file);
      const { width, height } = loadedImage;
      if (width * height > MAX_PIXELS) {
        throw new Error("A resolução máxima é de 40 megapixels.");
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Seu navegador não oferece suporte à conversão.");

      if (outputFormat === "jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
      }
      context.drawImage(loadedImage.source, 0, 0, width, height);

      const mime = mimeTypes[outputFormat];
      const blob = await canvasToBlob(canvas, mime, quality / 100);
      const url = URL.createObjectURL(blob);
      const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;

      resultUrlRef.current = url;
      setResult({
        url,
        name: `${getBaseName(file.name)}.${extension}`,
        size: blob.size,
        width,
        height,
        mime,
      });
    } catch (conversionError) {
      console.error(conversionError);
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Não foi possível converter esta imagem.",
      );
    } finally {
      loadedImage?.release();
      setIsConverting(false);
    }
  }

  function reset() {
    clearSource();
    clearResult();
    setFile(null);
    setError("");
    setIsConverting(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  const showQuality = outputFormat !== "png";

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-sky-50 text-sky-700">
            <ImageIcon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">Conversor de imagem</h2>
            <p className="mt-1 text-sm text-slate-600">JPG, PNG e WebP</p>
          </div>
        </div>
      </div>

      <div className="grid gap-7 p-5 sm:p-7">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-800">1. Escolha a imagem</p>
          <button
            type="button"
            disabled={isConverting}
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              selectFile(event.dataTransfer.files[0]);
            }}
            className={`flex min-h-44 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed px-5 py-8 text-center transition ${
              isDragging
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <span className="grid size-12 place-items-center rounded-lg bg-white text-emerald-700 shadow-sm">
              <Upload className="size-6" aria-hidden="true" />
            </span>
            <span className="mt-4 font-bold text-slate-900">Clique ou arraste sua imagem aqui</span>
            <span className="mt-2 text-sm text-slate-500">Até 30 MB</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          {file ? (
            <div className="mt-3 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[96px_1fr_auto] sm:items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                <NextImage src={sourceUrl} alt="Prévia da imagem selecionada" fill unoptimized className="object-cover" />
              </div>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <FileImage className="size-4 shrink-0 text-sky-700" aria-hidden="true" />
                  <span className="truncate">{file.name}</span>
                </span>
                <span className="mt-1 block text-xs text-slate-500">{formatBytes(file.size)}</span>
              </span>
              {!isConverting ? (
                <button
                  type="button"
                  onClick={reset}
                  className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Remover imagem"
                  title="Remover imagem"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <fieldset disabled={isConverting}>
          <legend className="mb-3 text-sm font-bold text-slate-800">2. Formato de saída</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {outputOptions.map((option) => (
              <label
                key={option.value}
                className={`cursor-pointer rounded-lg border p-4 transition ${
                  outputFormat === option.value
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="image-output-format"
                  value={option.value}
                  checked={outputFormat === option.value}
                  onChange={() => { setOutputFormat(option.value); clearResult(); }}
                  className="sr-only"
                />
                <span className="block font-black text-slate-950">{option.label}</span>
                <span className="mt-1 block text-xs text-slate-500">{option.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {showQuality ? (
          <label className="grid gap-3 text-sm font-bold text-slate-800">
            <span className="flex items-center justify-between gap-4">
              3. Qualidade
              <span className="text-emerald-700">{quality}%</span>
            </span>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={quality}
              disabled={isConverting}
              onChange={(event) => { setQuality(Number(event.target.value)); clearResult(); }}
              className="w-full accent-emerald-600"
            />
          </label>
        ) : null}

        <button
          type="button"
          onClick={convert}
          disabled={!file || isConverting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isConverting ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <ImageIcon className="size-5" aria-hidden="true" />}
          {isConverting ? "Convertendo imagem..." : `Converter para ${outputFormat === "jpeg" ? "JPG" : outputFormat.toUpperCase()}`}
        </button>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5" aria-live="polite">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-600" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-emerald-950">Imagem pronta</h3>
                <p className="mt-1 truncate text-sm text-emerald-800">
                  {result.name} • {formatBytes(result.size)} • {result.width} × {result.height}px
                </p>
              </div>
            </div>
            <div className="mt-4 flex min-h-48 items-center justify-center overflow-hidden rounded-lg border border-emerald-200 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] p-3">
              <NextImage
                src={result.url}
                alt="Imagem convertida"
                width={result.width}
                height={result.height}
                unoptimized
                className="max-h-80 w-auto max-w-full object-contain"
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={result.url}
                download={result.name}
                type={result.mime}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <Download className="size-4" aria-hidden="true" />
                Baixar imagem
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Converter outra
              </button>
            </div>
          </div>
        ) : null}

        <p className="text-center text-xs leading-5 text-slate-500">
          A conversão acontece no seu navegador. Sua imagem não é enviada ao Utilia.
        </p>
      </div>
    </section>
  );
}
