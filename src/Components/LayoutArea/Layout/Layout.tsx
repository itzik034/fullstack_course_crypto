import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";
import backgroundImage from "../../../assets/img/background.png";
import { useState } from "react";

export function Layout() {
    
    // Saving the scrolling element in the Local State
    const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
    
    return (
        <div className="Layout">

            {/* Website header (contains also the menu) */}
            <header><Header /></header>

            {/* A custom parallax background for the website. 
                I'm using a React library (named "react-scroll-parallax") to display it. */}
            <ParallaxProvider scrollContainer={scrollEl || undefined}>

                {/* Set this element to the scroll provider. 
                    It means when the user is scrolling in this element the parallax moving. */}
                <main ref={setScrollEl}>

                    {/* The parallax container */}
                    <div className="parallaxViewport">
                        {/* Parallax image with a little bit of blur ("Layout.css" line 57) */}
                        <Parallax speed={-50}>
                            <img src={backgroundImage}  className="parallaxImg" />
                        </Parallax>

                        {/* Parallax title and background overlay 
                            (with a little bit of color at the background - 
                            ".parallaxViewport::after" block in "Layout.css" line 48) */}
                        <div className="parallaxOverlay">
                            <h2>Crypto Market</h2>
                        </div>
                    </div>

                    {/* Website main content */}
                    <div className="mainContent">
                        <Routing />
                    </div>

                </main>

            </ParallaxProvider>

            {/* Website footer */}
            <footer><Footer /></footer>

        </div>
    );
}
