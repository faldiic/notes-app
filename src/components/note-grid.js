class NoteGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.notes = [];
    }

    connectedCallback() {
        this.render();
        document.addEventListener("search-note", (event) => {
            this.filterNotes(event.detail);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 16px;
                padding: 16px;
            }
        </style>
        <div class="grid-container"></div>
        `;
    }

    setNotes(notes) {
        this.notes = notes;
        this.renderNotes();
    }

    renderNotes() {
        const container = this.shadowRoot.querySelector(".grid-container");
        container.innerHTML = "";

        this.notes.forEach(note => {
            const noteItem = document.createElement("note-item");
            noteItem.setAttribute("data-id", note.id);
            noteItem.setAttribute("data-title", note.title);
            noteItem.setAttribute("data-body", note.body);
            noteItem.setAttribute("data-createdAt", note.createdAt);
            noteItem.setAttribute("data-archived", note.archived);
            container.appendChild(noteItem);
        });
    }

    filterNotes(searchValue) {
        if (!searchValue.trim()) {
            this.renderNotes();
            return;
        }

        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(searchValue)
        );

        this.renderFilteredNotes(filteredNotes);
    }

    renderFilteredNotes(notes) {
        const container = this.shadowRoot.querySelector(".grid-container");
        container.innerHTML = "";
        notes.forEach(note => {
            const noteItem = document.createElement("note-item");
            noteItem.setAttribute("data-id", note.id);
            noteItem.setAttribute("data-title", note.title);
            noteItem.setAttribute("data-body", note.body);
            noteItem.setAttribute("data-createdAt", note.createdAt);
            noteItem.setAttribute("data-archived", note.archived);
            container.appendChild(noteItem);
        });
    }
}
customElements.define("note-grid", NoteGrid);