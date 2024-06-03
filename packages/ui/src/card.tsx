interface CardProps {
    title: string;
    children?: React.ReactNode
}

export const Card = ({ title, children }: CardProps): JSX.Element => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl border-b text-slate-600 pb-2 font-semibold">{title}</h1>
            {children}
        </div>
    )
}