'use client'

import React from 'react';

export default function Loading() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }