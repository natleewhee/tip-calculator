// components/CpfCalculator.jsx
"use client";

import { useState } from "react";

const CPF_RATES = {
  below55:  { employee: 0.20, employer: 0.17, label: "Below 55" },
  "55to60": { employee: 0.15, employer: 0.135, label: "55 – 60" },
  "60to65": { employee: 0.095, employer: 0.09, label: "60 – 65" },
  above65:  { employee: 0.05, employer: 0.075, label: "Above 65" },
};

const CPF_CEILING = 7400; // Ordinary Wage ceiling (2025)

function fmt(n) {
  return n.toLocaleString("en-SG", { style: "currency", currency: "SGD", minimumFractionDigits: 2 });
}

function Row({ label, value, sub, accent }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-stone-100 last:border-0 ${accent ? "py-4" : ""}`}>
      <div>
        <p className={`font-medium ${accent ? "text-stone-800 text-base" : "text-stone-500 text-sm"}`}>{label}</p>
        {sub && <p className="text-xs text-stone-400 mt-0.5">{sub}</p>}
      </div>
      <p className={`font-mono tabular-nums ${accent ? "text-emerald-600 text-xl font-bold" : "text-stone-700 text-sm font-medium"}`}>
        {value}
      </p>
    </div>
  );
}

export default function CpfCalculator() {
  const [salary, setSalary] = useState("");
  const [ageKey, setAgeKey] = useState("below55");

  const rates = CPF_RATES[ageKey];
  const gross = parseFloat(salary) || 0;
  const cappedWage = Math.min(gross, CPF_CEILING);

  const employeeContrib = cappedWage * rates.employee;
  const employerContrib = cappedWage * rates.employer;
  const totalContrib = employeeContrib + employerContrib;
  const takeHome = gross - employeeContrib;
  const totalCost = gross + employerContrib;

  const hasValue = gross > 0;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans">
      {/* Google Font via next/font would be preferred in real Next.js; using @import here for portability */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap'); .cpf-root { font-family: 'Sora', sans-serif; }`}</style>

      <div className="cpf-root w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            <span>🇸🇬</span> CPF Calculator
          </div>
          <h1 className="text-3xl font-bold text-stone-900 leading-tight">
            Contribution<br />Breakdown
          </h1>
          <p className="text-stone-400 text-sm mt-2">
            Based on CPF Board rates · OW ceiling S$7,400
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-4">

          {/* Salary input */}
          <div className="mb-5">
            <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
              Gross Monthly Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium text-sm">S$</span>
              <input
                type="number"
                min="0"
                step="100"
                placeholder="0.00"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-lg font-semibold placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>
            {gross > CPF_CEILING && (
              <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                ⚠ CPF contributions capped at S$7,400 ordinary wage ceiling
              </p>
            )}
          </div>

          {/* Age group selector */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
              Age Group
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(CPF_RATES).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setAgeKey(key)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                    ageKey === key
                      ? "bg-red-600 border-red-600 text-white shadow-sm"
                      : "bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rate badges */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "Employee", val: `${(rates.employee * 100).toFixed(1)}%` },
            { label: "Employer", val: `${(rates.employer * 100).toFixed(1)}%` },
            { label: "Combined", val: `${((rates.employee + rates.employer) * 100).toFixed(1)}%` },
          ].map(({ label, val }) => (
            <div key={label} className="flex-1 bg-white rounded-xl border border-stone-200 p-3 text-center">
              <p className="text-xs text-stone-400 font-medium">{label}</p>
              <p className="text-base font-bold text-stone-800 font-mono mt-0.5">{val}</p>
            </div>
          ))}
        </div>

        {/* Results card */}
        <div className={`bg-white rounded-2xl border shadow-sm p-6 transition-opacity duration-300 ${hasValue ? "opacity-100 border-stone-200" : "opacity-40 border-stone-100"}`}>
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">Breakdown</p>

          <Row
            label="Gross Salary"
            value={fmt(gross)}
          />
          <Row
            label="Employee CPF"
            sub={`${(rates.employee * 100).toFixed(1)}% deducted from your pay`}
            value={`− ${fmt(employeeContrib)}`}
          />
          <Row
            label="Employer CPF"
            sub={`${(rates.employer * 100).toFixed(1)}% contributed by employer`}
            value={`+ ${fmt(employerContrib)}`}
          />

          <div className="my-2 border-t border-dashed border-stone-200" />

          <Row
            label="Take-Home Pay"
            sub="Gross minus employee CPF"
            value={fmt(takeHome)}
            accent
          />

          <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3">
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-xs text-stone-400 font-medium">Total CPF (both)</p>
              <p className="text-sm font-bold text-stone-700 font-mono mt-0.5">{fmt(totalContrib)}</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3">
              <p className="text-xs text-stone-400 font-medium">Total Employer Cost</p>
              <p className="text-sm font-bold text-stone-700 font-mono mt-0.5">{fmt(totalCost)}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-stone-300 mt-5">
          Ordinary wages only · Does not include AW · Rates effective 2025
        </p>
      </div>
    </div>
  );
}