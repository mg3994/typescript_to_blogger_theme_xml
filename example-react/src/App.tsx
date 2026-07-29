import React, { useState } from 'react';
import { BIf, Expr } from '@antinna/blogger-theme';

export default function App() {
  const [likes, setLikes] = useState(0);

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
      }}
    >
      <h2 style={{ color: '#ff5a5f', marginTop: 0 }}>⚛️ React in Blogger!</h2>
      <p style={{ color: '#555', lineHeight: '1.5' }}>
        This application was written in React, compiled to a self-invoking IIFE
        via <strong>blogger-theme</strong> and esbuild, and embedded dynamically
        into the theme XML.
      </p>

      {/* Embedded Blogger specific conditional within our client application */}
      <BIf cond="data:view.isHomepage">
        <div className="homepage-banner" cond="data:view.isHomepage">
          <h1 expr:title="data:blog.title">
            Welcome to {Expr.get('blog.title')}!
          </h1>
          <p>A cutting-edge blog layout engineered entirely in TypeScript.</p>
        </div>
      </BIf>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <button
          onClick={() => setLikes(likes + 1)}
          style={{
            backgroundColor: '#ff5a5f',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ❤️ Like React App
        </button>
        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
          {likes} {likes === 1 ? 'like' : 'likes'}
        </span>
      </div>
    </div>
  );
}
