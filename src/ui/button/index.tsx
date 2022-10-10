interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: 'primary' | 'default' | 'danger' | 'ghost';
    htmlType?: 'submit' | 'reset' | 'button'; // rename the HTML type prop
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const classNames = {
    default: ['text-white','bg-slate-300','hover:bg-slate-800'],
    primary: ['text-white','bg-blue-700','hover:bg-blue-800'],
    danger: ['text-white','bg-red-600','hover:bg-red-700'],
    ghost: ['text-black', 'bg-transparent', 'hover:bg-slate-300'],
    sm: ['font-medium','rounded-lg','text-sm'],
    md: ['font-medium','rounded-lg','text-md'],
    lg: ['font-medium','rounded-lg','text-lg'],
    xl: ['font-medium','rounded-lg','text-xl'],
}

export default function Button({ className, type = 'default', size = 'md', children, htmlType, ...rest }: ButtonProps) {
    const defaultClassNames: string[] = ['text-center', 'p-2'];
    const propsClassNames = (className || '').split(' ');
    const typeClassNames = classNames[type];
    const sizeClassNames = classNames[size];
    const appliedClassNames = defaultClassNames.concat(typeClassNames).concat(sizeClassNames).concat(propsClassNames);

    return (
        <button
            className={appliedClassNames.join(' ')}
            type={htmlType}
            {...rest}
        >
            {children}
        </button>
    )
}