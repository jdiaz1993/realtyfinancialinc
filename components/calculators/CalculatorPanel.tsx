"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type CalculatorPanelProps = {
  slug: string;
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const decimalCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2
});

const toNumber = (value: string) => Number(value.replace(/,/g, "")) || 0;

const monthlyPayment = (principal: number, annualRate: number, years: number) => {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (principal <= 0 || months <= 0) {
    return 0;
  }

  if (monthlyRate === 0) {
    return principal / months;
  }

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};

const remainingBalance = (
  principal: number,
  annualRate: number,
  years: number,
  paymentsMade: number
) => {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const payment = monthlyPayment(principal, annualRate, years);

  if (principal <= 0 || paymentsMade <= 0) {
    return principal;
  }

  if (monthlyRate === 0) {
    return Math.max(principal - payment * paymentsMade, 0);
  }

  return Math.max(
    principal * Math.pow(1 + monthlyRate, paymentsMade) -
      payment * ((Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate),
    0
  );
};

const NumberField = ({ label, value, onChange, suffix }: FieldProps) => (
  <label className="space-y-1.5">
    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
      {label}
    </span>
    <div className="flex items-center rounded-lg border border-white/10 bg-black/25 focus-within:border-brand-500/60">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-500"
      />
      {suffix && <span className="pr-3 text-sm text-slate-400">{suffix}</span>}
    </div>
  </label>
);

const ResultCard = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/10">
    <p className="text-sm text-slate-300">{label}</p>
    <p className="text-right text-base font-semibold text-slate-50">{value}</p>
  </div>
);

const MortgageCalculator = () => {
  const [values, setValues] = useState({
    price: "750000",
    downPayment: "150000",
    rate: "6.75",
    term: "30",
    taxes: "780",
    insurance: "175"
  });

  const results = useMemo(() => {
    const price = toNumber(values.price);
    const downPayment = toNumber(values.downPayment);
    const loanAmount = Math.max(price - downPayment, 0);
    const principalInterest = monthlyPayment(loanAmount, toNumber(values.rate), toNumber(values.term));
    const totalPayment = principalInterest + toNumber(values.taxes) + toNumber(values.insurance);

    return { loanAmount, principalInterest, totalPayment };
  }, [values]);

  return (
    <CalculatorShell>
      <CalculatorFields>
        <NumberField label="Home price" value={values.price} onChange={(price) => setValues({ ...values, price })} />
        <NumberField label="Down payment" value={values.downPayment} onChange={(downPayment) => setValues({ ...values, downPayment })} />
        <NumberField label="Interest rate" value={values.rate} onChange={(rate) => setValues({ ...values, rate })} suffix="%" />
        <NumberField label="Loan term" value={values.term} onChange={(term) => setValues({ ...values, term })} suffix="years" />
        <NumberField label="Monthly taxes" value={values.taxes} onChange={(taxes) => setValues({ ...values, taxes })} />
        <NumberField label="Monthly insurance" value={values.insurance} onChange={(insurance) => setValues({ ...values, insurance })} />
      </CalculatorFields>
      <CalculateButton />
      <CalculatorResults title="Mortgage calculator results">
        <ResultCard label="Loan amount" value={currency.format(results.loanAmount)} />
        <ResultCard label="Principal and interest" value={currency.format(results.principalInterest)} />
        <ResultCard label="Estimated monthly payment" value={currency.format(results.totalPayment)} />
      </CalculatorResults>
    </CalculatorShell>
  );
};

