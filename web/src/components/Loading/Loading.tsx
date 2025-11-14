import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
    return (
        <div className="min-h-screen transition-none bg-[#FAFAFA] dark:bg-[#1a1a1a] flex items-center justify-center">
            <div className="transition-none text-gray-600 dark:text-gray-400 w-100 h-30 outline-2 outline-black dark:outline-white rounded-2xl flex items-center justify-center"><PacmanLoader color="#9379cc" /></div>
        </div>
    )
}