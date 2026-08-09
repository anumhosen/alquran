import { Link } from "react-router-dom";
import useSidebarStore from "../store/useSidebarStore";
import { FaBookOpen, FaHouse, FaBookmark } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const Navigation = () => {
    const toggleLeft = useSidebarStore((s) => s.toggleLeft);

    return (
        <div className="p-5">
            <h2 className="flex flex-col items-center font-[AnekBangla] text-2xl italic py-4 text-center font-bold mb-4 bg-emerald-50 dark:bg-gray-800 rounded-xl border border-emerald-500/20 dark:border-gray-700 text-emerald-800 dark:text-emerald-300">
                <img alt="Al Quran" className="w-14 mb-2" src="/icon.png" />
                হিসনুল মুসলিম
            </h2>
            <ul className="space-y-2 text-xl font-[Kalpurush]">
                <li>
                    <Link
                        to="/"
                        className="flex gap-3 items-center px-3 py-2 rounded-xl hover:bg-emerald-200/60 dark:hover:bg-gray-700 transition-colors"
                        onClick={toggleLeft}
                    >
                        <FaHouse className="text-emerald-700 dark:text-emerald-400" />
                        <span className="mt-1">দু'আ সমূহ</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/category"
                        className="flex gap-3 items-center px-3 py-2 rounded-xl hover:bg-emerald-200/60 dark:hover:bg-gray-700 transition-colors"
                        onClick={toggleLeft}
                    >
                        <BiSolidCategory className="text-emerald-700 dark:text-emerald-400" />
                        <span className="mt-1">বিষয়ভিত্তিক দু'আ</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/bookmarks"
                        className="flex gap-3 items-center px-3 py-2 rounded-xl hover:bg-emerald-200/60 dark:hover:bg-gray-700 transition-colors"
                        onClick={toggleLeft}
                    >
                        <FaBookmark className="text-emerald-700 dark:text-emerald-400" />
                        <span className="mt-1">প্রিয় দু'আ (বুকমার্ক)</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/books"
                        className="flex gap-3 items-center px-3 py-2 rounded-xl hover:bg-emerald-200/60 dark:hover:bg-gray-700 transition-colors"
                        onClick={toggleLeft}
                    >
                        <FaBookOpen className="text-emerald-700 dark:text-emerald-400" />
                        <span className="mt-1">গ্রন্থ ও বিবরণ</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className="flex gap-3 items-center px-3 py-2 rounded-xl hover:bg-emerald-200/60 dark:hover:bg-gray-700 transition-colors"
                        onClick={toggleLeft}
                    >
                        <FaInfoCircle className="text-emerald-700 dark:text-emerald-400" />
                        <span className="mt-1">আমাদের সম্পর্কে</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;
