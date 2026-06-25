"use client";

import { useMemo, useState } from "react";
import { CopyButton, inputClass, InputField } from "@/components/ui";
import { money, percent } from "@/lib/format";

function toNumber(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function MarginCalculator() {
  const [cost, setCost] = useState("");
  const [margin, setMargin] = useState("30");
  const [fee, setFee] = useState("3");
  const [shipping, setShipping] = useState("");
  const [tax, setTax] = useState("0");
  const [others, setOthers] = useState("");

  const result = useMemo(() => {
    const baseCost = toNumber(cost);
    const extra = toNumber(shipping) + toNumber(others);
    const marginRate = toNumber(margin) / 100;
    const feeRate = toNumber(fee) / 100;
    const taxRate = toNumber(tax) / 100;
    const fixedCosts = baseCost + extra;
    const variableRate = marginRate + feeRate + taxRate;
    const price = variableRate >= 0.95 ? fixedCosts / 0.05 : fixedCosts / (1 - variableRate);
    const variableCosts = price * (feeRate + taxRate);
    const totalCosts = fixedCosts + variableCosts;
    const profit = price - totalCosts;
    const realMargin = price > 0 ? (profit / price) * 100 : 0;
    return { price, profit, realMargin, totalCosts };
  }, [cost, fee, margin, others, shipping, tax]);

  const copyText = `Preco sugerido: ${money(result.price)} | Lucro bruto: ${money(result.profit)} | Margem real: ${percent(result.realMargin)}% | Custos totais: ${money(result.totalCosts)}`;

  function clear() {
    setCost("");
    setMargin("30");
    setFee("3");
    setShipping("");
    setTax("0");
    setOthers("");
  }

  return (
    <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1fr_360px] sm:p-6">
      <div className="grid gap-4">
        <InputField label="Custo do produto/servico">
          <input className={inputClass} inputMode="decimal" placeholder="50,00" value={cost} onChange={(event) => setCost(event.target.value)} />
        </InputField>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Margem desejada (%)">
            <input className={inputClass} inputMode="decimal" value={margin} onChange={(event) => setMargin(event.target.value)} />
          </InputField>
          <InputField label="Taxa de cartao/marketplace (%)">
            <input className={inputClass} inputMode="decimal" value={fee} onChange={(event) => setFee(event.target.value)} />
          </InputField>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Frete/custo extra">
            <input className={inputClass} inputMode="decimal" placeholder="0,00" value={shipping} onChange={(event) => setShipping(event.target.value)} />
          </InputField>
          <InputField label="Imposto estimado (%)">
            <input className={inputClass} inputMode="decimal" value={tax} onChange={(event) => setTax(event.target.value)} />
          </InputField>
          <InputField label="Outros custos">
            <input className={inputClass} inputMode="decimal" placeholder="0,00" value={others} onChange={(event) => setOthers(event.target.value)} />
          </InputField>
        </div>
        <button type="button" onClick={clear} className="w-fit rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
          Limpar
        </button>
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          Esta calculadora e uma estimativa simples e nao substitui analise contabil ou financeira profissional.
        </p>
      </div>

      <aside className="rounded-lg bg-slate-950 p-5 text-white">
        <h2 className="text-lg font-bold">Resultado</h2>
        <dl className="mt-5 grid gap-4">
          <div>
            <dt className="text-sm text-slate-300">Preco sugerido</dt>
            <dd className="text-3xl font-bold">{money(result.price)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-300">Lucro bruto estimado</dt>
            <dd className="text-xl font-semibold">{money(result.profit)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-300">Margem real estimada</dt>
            <dd className="text-xl font-semibold">{percent(result.realMargin)}%</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-300">Total de custos</dt>
            <dd className="text-xl font-semibold">{money(result.totalCosts)}</dd>
          </div>
        </dl>
        {result.realMargin > 0 && result.realMargin < 15 ? (
          <p className="mt-5 rounded-lg bg-amber-400/20 px-3 py-2 text-sm text-amber-100">
            Atencao: a margem estimada ficou baixa.
          </p>
        ) : null}
        <div className="mt-5">
          <CopyButton value={copyText} label="Copiar resultado" />
        </div>
      </aside>
    </section>
  );
}
