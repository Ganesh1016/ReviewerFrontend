export function WordCloud() {
  const words = [
    { text: "excellent service", value: 64 },
    { text: "friendly staff", value: 55 },
    { text: "great product", value: 41 },
    { text: "fast delivery", value: 38 },
    { text: "helpful", value: 35 },
    { text: "professional", value: 32 },
    { text: "quality", value: 28 },
    { text: "recommended", value: 25 },
    // Add more words as needed
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {words.map((word) => (
        <span
          key={word.text}
          className="rounded-full bg-[#4562d9]/10 px-3 py-1 text-sm text-[#4562d9]"
          style={{
            fontSize: `${Math.max(0.8, word.value / 32)}rem`,
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}
