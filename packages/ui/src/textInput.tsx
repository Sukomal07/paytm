"use client";

interface TextInputProps {
    placeholder: string;
    label: string;
    onChange: (value: string) => void;
}

export const TextInput = ({ placeholder, label, onChange }: TextInputProps) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input
                type="text"
                id={label}
                name={label}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
