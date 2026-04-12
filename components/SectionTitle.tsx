import { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export const SectionTitle = ({ eyebrow, title, subtitle, align = "left" }: SectionTitleProps) => {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="pill text-[11px] text-slate-300">{eyebrow}</span>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-sm text-slate-400 sm:text-base">{subtitle}</p>}
    </div>
  );
};

