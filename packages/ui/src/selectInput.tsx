interface SelectInputProps {
    label: string;
    options: {
        key: string;
        value: string;
    }[];
    onSelect: (value: string) => void;
}

export const SelectInput = ({ label, options, onSelect }: SelectInputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="capitalize text-base text-blue-600 font-semibold">{label}</label>
            <select name={label} id={label} onChange={(e) => onSelect(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md border-slate-700 p-2 focus:border-blue-500 outline-none cursor-pointer">
                {options.map(option => (
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))}
            </select>
        </div>
    );
};
