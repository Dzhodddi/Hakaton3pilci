

export function Step({index, placeholder, active}: {index: number, placeholder: string, active: boolean}) {
    
    return (
        <>
            <div className="stepIndex">{index}</div>
            <div className="stepName">{placeholder}</div>
        </>
    );
}