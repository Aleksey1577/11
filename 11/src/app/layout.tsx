'use client'; 

import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider } from 'antd';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Новости</title>
      </head>
      <body>
        <ConfigProvider>
          <Provider store={store}>{children}</Provider>
        </ConfigProvider>
      </body>
    </html>
  );
}