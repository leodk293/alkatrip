import React from "react";

export async function generateMetadata({ params }, parent) {
  const id = decodeURIComponent(params.id);
  return {
    title: `${id} - Akaltrip`,
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
