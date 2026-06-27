"use client";

import { useState } from "react";
import { AudioLines, FileText, ImageIcon } from "lucide-react";
import { AudioConverter } from "@/components/audio-converter";
import { ImageConverter } from "@/components/image-converter";

type ConverterTab = "audio" | "imagem";

export function ConverterTabs() {
  const [activeTab, setActiveTab] = useState<ConverterTab>("audio");

  function selectTab(tab: ConverterTab) {
    setActiveTab(tab);
    window.history.replaceState(null, "", tab === "audio" ? "#audio" : "#imagem");
  }

  const tabClass = (selected: boolean) =>
    `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm transition ${
      selected
        ? "bg-slate-950 font-bold text-white"
        : "font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <>
      <div
        className="mb-6 grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
        role="tablist"
        aria-label="Tipos de conversor"
      >
        <button
          type="button"
          role="tab"
          id="tab-audio"
          aria-selected={activeTab === "audio"}
          aria-controls="panel-converter"
          onClick={() => selectTab("audio")}
          className={tabClass(activeTab === "audio")}
        >
          <AudioLines className="size-4" aria-hidden="true" />
          Áudio
        </button>
        <button
          type="button"
          role="tab"
          id="tab-imagem"
          aria-selected={activeTab === "imagem"}
          aria-controls="panel-converter"
          onClick={() => selectTab("imagem")}
          className={tabClass(activeTab === "imagem")}
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

      <div
        id="panel-converter"
        role="tabpanel"
        aria-labelledby={activeTab === "audio" ? "tab-audio" : "tab-imagem"}
      >
        {activeTab === "audio" ? <AudioConverter /> : <ImageConverter />}
      </div>
    </>
  );
}
