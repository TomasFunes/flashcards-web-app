import { useState } from "react"

interface headerProps {
    onSection: (section: string) => void
}

export function Header({ onSection }: headerProps) {
    const [activeBtn, setActiveBtn] = useState("learn");

    function handleSectionChange(section: string) {
        setActiveBtn(section);
        onSection(section);
    }

    return (
        <header role="header" className="bg-white md:flex md:justify-between items-center border-b-2">
            <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
            <nav>
            <ul className="flex justify-between ">
                <li className={((activeBtn == "learn") ? "active-tab " : "") + "header-tab"}>
                    <button className="w-full h-full pb-4" onClick={() => handleSectionChange("learn")}>Learn</button>
                </li>
                <li className={((activeBtn == "cards") ? "active-tab " : "") + "header-tab"}>
                    <button className="w-full h-full pb-4" onClick={() => handleSectionChange("cards")}>My cards</button>
                </li>
                <li className={((activeBtn == "help") ? "active-tab " : "") + "header-tab"}>
                    <button className="w-full h-full pb-4" onClick={() => handleSectionChange("help")}>How to use</button>
                </li>
            </ul>
            </nav>
        </header>
    )
}