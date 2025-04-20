class appFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const globalStyle = document.createElement("link");
        globalStyle.rel = "stylesheet";
        globalStyle.href = "../style/styles.css";
        this.shadowRoot.appendChild(globalStyle);
        
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            footer {
                color: #333;
                text-align: center;
                padding: 10px;
                font-size: 0.9rem;
                margin-top: 20px;
            }
        </style>
        <footer>&copy; 2025 Notes App - faldiix. Hak Cipta Dilindungi</footer>
        `;
    }
}
customElements.define('app-footer', appFooter);