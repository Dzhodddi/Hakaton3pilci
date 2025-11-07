type Button = {
    placeholder: string;
    onClick: () => void;
}

export function Button({ placeholder, onClick }: Button) {
    return (
        <>
            <button onClick={onClick}>{ placeholder }</button>
        </>
    );
}