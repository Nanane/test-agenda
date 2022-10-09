interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: 'primary' | 'default' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

// default : 
// primary : block my-4 
// danger  : border-box w-full
const classNames = {
    default: ['text-white','bg-slate-300','hover:bg-slate-800'],
    primary: ['text-white','bg-blue-700','hover:bg-blue-800'],
    danger: ['text-white','bg-red-600','hover:bg-red-700'],
    sm: ['font-medium','rounded-lg','text-sm'],
    md: ['font-medium','rounded-lg','text-md'],
    lg: ['font-medium','rounded-lg','text-lg'],
    xl: ['font-medium','rounded-lg','text-xl'],
}

export default function Button({ className, theme = 'default', size = 'md', children, ...rest }: ButtonProps) {
    const defaultClassNames: string[] = ['text-center', 'p-2'];
    const propsClassNames = (className || '').split(' ');
    const themeClassNames = classNames[theme];
    const sizeClassNames = classNames[size];
    const appliedClassNames = defaultClassNames.concat(themeClassNames).concat(sizeClassNames).concat(propsClassNames);

    return (
        <button
            className={appliedClassNames.join(' ')}
            {...rest}
        >
            {children}
        </button>
    )
}