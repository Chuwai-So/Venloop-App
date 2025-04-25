export default function TaskFeatureInput({ value, onChange }) {
    return (
        <div className="p-2 border rounded bg-white w-full text-center">
            <input
                type="text"
                placeholder="Input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 text-center border border-gray-300 rounded"
            />
        </div>
    );
}
