export default class HTMLRender {
    constructor(options) {
        this.tag = options.tag;
        this.class = options.class;
        this.text = options.text;
        this.type = options.type;
        this.value = options.value;
        this.readonly = options.readonly;
        this.checked = options.checked;
        this.action = options.action;
        this.dataKey = options.dataKey;
    }

    createElement() {
        let element = document.createElement(this.tag);

        if (this.type) {
            element.setAttribute("type", this.type);
        }

        if (this.readonly) {
            element.setAttribute("readonly", this.readonly);
        }

        if (this.checked) {
            element.setAttribute("checked", this.checked);
        }

        if (this.class) {
            element.setAttribute("class", this.class);
        }

        if (this.action) {
            element.setAttribute("action", this.action);
        }

        if (this.value) {
            element.setAttribute('value', this.value)
        }

        if (this.dataKey) {
            element.setAttribute('data-key', this.dataKey)
        }

        if (this.text) {
            element.innerHTML = this.text;
        }

        return element;
    }
}