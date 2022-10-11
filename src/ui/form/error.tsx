
export interface FormErrorProps {
    error?: string | string[];
}

export function FormError({ error }: FormErrorProps) {
    const errors = typeof error === 'string' ? [error] : error;
    if (!errors || errors.length === 0) {
        return <></>;
    }
    return (<>{errors.map(error => (<div className="text-red-500 font-bold block">{error}</div>))}</>);
}