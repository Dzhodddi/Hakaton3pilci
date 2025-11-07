type ComponentType = {
    placeholder: string;
}

export function PromptInput({ placeholder }: ComponentType) {
    return (
        <>
            <input></input>
            <p>{ placeholder }</p>
        </>
    );
}

export function Button({ placeholder }: ComponentType) {
    return (
        <>
            <button>{ placeholder }</button>
        </>
    );
}