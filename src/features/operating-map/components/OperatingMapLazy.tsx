"use client";

import dynamic from "next/dynamic";

const OperatingMapClient = dynamic(
  async () => {
    const module = await import("./OperatingMapClient");
    return module.OperatingMapClient;
  },
  {
    ssr: false,
    loading: () => <div className="map-loading" aria-hidden="true" />,
  },
);

export function OperatingMapLazy() {
  return <OperatingMapClient />;
}
