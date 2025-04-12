"use client";


export default function GridButtons() {
    return (
        <main className="p-8 grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100vh-72px)] font-[Nunito] font-black">

            <button className="bg-[#4CA6E5] text-white rounded-lg p-6 row-span-2 flex items-center justify-center text-xl">
                Create Tasks
            </button>


            <button className="bg-[#F25C05] text-white rounded-lg p-4 flex items-center justify-center text-lg">
                Settings
            </button>


            <button className="bg-[#F5C958] text-white rounded-lg p-4 flex items-center justify-center text-lg">
                Help
            </button>


            <button className="bg-[#332E1F] text-white rounded-lg p-6 row-span-2 flex items-center justify-center text-xl">
                Create Teams
            </button>
        </main>
    );
}

