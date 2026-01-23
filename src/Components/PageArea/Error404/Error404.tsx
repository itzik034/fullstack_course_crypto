import { useEffect } from "react";
import "./Error404.css";
import { useNavigate } from "react-router-dom";

export function Error404() {
    const navigate = useNavigate();

    useEffect(() => {
        
        // Get parallax element
        const parralex = document.getElementsByClassName("parallaxViewport")[0] as HTMLElement;
        
        // Hide parallax (only in 404 page)
        if (parralex) parralex.style.display = "none";

        // Show parallax in other pages
        return () => {
            if (parralex) parralex.style.display = "block";
        };
    }, []);

    return (
        <div className="Error404">
            <div className="content-container">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-description">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <button className="home-button" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}
