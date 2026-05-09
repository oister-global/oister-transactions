import { StarIcon } from "../../public/svg";
import { trimHTML } from "../lib/htmlConversion";

const CustomList = ({ listData }) => {
  return (
    <ul className="flex flex-col gap-3">
      {listData?.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="text-[14px]">
            <StarIcon />
          </span>
          <span className="text-base font-normal leading-[1.55] text-[#696C7A]">
            {trimHTML(item)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CustomList;
