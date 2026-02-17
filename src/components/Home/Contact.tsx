"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const t = useTranslations("Herot.contact");
  const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

  // 1. Esquema Zod (mantenemos la lógica de validación)
  const formSchema = z.object({
    name: z.string().min(2, t('errors.name')),
    email: z.string().email(t('errors.email')),
    company: z.string().optional(),
    message: z.string().min(10, t('errors.message')),
    website: z.string().optional(), // 👈 Campo para el Honeypot
  });

  type FormData = z.infer<typeof formSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { website: "" } // Aseguramos que inicie vacío
  });

  // 2. Nueva función onSubmit usando fetch hacia tu API Blindada
  async function onSubmit(values: FormData) {
    setStatus(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: 'success', msg: t('successMsg') });
        reset();
      } else {
        throw new Error(result.error || "Error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: 'error', msg: t('errorMsg') });
    }
  }

  const inputClasses = "w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-base md:text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#3AF2CE] focus:ring-1 focus:ring-[#3AF2CE]/30 [-webkit-text-fill-color:white]";

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-6 ">
            {t('title')}
          </h2>
          <p className="text-base text-gray-400 font-light max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* 3. HONEYPOT: Campo invisible para humanos */}
            <div className="hidden" aria-hidden="true">
              <input 
                type="text" 
                {...register("website")} 
                tabIndex={-1} 
                autoComplete="off" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  {t('labels.name')}
                </label>
                <input 
                    {...register("name")} 
                    placeholder={t('placeholders.name')} 
                    className={inputClasses}
                    autoComplete="name"
                />
                {errors.name && <p className="text-red-400 text-[10px] ml-1">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                  {t('labels.email')}
                </label>
                <input 
                    {...register("email")} 
                    placeholder={t('placeholders.email')} 
                    className={inputClasses}
                    autoComplete="email"
                />
                {errors.email && <p className="text-red-400 text-[10px] ml-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                {t('labels.company')}
              </label>
              <input 
                {...register("company")} 
                placeholder={t('placeholders.company')} 
                className={inputClasses}
                autoComplete="organization"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                {t('labels.message')}
              </label>
              <textarea 
                {...register("message")} 
                rows={4} 
                placeholder={t('placeholders.message')} 
                className={`${inputClasses} resize-none`}
              />
              {errors.message && <p className="text-red-400 text-[10px] ml-1">{errors.message.message}</p>}
            </div>

            {status && (
              <div className={`p-3 rounded-lg text-center text-xs font-bold ${status.type === 'success' ? 'bg-emerald-500/10 text-[#3AF2CE]' : 'bg-red-500/10 text-red-400'}`}>
                {status.msg}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="bg-[#5d51e8] hover:bg-[#5439c1] text-white text-sm font-bold py-3 px-10 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(93,81,232,0.2)] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('sending') || '...'}</span>
                  </>
                ) : (
                  t('submitBtn')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}