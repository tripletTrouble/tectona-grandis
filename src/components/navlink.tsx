type Props = {
    href: string
    text: string
}

export default function Navlink({href, text} : Props) {
    return <a href={href} className="font-semibold">{text}</a>
}