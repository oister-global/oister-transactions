import ComponentWrapper from "./ComponentWrapper";

export default function VideoComponent({ videoLink }) {
  return (
    <ComponentWrapper>
      <div className="w-full aspect-video">
        <iframe
          className="h-full w-full"
          src={videoLink}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </ComponentWrapper>
  );
}
