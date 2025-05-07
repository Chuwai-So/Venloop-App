import BackButton from "@/app/Component/BackButton";
import AccountDropdown from "@/app/Component/AccountDropdown";

export default function NavBar({backTo}) {
    return (
        <header className="bg-[#1F2A60] shadow-md px-6 py-4 flex justify-between items-center z-30 relative">
            <BackButton to={backTo}/>
            <img src="/Avond4daagse_diapositief.png" alt="Logo" className="h-7" />
            <AccountDropdown/>
        </header>
    );
}
