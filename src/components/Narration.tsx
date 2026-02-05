interface NarrationProps {
  text: string;
}

export default function Narration({ text }: NarrationProps) {
  const paragraphs = text.split('\n\n').filter((p) => p.trim());

  return (
    <div className="font-body text-ink/90 text-base md:text-lg leading-relaxed my-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-3 last:mb-0">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}
