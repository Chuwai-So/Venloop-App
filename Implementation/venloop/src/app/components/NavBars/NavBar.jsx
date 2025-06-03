import BackButton from "@/app/components/Buttons/BackButton";
import AccountDropdown from "@/app/components/Dropdowns/AccountDropdown";
import {useState} from "react";
import SettingsInfoDropdown from "@/app/components/Dropdowns/SettingInfoDropdown";
import Icon from "@/app/components/Icon";


export default function NavBar({backTo, showInfoButton = false}) {
    const [showInfoTab, setShowInfoTab] = useState(false);

    const toggleInfoTab = () => {
        setShowInfoTab(!showInfoTab);
    };

    return (
        <header className="bg-[#1F2A60] shadow-md px-6 py-4 flex justify-between items-center z-30 relative">
            <BackButton to={backTo}/>
            <img src="/Avond4daagse_diapositief.png" alt="Logo" className="h-7"/>
            {showInfoButton ? (
                <>
                    <button
                        onClick={toggleInfoTab}>
                        <Icon name={"info-white"}/>
                    </button>
                    {showInfoTab && <SettingsInfoDropdown/>}
                </>
            ) : (
                <AccountDropdown/>
            )}
        </header>
    );
}
