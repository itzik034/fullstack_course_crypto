import "./Spinner.css";
import imageSource from "/src/assets/img/loading.gif";

export function Spinner() {
    return (
        <div className="Spinner">

			<img src={imageSource} />

        </div>
    );
}
