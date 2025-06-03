export default function Icon({ name, size = "24px", className = "" }) {
    if (!name) {
        console.warn("⚠️ No icon name provided to <Icon />");
        return null;
    }

    const src = `/icons/${name}.svg`;

    return (
        <img
            src={src}
            alt={`${name} icon`}
            style={{ width: size, height: size }}
            className={className}
            onError={(e) => {
                console.warn(`❌ Icon not found: ${src}`);
                e.target.style.display = "none"; // or fallback behavior
            }}
        />
    );
}
