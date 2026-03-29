import ComponentWrapper from "./ComponentWrapper";

export default function VideoComponent() {
  return (
    <ComponentWrapper>
      <div className="w-full aspect-video">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/ANg0l73c1Ck"
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </ComponentWrapper>
  );
}
