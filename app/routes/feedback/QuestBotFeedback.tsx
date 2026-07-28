import { useEffect } from "react";

export function meta() {
  return [
    { title: "Quest Bot Feedback | Vantern" },
    { name: "description", content: "Share your feedback on Quest Bot to help us improve." },
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
      data-tally-src="https://tally.so/r/ZjXNKv"
      width="100%"
      height="100%"
      title="Quest Bot Feedback"
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, border: 0, margin: 0 }}
    />
  );
}
