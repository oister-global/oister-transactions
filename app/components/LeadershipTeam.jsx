import Image from "next/image";

const LEADERSHIP = [
  {
    name: "Shantanu Deshpande",
    title: "Founder and CEO",
    bullets: [
      "More than 13 years of experience in Consulting & FMCG",
      "He is also an advisor to Advent International where he helps them with consumer investments & portfolio and McKinsey where he helps on topics related to digital commerce & consumer",
      "Ex- Engagement Manager at McKinsey",
      "Educational Background: IIM Lucknow (Batch of 2011); B.Tech, Visvesvaraya National Institute of Technology, Nagpur (Batch of 2009)",
    ],
  },
  {
    name: "Deepak Gupta",
    title: "Co-founder & COO",
    bullets: [
      "More than 17 years of experience in FMCG & Consumer businesses",
      "Prior to BSC, Spent 8+ years at Colgate Palmolive & 2 years at Ashok Leyland",
      "Educational Background: MBA, SJMSOM, IIT Bombay (Batch of 2010); B.E., Punjab Engineering College (Batch of 2006)",
    ],
  },
];

function LeaderAvatar({ image, name }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e8b5] sm:h-24 sm:w-24">
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

export default function LeadershipTeam() {
  return (
    <section className="card-wrapper">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">KEY MANAGEMENT TEAM</h2>
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {LEADERSHIP.map(({ name, title, bullets, image }) => (
            <div key={name} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <LeaderAvatar image={image} name={name} />
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-base font-semibold text-[#28283B]">{name}</p>
                  <p className="text-sm text-[#696C7A]">{title}</p>
                </div>
                <ul className="flex flex-col gap-1 pl-4">
                  {bullets.map((b) => (
                    <li key={b} className="list-disc text-sm leading-relaxed text-[#696C7A]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-[#e8eaef] pt-6">
          <p className="text-base font-semibold text-[#28283B]">Senior Leadership Team</p>
          <p className="text-sm leading-relaxed text-[#696C7A]">
            Shantanu & Deepak are supported by a very stellar & entrepreneurial second layer of
            management team, who are the primary owners of various business segments and verticals
          </p>
          <ul className="flex flex-col gap-1 pl-4">
            <li className="list-disc text-sm leading-relaxed text-[#696C7A]">
              All the senior management team comes with <span className="font-semibold text-[#28283B]">10-20+ years of industry experience</span>
            </li>
            <li className="list-disc text-sm leading-relaxed text-[#696C7A]">
              The senior management team comes from leading organizations in FMCG & consulting such as{" "}
              <span className="font-semibold text-[#28283B]">Bain, Unilever, Colgate, Marico, Pepsico, RPSG Group</span> amongst others
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
