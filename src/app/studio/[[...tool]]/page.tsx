"use client";

import dynamic from "next/dynamic";

const StudioComponent = dynamic(() => import("./studio-component"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888",
      }}
    >
      Loading Studio...
    </div>
  ),
});

export default function StudioPage() {
  return <StudioComponent />;
}
