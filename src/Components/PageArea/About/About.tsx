import "./About.css";
import Itzik from "/src/assets/img/Itzik.jpg";

export function About() {
    return (
        <div className="About">
            <div className="about-container">
                <section className="project-info">
                    <h1>About Crypto Market</h1>
                    <p className="tagline">Your Ultimate Cryptocurrency Companion</p>
                    <p className="description">
                        Crypto Market is a powerful real-time cryptocurrency tracking application, designed to help you stay ahead of the market.
                        With features like <strong>live coin updates</strong>, <strong>interactive reports</strong>, and <strong>AI-powered recommendations</strong>,
                        Crypto Market makes it easier than ever to analyze trends and make informed decisions.
                    </p>
                </section>

                <div className="divider"></div>

                <section className="developer-info">
                    <h2>Meet the Developer</h2>
                    <div className="developer-card">
                        <div className="image-container">
                            <img
                                src={Itzik}
                                alt="Developer"
                                className="dev-image"
                            />
                        </div>
                        <div className="dev-details">
                            <h3>Itzik Uliel</h3>
                            <span className="role">Full Stack Developer</span>
                            <p>
                                Itzik is a curious developer who enjoys diving deep into logic and 
                                architecture, while also feeling at home in frontend, design, and user experience. 
                                He builds clean, structured systems, seeks to understand the “why” behind things, 
                                and values flow, simplicity, and flexibility. He leaves room for continuous improvement, 
                                both in code and in life.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
