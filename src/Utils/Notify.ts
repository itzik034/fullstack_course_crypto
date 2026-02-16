import { errorExtractor } from "error-extractor";
import iziToast, { IziToastSettings } from "izitoast";
import "izitoast/dist/css/iziToast.css";

class Notify {

    // Create an object for IziToast's settings
    private settings: IziToastSettings = {
        balloon: true,
        transitionIn: 'bounceInUp',
        transitionOut: 'fadeOutDown',
        position: 'topRight'
    };

    // A function to run the IziToast success notification with the message and the settings we set
    public success(message: string): void {
        this.settings.message = message;
        iziToast.success(this.settings);
    }

    // A function to run the IziToast info notification with the message and the settings we set
    public info(message: string): void {
        this.settings.message = message;
        iziToast.info(this.settings);
    }

    // A function to run the IziToast warning notification with the message and the settings we set
    public warning(message: string): void {
        this.settings.message = message;
        iziToast.warning(this.settings);
    }

    // A function to run the IziToast error notification with the message and the settings we set
    public error(error: any): void {
        this.settings.message = errorExtractor.getMessage(error);
        iziToast.error(this.settings);
    }

}

export const notify = new Notify();