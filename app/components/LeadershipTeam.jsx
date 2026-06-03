import Image from "next/image";

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

export default function LeadershipTeam({ team }) {
  const members = Array.isArray(team) ? team : [];
  if (members.length === 0) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">KEY MANAGEMENT TEAM</h2>
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {members.map(({ name, title, bullets, image }) => (
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
                <ul className="list-disc pl-5 space-y-1">
                  {(bullets || []).map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-[#696C7A]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Desktop: flex side-by-side */}
              <div className="hidden sm:flex gap-5">
                <LeaderAvatar image={image} name={name} />
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-base font-semibold text-[#28283B]">{name}</p>
                    <p className="text-sm text-[#696C7A]">{title}</p>
                  </div>
                  <ul className="flex flex-col gap-1 pl-4">
                    {(bullets || []).map((b) => (
                      <li key={b} className="list-disc text-sm leading-relaxed text-[#696C7A]">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
