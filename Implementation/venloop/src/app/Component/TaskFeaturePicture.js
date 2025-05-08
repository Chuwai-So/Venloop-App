import { useRef } from "react";

export default function TaskFeaturePicture({ file, onChange }) {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            console.log("File selected:", selected.constructor.name); // Should be "File"
            onChange(selected);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <label className="text-md text-gray-600 mb-2">Upload Picture</label>

            <div
                className="w-40 h-40 bg-gray-200 bg-opacity-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
                onClick={handleClick}
            >
                {file ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <span className="text-sm text-gray-500">Click to upload</span>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}
