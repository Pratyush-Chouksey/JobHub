import { cn } from '../../utils/cn';

const Input = ({ label, error, className, id, ...props }) => {
    return (
        <div className="relative">
            <input
                id={id}
                className={cn(
                    "peer block w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 pb-3 pt-5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder-transparent",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    className
                )}
                placeholder={label}
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-75 text-xs text-slate-400 transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-blue-500"
            >
                {label}
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
