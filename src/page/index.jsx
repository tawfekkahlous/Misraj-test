import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <p className="text-slate-800 dark:text-white md:text-[25px] text-[18px] p-[25px]">
        {" "}
        First step in Islam is to say SHAHADA. Let&apos;s start with english.{" "}
      </p>
      <Link
        className=" bg-blue-900 w-[120px] text-center py-2 px-2 my-4 rounded-[12px] text-white"
        to={"/shahada"}
      >
        {" "}
        Let&apos;s start{" "}
      </Link>
    </div>
  );
};

export default Hello;
