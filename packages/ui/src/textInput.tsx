"use client";

interface TextInputProps {
    type: string;
    placeholder: string;
    label: string;
    onChange: (value: string) => void;
}

export const TextInput = ({ type, placeholder, label, onChange }: TextInputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="capitalize text-base text-blue-600 font-semibold">{label}</label>
            <input
                type={type}
                id={label}
                name={label}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md border-slate-700 p-2 focus:border-blue-500 outline-none"
            />
        </div>
    );
};