const AffordabilityCalculator = () => {
  const [values, setValues] = useState({
    income: "12000",
    debts: "600",
    downPayment: "100000",
    rate: "6.75",
    term: "30",
    dti: "43",
    taxes: "700",
    insurance: "175"
  });

  const results = useMemo(() => {
    const maxHousingPayment = toNumber(values.income) * (toNumber(values.dti) / 100) - toNumber(values.debts);
    const availablePrincipalInterest =
      maxHousingPayment - toNumber(values.taxes) - toNumber(values.insurance);

    let low = toNumber(values.downPayment);
    let high = 3000000;

    for (let index = 0; index < 80; index += 1) {
      const midpoint = (low + high) / 2;
      const loanAmount = Math.max(midpoint - toNumber(values.downPayment), 0);
      const payment = monthlyPayment(loanAmount, toNumber(values.rate), toNumber(values.term));

      if (payment <= availablePrincipalInterest) {
        low = midpoint;
      } else {
        high = midpoint;
      }
    }

    return {
      affordablePrice: Math.max(low, 0),
      maxHousingPayment: Math.max(maxHousingPayment, 0),
      estimatedLoan: Math.max(low - toNumber(values.downPayment), 0)
    };
  }, [values]);

  return (
    <CalculatorShell>
      <CalculatorFields>
        <NumberField label="Monthly income" value={values.income} onChange={(income) => setValues({ ...values, income })} />
        <NumberField label="Monthly debts" value={values.debts} onChange={(debts) => setValues({ ...values, debts })} />
        <NumberField label="Down payment" value={values.downPayment} onChange={(downPayment) => setValues({ ...values, downPayment })} />
        <NumberField label="Interest rate" value={values.rate} onChange={(rate) => setValues({ ...values, rate })} suffix="%" />
        <NumberField label="Loan term" value={values.term} onChange={(term) => setValues({ ...values, term })} suffix="years" />
        <NumberField label="Target DTI" value={values.dti} onChange={(dti) => setValues({ ...values, dti })} suffix="%" />
        <NumberField label="Monthly taxes" value={values.taxes} onChange={(taxes) => setValues({ ...values, taxes })} />
        <NumberField label="Monthly insurance" value={values.insurance} onChange={(insurance) => setValues({ ...values, insurance })} />
      </CalculatorFields>
      <CalculateButton />
      <CalculatorResults title="Affordability calculator results">
        <ResultCard label="Estimated affordable price" value={currency.format(results.affordablePrice)} />
        <ResultCard label="Estimated loan amount" value={currency.format(results.estimatedLoan)} />
        <ResultCard label="Target housing payment" value={currency.format(results.maxHousingPayment)} />
      </CalculatorResults>
    </CalculatorShell>
  );
};

const RentVsBuyCalculator = () => {
  const [values, setValues] = useState({
    rent: "3000",
    homePrice: "750000",
    downPayment: "150000",
    rate: "6.75",
    term: "30",
    years: "7",
    appreciation: "3",
    taxRate: "1.1",
    insurance: "2100",
    maintenance: "1"
  });

  const results = useMemo(() => {
    const years = toNumber(values.years);
    const months = years * 12;
    const homePrice = toNumber(values.homePrice);
    const loanAmount = Math.max(homePrice - toNumber(values.downPayment), 0);
    const monthlyMortgage = monthlyPayment(loanAmount, toNumber(values.rate), toNumber(values.term));
    const futureValue = homePrice * Math.pow(1 + toNumber(values.appreciation) / 100, years);
    const balance = remainingBalance(loanAmount, toNumber(values.rate), toNumber(values.term), months);
    const equity = Math.max(futureValue - balance, 0);
    const rentCost = toNumber(values.rent) * months;
    const ownershipCosts =
      toNumber(values.downPayment) +
      monthlyMortgage * months +
      homePrice * (toNumber(values.taxRate) / 100) * years +
      toNumber(values.insurance) * years +
      homePrice * (toNumber(values.maintenance) / 100) * years;
    const netBuyCost = Math.max(ownershipCosts - equity, 0);

    return { rentCost, netBuyCost, difference: rentCost - netBuyCost };
  }, [values]);

  return (
    <CalculatorShell>
      <CalculatorFields>
        <NumberField label="Monthly rent" value={values.rent} onChange={(rent) => setValues({ ...values, rent })} />
        <NumberField label="Home price" value={values.homePrice} onChange={(homePrice) => setValues({ ...values, homePrice })} />
        <NumberField label="Down payment" value={values.downPayment} onChange={(downPayment) => setValues({ ...values, downPayment })} />
        <NumberField label="Interest rate" value={values.rate} onChange={(rate) => setValues({ ...values, rate })} suffix="%" />
        <NumberField label="Loan term" value={values.term} onChange={(term) => setValues({ ...values, term })} suffix="years" />
        <NumberField label="Years compared" value={values.years} onChange={(years) => setValues({ ...values, years })} />
        <NumberField label="Annual appreciation" value={values.appreciation} onChange={(appreciation) => setValues({ ...values, appreciation })} suffix="%" />
        <NumberField label="Property tax rate" value={values.taxRate} onChange={(taxRate) => setValues({ ...values, taxRate })} suffix="%" />
        <NumberField label="Annual insurance" value={values.insurance} onChange={(insurance) => setValues({ ...values, insurance })} />
        <NumberField label="Annual maintenance" value={values.maintenance} onChange={(maintenance) => setValues({ ...values, maintenance })} suffix="%" />
      </CalculatorFields>
      <CalculateButton />
      <CalculatorResults title="Rent vs buy calculator results">
        <ResultCard label="Estimated rent cost" value={currency.format(results.rentCost)} />
        <ResultCard label="Estimated net buy cost" value={currency.format(results.netBuyCost)} />
        <ResultCard
          label={results.difference >= 0 ? "Buying advantage" : "Renting advantage"}
          value={currency.format(Math.abs(results.difference))}
        />
      </CalculatorResults>
    </CalculatorShell>
  );
};

