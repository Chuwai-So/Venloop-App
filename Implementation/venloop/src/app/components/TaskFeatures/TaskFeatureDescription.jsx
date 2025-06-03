export default function TaskFeatureDescription({ value, onChange }) {
    return (
        <div className="my-2 text-black">
            <textarea
                placeholder="Add Description..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border p-2 rounded text-black bg-white"
            />
        </div>
    );
}
