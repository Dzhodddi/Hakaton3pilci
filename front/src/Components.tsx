
export function PromptInput({ placeholder }: { placeholder: string }) {
    return (
        <>
            <input></input>
            <p>{ placeholder }</p>
        </>
    );
}

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