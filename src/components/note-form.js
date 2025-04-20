class noteForm extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        const globalStyle = document.createElement("link");
        globalStyle.rel = "stylesheet";
        globalStyle.href = "../style/styles.css";
        this.shadowRoot.appendChild(globalStyle);
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
                font-family: sans-serif;      
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 15px;
                background: #FFFFFF;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                margin: auto;
            }

            h2 {
                text-align: center;
                color: #1B1B32;
            }

            .input-notes {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            label {
                font-size: 14px;
                font-weight: bold;
                color: #1B1B32;
            }
            
            input, textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #1B1B32;
                border-radius: 5px;
                font-size: 14px;
                transition: border 0.3s ease-in-out;
            }

            input:focus, textarea:focus {
                border-color: #4A90E2;
                outline: none;
            }
            
            textarea {
                height: 100px;
                resize: none;
            }

            button {
                background: #4A90E2;
                color: white;
                padding: 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: background 0.3s ease-in-out;
            }

            button:hover {
                background: #1B1B32;
            }

            button:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
        </style>

        <form id="noteform">
            <h2>Add new note</h2>
            <section class="input-notes">
                <label for="notetitle">Note Title</label>
                <input type="text" id="notetitle" placeholder="Enter a note title" required />
                <label for="notebody">Note Content</label>
                <textarea id="notebody" placeholder="Fill in the notes" required></textarea>
            </section>
            <button id="save-btn" type="submit" disabled>Save</button>
        </form>
        `;
    }

    addEventListeners() {
        const titleInput = this.shadowRoot.querySelector("#notetitle");
        const bodyInput = this.shadowRoot.querySelector("#notebody");
        const saveButton = this.shadowRoot.querySelector("#save-btn");
        const form = this.shadowRoot.querySelector("#noteform");

        const validateForm = () => {
            saveButton.disabled = !titleInput.value.trim() || !bodyInput.value.trim();
        };

        titleInput.addEventListener("input", validateForm);
        bodyInput.addEventListener("input", validateForm);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const noteTitle = titleInput.value.trim();
            const noteBody = bodyInput.value.trim();

            if (!noteTitle || !noteBody) return;
            
            document.dispatchEvent(new CustomEvent("add-note", { detail: { title: noteTitle, body: noteBody } }));

            titleInput.value = "";
            bodyInput.value = "";
            validateForm();
        });
        validateForm();
    }
}
customElements.define('note-form', noteForm);