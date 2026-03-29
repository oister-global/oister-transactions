import { StarIcon } from "../../public/svg";

const defaultListData = [
  "Founded in 2017 in an IIT incubation centre, Agnikul is India’s first ‘space launch company’ which is privately-held.",
  "Agnikul takes pride in being the world’s first company that manufactures a 3D-printed semi-cryogenic engine (something even NASA doesn’t do yet).",
  "⁠They conducted their first successful pilot launch of ‘Agnibaan’ in May 2024.",
  "The company has ⁠INR 150–200 Cr in proprietary IP/assets (3D printers, mobile launchpad).",
  "⁠Backed by IN-SPACe (Govt), global interest from EU & MENA. Other renowned investors include Anand Mahindra, Nithin Kamath, Naval Ravikant and VC funds such as Celesta, Mayfield, pi Ventures and Speciale Invest.",
  "The first commercial launch for Agnikul is expected to happen in October 2025, post which, the company plans as much as 25 launches annually.",
  "The Global space-tech market is expected to be INR 1.3 Lakh Cr in size by 2039 and Agnikul is expected to be one of the biggest contributors to that growth",
  "Agnikul takes pride in being the world’s first company that manufactures a 3D-printed semi-cryogenic engine (something even NASA doesn’t do yet).",
  "⁠They conducted their first successful pilot launch of ‘Agnibaan’ in May 2024.",
  "The company has ⁠INR 150–200 Cr in proprietary IP/assets (3D printers, mobile launchpad).",
  "⁠Backed by IN-SPACe (Govt), global interest from EU & MENA. Other renowned investors include Anand Mahindra, Nithin Kamath, Naval Ravikant and VC funds such as Celesta, Mayfield, pi Ventures and Speciale Invest.",
  "The first commercial launch for Agnikul is expected to happen in October 2025, post which, the company plans as much as 25 launches annually.",
  "The Global space-tech market is expected to be INR 1.3 Lakh Cr in size by 2039 and Agnikul is expected to be one of the biggest contributors to that growth",
];

const CustomList = ({
  listData = defaultListData,
}: {
  listData?: string[];
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {listData.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="text-[14px]">
            <StarIcon />
          </span>
          <span className="text-base font-normal leading-[1.55] text-[#696C7A]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CustomList;
