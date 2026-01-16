import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Routing } from "../Routing/Routing";
import "./Layout.css";
import backgroundImage from "../../../assets/img/background.png";
import { useState } from "react";

export function Layout() {
    
    const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
    
    return (
        <div className="Layout">

            <header><Header /></header>

            <ParallaxProvider scrollContainer={scrollEl || undefined}>

                <main ref={setScrollEl}>

                    <div className="parallaxViewport">
                        <Parallax speed={-50}>
                            <img src={backgroundImage}  className="parallaxImg" />
                        </Parallax>

                        <div className="parallaxOverlay">
                            <h2>Crypto Market</h2>
                        </div>
                    </div>

                    <div className="mainContent">
                        <Routing />
                    </div>

                </main>

            </ParallaxProvider>

            <footer><Footer /></footer>

        </div>
    );
}
