class appHeader extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const globalStyle = document.createElement("link");
        globalStyle.rel = "stylesheet";
        globalStyle.href = "../style/styles.css";
        this.shadowRoot.appendChild(globalStyle);

        this.shadowRoot.innerHTML = `
        <style>
            header {
                background: #4A90E2;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 20px;
                font-size: 1.5rem;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .title {
                flex-grow: 1;
            }

            .search-note {
                flex-grow: 1;
                display: flex;
                justify-content: flex-end;
            }
        </style>
        <header>
            <div class="title">Notes App</div>
            <search-note></search-note>
            <button id="toggle-archive">Show Archived</button>
        </header>
        `;

        this.shadowRoot.querySelector("#toggle-archive").addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent("toggle-archive"));
        });
    }
}
customElements.define('app-header', appHeader);