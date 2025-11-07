import { Button } from '../components/Button'

export default function Header({ handler }: { handler: () => void }) {
    return(
        <>
            <div className="header">
                <p>Created for workers by workers</p>
                <img className="logo" src="./logo.png"></img>
                <Button placeholder="Log in" onClick={handler} />
            </div>
        </>
    );
}