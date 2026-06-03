import Image from "next/image";

// Styling for CMS HTML injected via dangerouslySetInnerHTML. Tailwind's base
// reset strips list bullets/indentation, so restore them with arbitrary variants.
// Use native list display (not flex) so nested <ul>/<ol> indent correctly.
const RICH_HTML =
  "text-sm leading-relaxed text-[#696C7A] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1 [&_li]:marker:text-[#696C7A]";

// `bullets` may arrive as an HTML string (rich CMS content, possibly with nested
// lists/paragraphs) or as a plain array of strings. Normalize to one HTML string.
function bulletsToHtml(bullets) {
  if (Array.isArray(bullets)) {
    return bullets.length
      ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
      : "";
  }
  return typeof bullets === "string" ? bullets.trim() : "";
}

function LeaderAvatar({ image, name, className = "" }) {
  return (
    <div className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e8b5] sm:h-24 sm:w-24 ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale"
          sizes="96px"
        />
      ) : (
        <span className="text-lg font-semibold text-[#4a5c2a] sm:text-xl">
          {name.split(" ").map((n) => n.charAt(0).toUpperCase()).join("").slice(0, 2)}
        </span>
      )}
    </div>
  );
}

export default function LeadershipTeam({ team, seniorLeadership }) {
  const members = Array.isArray(team) ? team : [];
  const seniorHtml = typeof seniorLeadership === "string" ? seniorLeadership.trim() : "";
  if (members.length === 0 && !seniorHtml) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">KEY MANAGEMENT TEAM</h2>
        {members.length > 0 && (
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {members.map(({ name, title, bullets, image }) => {
            const bulletsHtml = bulletsToHtml(bullets);
            return (
            <div key={name} className="py-6 first:pt-0 last:pb-0">
              {/* Mobile: avatar + name in row, bullets below full-width */}
              <div className="sm:hidden flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <LeaderAvatar image={image} name={name} />
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-[#28283B]">{name}</p>
                    <p className="text-sm text-[#696C7A]">{title}</p>
                  </div>
                </div>
                {bulletsHtml && (
                  <div
                    className={RICH_HTML}
                    dangerouslySetInnerHTML={{ __html: bulletsHtml }}
                  />
                )}
              </div>
              {/* Desktop: flex side-by-side */}
              <div className="hidden sm:flex gap-5">
                <LeaderAvatar image={image} name={name} />
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-base font-semibold text-[#28283B]">{name}</p>
                    <p className="text-sm text-[#696C7A]">{title}</p>
                  </div>
                  {bulletsHtml && (
                    <div
                      className={RICH_HTML}
                      dangerouslySetInnerHTML={{ __html: bulletsHtml }}
                    />
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
        )}
        {seniorHtml && (
          <div className="flex flex-col gap-2 border-t border-[#e8eaef] pt-6">
            <p className="text-base font-semibold text-[#28283B]">Senior Leadership Team</p>
            <div
              className={`flex flex-col gap-2 ${RICH_HTML}`}
              dangerouslySetInnerHTML={{ __html: seniorHtml }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
