"use client";

import Image from "next/image";
import { DownloadButton } from "@/components/ui";
import { downloadDataUrl } from "@/lib/download";

export function QrPreview({
  dataUrl,
  filename,
}: {
  dataUrl: string;
  filename: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="mx-auto grid size-56 place-items-center rounded-lg bg-white p-4 shadow-sm">
        <Image src={dataUrl} alt="Preview do QR Code" width={200} height={200} />
      </div>
      <div className="mt-4 flex justify-center">
        <DownloadButton onClick={() => downloadDataUrl(dataUrl, filename)}>
          Baixar PNG
        </DownloadButton>
      </div>
    </div>
  );
}
