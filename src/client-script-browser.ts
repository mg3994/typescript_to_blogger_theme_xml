import React from 'react';

export interface BClientScriptProps {
  scriptPath: string;
  mode?: "raw" | "cdata" | "escaped";
  minify?: boolean;
}

/**
 * Browser-safe mock for BClientScript. Returns null in client bundles.
 */
export function BClientScript(props: BClientScriptProps) {
  return null;
}
