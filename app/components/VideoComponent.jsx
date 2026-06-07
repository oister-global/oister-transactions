import ComponentWrapper from "./ComponentWrapper";

export default function VideoComponent({ videoLink }) {
  const src = typeof videoLink === "string" ? videoLink.trim() : "";
  if (!src) return null;

  return (
    <ComponentWrapper>
      <div className="w-full aspect-video">
        <iframe
          className="h-full w-full"
          src={src}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </ComponentWrapper>
  );
}
