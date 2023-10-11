import React, { useState } from "react";
import useDarkSide from "./hook/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, SetDarkSide] = useState(colorTheme === "light" ? false : true);

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        SetDarkSide(checked);
    };

    return (
        <>
            <div className="my-12 flex flex-col items-center fixed top-54 right-2">
                <DarkModeSwitch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={56}
                />
            </div>
        </>
    )
}