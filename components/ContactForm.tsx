"use client";

import { FormEvent, useState } from "react";

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }
    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="card-surface p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">Send a Message</h2>
      <p className="mt-1 text-sm text-slate-400">
        Share a few details and George will follow up to discuss your real estate or mortgage needs.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-slate-200">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none ring-brand-500/0 backdrop-blur-sm transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/70"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none ring-brand-500/0 backdrop-blur-sm transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/70"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-slate-200">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none ring-brand-500/0 backdrop-blur-sm transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/70"
            placeholder="(323) 394-6494"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-medium text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none ring-brand-500/0 backdrop-blur-sm transition placeholder:text-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/70"
            placeholder="Tell us a bit about your goals or questions."
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-600 sm:w-auto"
        >
          Submit
        </button>

        {submitted && (
          <p className="text-sm text-emerald-400">
            Thank you for reaching out. Your message has been received and someone will follow up
            shortly.
          </p>
        )}
      </form>
    </div>
  );
};

