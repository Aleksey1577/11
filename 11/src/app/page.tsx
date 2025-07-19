'use client';

import NewsFeed from './components/NewsFeed';

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Новости</h1>
          <NewsFeed />
        </div>
      </div>
    </main>
  );
}