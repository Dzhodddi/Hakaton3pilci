import '../styles/header.css'

export default function Header({ handler, isLogged }: { handler: () => void, isLogged: boolean }) {
    let button;

    if (isLogged) {
        button = <button onClick={handler}>Log out</button>;
    }
    else {
        button = <button onClick={handler}>Log in</button>;
    }

    return(
        <>
            <div className="header">
                <p>Created for workers by workers</p>
                <img className="logo" src="./logo_dark.png"></img>
                {button}
            </div>
        </>
    );
}