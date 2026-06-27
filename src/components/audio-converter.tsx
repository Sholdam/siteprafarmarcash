"use client";

import { useEffect, useRef, useState } from "react";
import type { FFmpeg } from "@ffmpeg/ffmpeg";
import {
  AudioLines,
  CheckCircle2,
  Download,
  FileAudio,
  LoaderCircle,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";

type OutputFormat = "mp3" | "wav" | "ogg";
type Status = "idle" | "loading" | "converting" | "done" | "error";
type ConvertedFile = { url: string; name: string; size: number; mime: string };

const MAX_FILE_SIZE = 200 * 1024 * 1024;
const CORE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
const acceptedExtensions = ["mp3", "mp4", "ogg", "wav", "m4a"];

const outputOptions: Array<{
  value: OutputFormat;
  label: string;
  description: string;
}> = [
  { value: "mp3", label: "MP3", description: "Compatível e compacto" },
  { value: "wav", label: "WAV", description: "Alta qualidade" },
  { value: "ogg", label: "OGG", description: "Formato aberto" },
];

const outputConfig: Record<OutputFormat, { mime: string; args: string[] }> = {
  mp3: { mime: "audio/mpeg", args: ["-vn", "-codec:a", "libmp3lame", "-b:a", "192k"] },
  wav: { mime: "audio/wav", args: ["-vn", "-codec:a", "pcm_s16le"] },
  ogg: { mime: "audio/ogg", args: ["-vn", "-codec:a", "libvorbis", "-q:a", "5"] },
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
    .trim() || "audio-convertido";
}

export function AudioConverter() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrlRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("mp3");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConvertedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
      ffmpegRef.current?.terminate();
    };
  }, []);

  function clearResult() {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResult(null);
  }

  function selectFile(nextFile: File | undefined) {
    if (!nextFile) return;
    const extension = getExtension(nextFile.name);

    if (!acceptedExtensions.includes(extension)) {
      setError("Escolha um arquivo MP3, MP4, OGG, WAV ou M4A.");
      return;
    }
    if (nextFile.size > MAX_FILE_SIZE) {
      setError("O arquivo deve ter no máximo 200 MB.");
      return;
    }

    clearResult();
    setFile(nextFile);
    setError("");
    setProgress(0);
    setStatus("idle");
  }

  async function getFfmpeg() {
    if (ffmpegRef.current?.loaded) return ffmpegRef.current;

    setStatus("loading");
    setProgress(0);
    const [{ FFmpeg }, { toBlobURL }] = await Promise.all([
      import("@ffmpeg/ffmpeg"),
      import("@ffmpeg/util"),
    ]);
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress: nextProgress }) => {
      setProgress(Math.min(100, Math.max(0, Math.round(nextProgress * 100))));
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${CORE_URL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${CORE_URL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpegRef.current = ffmpeg;
    return ffmpeg;
  }

  async function convert() {
    if (!file) {
      setError("Escolha um arquivo antes de converter.");
      return;
    }

    clearResult();
    setError("");
    const inputName = `input.${getExtension(file.name)}`;
    const outputName = `output.${outputFormat}`;

    try {
      const ffmpeg = await getFfmpeg();
      setStatus("converting");
      setProgress(0);
      await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()));
      const exitCode = await ffmpeg.exec([
        "-i",
        inputName,
        ...outputConfig[outputFormat].args,
        outputName,
      ]);
      if (exitCode !== 0) throw new Error("A conversão não foi concluída.");

      const data = await ffmpeg.readFile(outputName);
      if (typeof data === "string") throw new Error("Formato de saída inesperado.");
      const blob = new Blob([new Uint8Array(data)], { type: outputConfig[outputFormat].mime });
      const url = URL.createObjectURL(blob);
      const downloadName = `${getBaseName(file.name)}.${outputFormat}`;

      resultUrlRef.current = url;
      setResult({
        url,
        name: downloadName,
        size: blob.size,
        mime: outputConfig[outputFormat].mime,
      });
      setProgress(100);
      setStatus("done");
      await Promise.allSettled([ffmpeg.deleteFile(inputName), ffmpeg.deleteFile(outputName)]);
    } catch (conversionError) {
      console.error(conversionError);
      setError("Não foi possível converter este arquivo. Confira sua conexão e tente um arquivo menor.");
      setStatus("error");
    }
  }

  function cancelConversion() {
    ffmpegRef.current?.terminate();
    ffmpegRef.current = null;
    setStatus("idle");
    setProgress(0);
    setError("Conversão cancelada.");
  }

  function reset() {
    clearResult();
    setFile(null);
    setError("");
    setProgress(0);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }

  const isBusy = status === "loading" || status === "converting";

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
            <AudioLines className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">Conversor de áudio</h2>
            <p className="mt-1 text-sm text-slate-600">MP3, MP4, OGG, WAV e M4A</p>
          </div>
        </div>
      </div>

      <div className="grid gap-7 p-5 sm:p-7">
        <div>
          <p className="mb-3 text-sm font-bold text-slate-800">1. Escolha o arquivo</p>
          <button
            type="button"
            disabled={isBusy}
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
            <span className="mt-4 font-bold text-slate-900">Clique ou arraste seu arquivo aqui</span>
            <span className="mt-2 text-sm text-slate-500">Até 200 MB</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".mp3,.mp4,.ogg,.wav,.m4a,audio/mpeg,audio/mp4,video/mp4,audio/ogg,audio/wav"
            className="sr-only"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          {file ? (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-700">
                <FileAudio className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">{file.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{formatBytes(file.size)}</span>
              </span>
              {!isBusy ? (
                <button
                  type="button"
                  onClick={reset}
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Remover arquivo"
                  title="Remover arquivo"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <fieldset disabled={isBusy}>
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
                  name="output-format"
                  value={option.value}
                  checked={outputFormat === option.value}
                  onChange={() => {
                    setOutputFormat(option.value);
                    clearResult();
                    setStatus("idle");
                  }}
                  className="sr-only"
                />
                <span className="block font-black text-slate-950">{option.label}</span>
                <span className="mt-1 block text-xs text-slate-500">{option.description}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {isBusy ? (
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4" aria-live="polite">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 font-bold text-cyan-900">
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                {status === "loading" ? "Preparando o conversor..." : "Convertendo o áudio..."}
              </span>
              <span className="font-bold text-cyan-800">{progress}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-cyan-100">
              <div
                className="h-full rounded-full bg-cyan-600 transition-[width]"
                style={{ width: `${status === "loading" ? Math.max(progress, 8) : progress}%` }}
              />
            </div>
            <button
              type="button"
              onClick={cancelConversion}
              className="mt-4 text-sm font-bold text-cyan-900 underline decoration-cyan-400 underline-offset-4"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={convert}
            disabled={!file}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <AudioLines className="size-5" aria-hidden="true" />
            Converter para {outputFormat.toUpperCase()}
          </button>
        )}

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
                <h3 className="font-bold text-emerald-950">Áudio pronto</h3>
                <p className="mt-1 truncate text-sm text-emerald-800">{result.name} • {formatBytes(result.size)}</p>
              </div>
            </div>
            <audio controls src={result.url} className="mt-4 w-full" preload="metadata">
              Seu navegador não suporta a reprodução deste áudio.
            </audio>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={result.url}
                download={result.name}
                type={result.mime}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <Download className="size-4" aria-hidden="true" />
                Baixar arquivo
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-white px-4 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Converter outro
              </button>
            </div>
          </div>
        ) : null}

        <p className="text-center text-xs leading-5 text-slate-500">
          O processamento acontece no seu navegador. Seu arquivo não é enviado ao Utilia.
        </p>
      </div>
    </section>
  );
}
