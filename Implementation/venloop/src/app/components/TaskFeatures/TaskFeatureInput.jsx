export default function TaskFeatureInput({ value, onChange, disabled = false }) {
    return (
        <div
            className={`p-2 border rounded w-full text-center text-black bg-white ${
                disabled ? "opacity-50 pointer-events-none" : ""
            }`}
        >
            <input
                type="text"
                placeholder="Input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 text-center border border-gray-300 rounded text-black"
                disabled={disabled}
            />
        </div>
    );
}
