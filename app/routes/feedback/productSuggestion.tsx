import { useEffect } from "react";

export function meta() {
  return [
    { title: "Product Suggestion | Vantern" },
    { name: "description", content: "Suggest a new product or service for Vantern." },
  ];
}

export default function IdeaSuggestion() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/r/A74LGB?transparentBackground=1"
      width="100%"
      height="100%"
      title="Product/Service Suggestion"
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, border: 0, margin: 0 }}
    />
  );
}
