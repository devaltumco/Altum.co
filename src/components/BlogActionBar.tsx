'use client';

interface Props {
  promptText: string;
  currentUrl: string;
  tSummarize: string;
  tShare: string;
}

export default function BlogActionBar({ promptText, currentUrl, tSummarize, tShare }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-y border-slate-100 dark:border-slate-800 py-4 mb-10 gap-4">
      
      {/* --- SECCIÓN IZQUIERDA: IA --- */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-500 shrink-0">
          {tSummarize}
        </span>
        
        <div className="flex gap-2 items-center">
          {/* ChatGPT */}
          <a href={`https://chat.openai.com/?q=${promptText}${currentUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full text-slate-700 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 transition" title="ChatGPT">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729ZM7.5585 9.7735a1.286 1.286 0 0 1-1.286-1.286 1.286 1.286 0 0 1 1.286-1.286 1.286 1.286 0 0 1 1.286 1.286 1.286 1.286 0 0 1-1.286 1.286Z"/></svg>
          </a>
          
          {/* Gemini */}
          <a href={`https://gemini.google.com/app?text=${promptText}${currentUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-full text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition" title="Gemini">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24c0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12 0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12z"/></svg>
          </a>
        </div>
      </div>

      {/* --- SECCIÓN DERECHA: COMPARTIR --- */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-500 shrink-0">
          {tShare}
        </span>

        <div className="flex gap-2 text-slate-400 items-center">
            {/* WhatsApp */}
            <a href={`https://api.whatsapp.com/send?text=${currentUrl}`} target="_blank" className="p-2 hover:bg-green-50 rounded-full text-slate-400 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            {/* X */}
            <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" className="p-2 hover:bg-gray-50 rounded-full text-slate-400 hover:text-black dark:hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Facebook */}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" className="p-2 hover:bg-blue-50 rounded-full text-slate-400 hover:text-blue-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
         </div>
      </div>
    </div>
  );
}