const AmortizationCalculator = () => {
  const [view, setView] = useState<"chart" | "table">("chart");
  const [values, setValues] = useState({
    loanAmount: "600000",
    rate: "6.75",
    term: "30"
  });

  const results = useMemo(() => {
    const loanAmount = toNumber(values.loanAmount);
    const rate = toNumber(values.rate);
    const term = toNumber(values.term);
    const payment = monthlyPayment(loanAmount, rate, term);
    const monthlyRate = rate / 100 / 12;
    let balance = loanAmount;
    const rows = [];
    const chartRows = [];

    for (let month = 1; month <= 12; month += 1) {
      const interest = balance * monthlyRate;
      const principal = Math.min(payment - interest, balance);
      balance = Math.max(balance - principal, 0);
      rows.push({ month, principal, interest, balance });
    }

    for (let year = 0; year <= term; year += 1) {
      chartRows.push({
        year,
        balance: remainingBalance(loanAmount, rate, term, year * 12)
      });
    }

    return {
      payment,
      totalInterest: Math.max(payment * term * 12 - loanAmount, 0),
      rows,
      chartRows
    };
  }, [values]);

  return (
    <CalculatorShell>
      <CalculatorFields>
        <NumberField label="Loan amount" value={values.loanAmount} onChange={(loanAmount) => setValues({ ...values, loanAmount })} />
        <NumberField label="Interest rate" value={values.rate} onChange={(rate) => setValues({ ...values, rate })} suffix="%" />
        <NumberField label="Loan term" value={values.term} onChange={(term) => setValues({ ...values, term })} suffix="years" />
      </CalculatorFields>
      <CalculateButton />
      <CalculatorResults title="Amortization calculator results">
        <ResultCard label="Monthly payment" value={currency.format(results.payment)} />
        <ResultCard label="Total interest" value={currency.format(results.totalInterest)} />
      </CalculatorResults>
      <AmortizationSchedule
        monthlyPaymentAmount={results.payment}
        chartRows={results.chartRows}
        rows={results.rows}
        view={view}
        onViewChange={setView}
      />
    </CalculatorShell>
  );
};

const RefinanceCalculator = () => {
  const [values, setValues] = useState({
    balance: "500000",
    currentRate: "7.25",
    currentTerm: "30",
    newRate: "6.25",
    newTerm: "30",
    closingCosts: "6500"
  });

  const results = useMemo(() => {
    const balance = toNumber(values.balance);
    const currentPayment = monthlyPayment(balance, toNumber(values.currentRate), toNumber(values.currentTerm));
    const newPayment = monthlyPayment(balance, toNumber(values.newRate), toNumber(values.newTerm));
    const savings = currentPayment - newPayment;
    const breakEvenMonths = savings > 0 ? toNumber(values.closingCosts) / savings : 0;

    return { currentPayment, newPayment, savings, breakEvenMonths };
  }, [values]);

  return (
    <CalculatorShell>
      <CalculatorFields>
        <NumberField label="Current balance" value={values.balance} onChange={(balance) => setValues({ ...values, balance })} />
        <NumberField label="Current rate" value={values.currentRate} onChange={(currentRate) => setValues({ ...values, currentRate })} suffix="%" />
        <NumberField label="Current term" value={values.currentTerm} onChange={(currentTerm) => setValues({ ...values, currentTerm })} suffix="years" />
        <NumberField label="New rate" value={values.newRate} onChange={(newRate) => setValues({ ...values, newRate })} suffix="%" />
        <NumberField label="New term" value={values.newTerm} onChange={(newTerm) => setValues({ ...values, newTerm })} suffix="years" />
        <NumberField label="Closing costs" value={values.closingCosts} onChange={(closingCosts) => setValues({ ...values, closingCosts })} />
      </CalculatorFields>
      <CalculateButton />
      <CalculatorResults title="Refinance calculator results">
        <ResultCard label="Current payment" value={currency.format(results.currentPayment)} />
        <ResultCard label="New payment" value={currency.format(results.newPayment)} />
        <ResultCard label="Monthly savings" value={currency.format(results.savings)} />
        <ResultCard
          label="Break-even estimate"
          value={results.breakEvenMonths > 0 ? `${results.breakEvenMonths.toFixed(1)} months` : "No savings"}
        />
      </CalculatorResults>
    </CalculatorShell>
  );
};

