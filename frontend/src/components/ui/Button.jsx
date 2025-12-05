import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn'; // Logic for clsx + twMerge, will create utility next
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-slate-950',
    {
        variants: {
            variant: {
                primary: 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25',
                secondary: 'bg-slate-800 text-white hover:bg-slate-700 hover:border-slate-600 border border-white/5',
                outline: 'border border-slate-600 bg-transparent text-slate-300 hover:border-slate-400 hover:text-white',
                ghost: 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-white',
                danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20',
            },
            size: {
                sm: 'h-9 px-3',
                md: 'h-11 px-6',
                lg: 'h-14 px-8 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

const Button = ({ className, variant, size, isLoading, children, ...props }) => {
    return (
        <button className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading} {...props}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export { Button, buttonVariants };
