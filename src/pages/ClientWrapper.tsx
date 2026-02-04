'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';



const Header = dynamic(() => import('@/components/Header/navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer/footer'), { ssr: false });

interface Props {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export default function ClientWrapper({ children, locale, messages }: Props) {
  return (
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="America/Bogota">
          <Header />
          <main className="flex-grow w-full relative">
            {children}
          </main> 
          
          <Footer />
          
      </NextIntlClientProvider>
  );
}