import './telegram-post.css';

export default class TelegramPost {

    constructor({data, config, api, readOnly}) {
        this.data = data;
        this.readOnly = readOnly;
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add("telegram-post-wrapper");

        const inputRow = document.createElement("div");
        inputRow.classList.add("telegram-post-input-row");
        this.wrapper.appendChild(inputRow);

        const linkInput = document.createElement('input');
        linkInput.classList.add("telegram-post-input");
        if (this.readOnly) {
            linkInput.hidden = true;
        }
        inputRow.appendChild(linkInput);

        if (this.validate(this.data)) {
            linkInput.value = this.data.channelName + "/" + this.data.messageId;
            this.injectWidget(this.data);
        }

        linkInput.placeholder = "channelName/messageId";
        linkInput.size = 32;
        linkInput.oninput = () => {
            linkInput.value = linkInput.value.trim();
            // 7: 5 symbols - minimum channel name length + 1 symbol slash + 1 symbol minimum messageId
            if (linkInput.value.length < 7) {
                linkInput.classList.add("telegram-post-invalid-input")
            } else if (linkInput.value.length < 64) {
                if (linkInput.value.startsWith("https://t.me/")) {
                    linkInput.value = linkInput.value.replace("https://t.me/", "");
                }
                let postParts = linkInput.value.split("/");
                if (postParts.length === 2) {
                    linkInput.classList.remove("telegram-post-invalid-input")
                    this.injectWidget({
                        channelName: postParts[0],
                        messageId: postParts[1]
                    });
                } else {
                    linkInput.classList.add("telegram-post-invalid-input")
                }
            } else {
                linkInput.classList.add("telegram-post-invalid-input")
            }
        }

        const questionMark = document.createElement("div");
        questionMark.style.borderStyle = "solid";
        questionMark.style.borderWidth = "1px";
        questionMark.style.borderRadius = "100%";
        questionMark.style.borderColor = "#d7e3ec";
        questionMark.style.color = "#d7e3ec";
        questionMark.style.width = "24px";
        questionMark.style.height = "24px";
        questionMark.style.display = "flex";
        questionMark.style.textAlign = "center";
        questionMark.style.justifyContent = "center";
        questionMark.style.alignItems = "center";
        questionMark.style.cursor = "pointer";
        questionMark.style.userSelect = "none";
        questionMark.innerText = "?";
        questionMark.title = "Select post in telegram, press 'Copy link' and paste it here";
        inputRow.appendChild(questionMark);

        return this.wrapper;
    }

    injectWidget(data) {
        let iframeElement = this.wrapper.getElementsByTagName('iframe')[0];
        if (iframeElement) {
            iframeElement.parentNode.removeChild(iframeElement);
        }
        let scriptElement = this.wrapper.getElementsByTagName('script')[0];
        if (scriptElement) {
            scriptElement.parentNode.removeChild(scriptElement);
        }
        let widgetScript = document.createElement("script");
        widgetScript.setAttribute("async", "");
        widgetScript.setAttribute("src", "https://telegram.org/js/telegram-widget.js?21");
        widgetScript.setAttribute("data-telegram-post", `${data.channelName}/${data.messageId}`);
        widgetScript.setAttribute("data-width", "100%");
        this.wrapper.appendChild(widgetScript);
    }

    save(blockContent) {
        let postParts = blockContent.querySelector('input').value.split("/");
        let channelName = postParts[0];
        let messageId = Number.parseInt(postParts[1]);
        return {
            channelName: channelName,
            messageId: messageId
        }
    }

    static get toolbox() {
        return {
            title: 'Telegram post',
            icon: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="17px" height="17px"><path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375\tc0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219\tc-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966\tc0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693\tc0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351\tc0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"/></svg>'
        };
    }

    validate(savedData) {
        if (savedData.channelName === undefined) {
            console.warn("Validation error: channelName undefined");
            return false;
        }
        if (savedData.channelName === null) {
            console.warn("Validation error: channelName null");
            return false;
        }
        if (savedData.channelName.trim().length < 5) {
            console.warn("Validation error: channelName length less than 5");
            return false;
        }
        if (savedData.channelName.trim().length > 64) {
            console.warn("Validation error: channelName length more than 64");
            return false;
        }

        if (savedData.messageId === undefined) {
            console.warn("Validation error: messageId undefined");
            return false;
        }
        if (savedData.messageId === null) {
            console.warn("Validation error: messageId null");
            return false;
        }
        try {
            Number.parseInt(savedData.messageId);
        } catch (e) {
            console.log("Validation error: messageId is not a number")
            return false;
        }
        if (savedData.messageId < 0) {
            console.log("Validation error: messageId less than 0")
            return false;
        }
        if (savedData.messageId > 10000000) {
            console.log("Validation error: messageId more than 10000000")
            return false;
        }

        return true;
    }

    static get isReadOnlySupported() {
        return true;
    }
}