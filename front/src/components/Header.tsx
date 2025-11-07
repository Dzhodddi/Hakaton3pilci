import { Button } from '../components/Button'

export default function Header({ handler, isLogged }: { handler: () => void, isLogged: boolean }) {
    let button;

    if (isLogged) {
        button = <Button placeholder="Exit" onClick={handler} />;
    }
    else {
        button = <Button placeholder="Log in" onClick={handler} />;
    }

    return(
        <>
            <div className="header">
                <p>Created for workers by workers</p>
                <img className="logo" src="./logo.png"></img>
                {button}
            </div>
        </>
    );
}