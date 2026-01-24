export class ResponseModel {
    public static response: string = `
        <div class="response-container">
            <div class="response-header">
                <span class="response-title-text">Recommendation: </span>
                <h2 class="response-title <Buy/Sell/Hold/Something else>">
                    <Buy | Sell | Hold | Something else>
                </h2>
            </div>
            <div class="response-body">
                <span class="response-body-text">Reason: </span>
                <p class="response-text">
                    Your reson...
                </p>
            </div>
        </div>
    `;
}