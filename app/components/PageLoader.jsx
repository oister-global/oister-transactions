"use client";

import React from "react";

export default function PageLoader() {
  return (
    <div className="grid min-h-[calc(100vh-10rem)] place-items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-6 border-blue-200 border-t-blue-600" />
    </div>
  );
}
