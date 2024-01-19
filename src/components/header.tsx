import Navlink from "./navlink"

export default function Header() {
    return <header className="flex items-center justify-center py-8">
        <nav className="flex items-center justify-center gap-6">
            <Navlink href="/" text="Home"></Navlink>
            <Navlink href="/about" text="About"></Navlink>
        </nav>
    </header>
}