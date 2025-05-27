const settingsInfo = [
    {
        title: "Team deletion",
        description: "Deletes all existing teams from the system."
    },
    {
        title: "Task deletion",
        description: "Removes all existing tasks from the system."
    },
    {
        title: "Team picture deletion",
        description: "Deletes all submitted team pictures.",
        note: "Team name must be entered to proceed."
    },
    {
        title: "Deletion timeframe",
        description: "Set a timeframe (max. 30 days) after which all user-submitted data will be deleted.",
        note: "Input amount of Days"
    },
    {
        title: "Restart event",
        description: "Fully resets the event by deleting all user tokens and submitted data.",
        note: "Join QR codes will become invalid."
    }
];

export default function SettingsInfoDropdown() {
    return (
        <div className="absolute top-full right-6 mt-2 bg-white text-black rounded-2xl shadow-xl p-5 w-80 z-40 text-sm leading-relaxed">
            <h3 className="font-bold text-base mb-3 border-b pb-2">Settings Overview</h3>

            <div className="space-y-3">
                {settingsInfo.map(({ title, description, note }, index) => (
                    <div key={index}>
                        <div>
                            <span className="font-semibold">{title}:</span>{" "}
                            {description}
                        </div>
                        {note && (
                            <div className="italic text-gray-600">{note}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
