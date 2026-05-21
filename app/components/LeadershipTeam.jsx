import Image from "next/image";

const LEADERSHIP = [
  {
    name: "Shantanu Deshpande",
    title: "Founder & CEO",
    experience: "Ex Mckinsey.",
    education: "MBA, IIM Lucknow",
  },
  {
    name: "Deepak Gupta",
    title: "Co-founder & COO",
    experience: "Ex Colgate Palmolive and Ashok Leyland.",
    education: "MBA, IIT Bombay",
  },
];

function LeaderAvatar({ image, alt, name }) {
  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e8b5] sm:h-24 sm:w-24">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover grayscale"
          sizes="96px"
        />
      ) : (
        <span className="text-lg font-semibold text-[#4a5c2a] sm:text-xl">
          {name.split(" ").map((n) => n.charAt(0).toUpperCase()).join("")?.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

export default function LeadershipTeam() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {LEADERSHIP.map(({ name, title, experience, education, initials, image }) => (
        <div
          key={name}
          className="flex items-center gap-4 rounded-lg border border-[#d0d4de] bg-white p-4 shadow-[0_2px_8px_rgba(40,40,59,0.08)] sm:gap-5 sm:p-5"
        >
          <LeaderAvatar image={image} alt={name} initials={initials} name={name} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="text-base font-semibold leading-snug text-[#28283B]">
              {name}
            </p>
            <p className="text-sm leading-snug text-[#696C7A]">{title}</p>
            <p className="text-sm leading-snug text-[#696C7A]">{experience}</p>
            <p className="text-sm leading-snug text-[#696C7A]">
              <span className="font-semibold text-[#28283B]">Education:</span>{" "}
              {education}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