type AmortizationScheduleProps = {
  monthlyPaymentAmount: number;
  chartRows: Array<{
    year: number;
    balance: number;
  }>;
  rows: Array<{
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  view: "chart" | "table";
  onViewChange: (view: "chart" | "table") => void;
};

const AmortizationSchedule = ({
  monthlyPaymentAmount,
  chartRows,
  rows,
  view,
  onViewChange
}: AmortizationScheduleProps) => {
  const maxBalance = Math.max(...chartRows.map((row) => row.balance), 1);
  const points = chartRows
    .map((row, index) => {
      const x = chartRows.length === 1 ? 40 : 40 + (index / (chartRows.length - 1)) * 520;
      const y = 260 - (row.balance / maxBalance) * 210;

      return `${x},${y}`;
    })
    .join(" ");
  const gridLines = [0, 1, 2, 3, 4];

  return (
    <section className="card-surface border border-white/15 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">Amortization schedule</h3>
          <p className="mt-6 text-sm text-slate-300">Est. Monthly Payment:</p>
          <p className="text-2xl font-semibold text-slate-50">
            {currency.format(monthlyPaymentAmount)}
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <button
            type="button"
            onClick={() => onViewChange("chart")}
            className={`border-b-2 pb-2 transition ${
              view === "chart"
                ? "border-brand-500 text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Chart
          </button>
          <button
            type="button"
            onClick={() => onViewChange("table")}
            className={`border-b-2 pb-2 transition ${
              view === "table"
                ? "border-brand-500 text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {view === "chart" ? (
        <div className="mt-8 overflow-x-auto">
          <svg
            viewBox="0 0 620 300"
            role="img"
            aria-label="Estimated remaining loan balance over time"
            className="min-h-[260px] min-w-[620px]"
          >
            {gridLines.map((line) => {
              const y = 50 + line * 52.5;
              const value = maxBalance - (maxBalance / 4) * line;

              return (
                <g key={line}>
                  <line
                    x1="40"
                    y1={y}
                    x2="560"
                    y2={y}
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="5 5"
                  />
                  <text x="0" y={y + 4} fill="rgb(148, 163, 184)" fontSize="12">
                    {currency.format(value)}
                  </text>
                </g>
              );
            })}
            {gridLines.map((line) => {
              const x = 40 + line * 130;

              return (
                <line
                  key={line}
                  x1={x}
                  y1="50"
                  x2={x}
                  y2="260"
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="5 5"
                />
              );
            })}
            <polyline points={points} fill="none" stroke="rgb(249, 115, 22)" strokeWidth="3" />
            {chartRows.map((row, index) => {
              if (index % Math.max(Math.ceil(chartRows.length / 8), 1) !== 0 && index !== chartRows.length - 1) {
                return null;
              }

              const x = chartRows.length === 1 ? 40 : 40 + (index / (chartRows.length - 1)) * 520;
              const y = 260 - (row.balance / maxBalance) * 210;

              return (
                <circle
                  key={row.year}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="rgb(15, 23, 42)"
                  stroke="rgb(249, 115, 22)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg ring-1 ring-white/10">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-3 py-3">Month</th>
                <th className="px-3 py-3">Principal</th>
                <th className="px-3 py-3">Interest</th>
                <th className="px-3 py-3">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => (
                <tr key={row.month}>
                  <td className="px-3 py-3">{row.month}</td>
                  <td className="px-3 py-3">{decimalCurrency.format(row.principal)}</td>
                  <td className="px-3 py-3">{decimalCurrency.format(row.interest)}</td>
                  <td className="px-3 py-3">{currency.format(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const CalculatorShell = ({ children }: { children: ReactNode }) => (
  <div className="space-y-6">{children}</div>
);

const CalculatorFields = ({ children }: { children: ReactNode }) => (
  <div className="card-surface grid gap-4 p-5 sm:grid-cols-2 sm:p-6">{children}</div>
);

const CalculateButton = () => (
  <button
    type="button"
    className="inline-flex items-center justify-center rounded-md bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600"
  >
    Calculate
  </button>
);

const CalculatorResults = ({ children, title }: { children: ReactNode; title: string }) => (
  <section className="card-surface border border-white/15 p-5 sm:p-6">
    <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
    <div className="mt-5 grid gap-4 md:grid-cols-2">{children}</div>
  </section>
);

export const CalculatorPanel = ({ slug }: CalculatorPanelProps) => {
  if (slug === "mortgage-calculator") {
    return <MortgageCalculator />;
  }

  if (slug === "affordability-calculator") {
    return <AffordabilityCalculator />;
  }

  if (slug === "rent-vs-buy") {
    return <RentVsBuyCalculator />;
  }

  if (slug === "amortization-calculator") {
    return <AmortizationCalculator />;
  }

  if (slug === "refinance-calculator") {
    return <RefinanceCalculator />;
  }

  return null;
};
