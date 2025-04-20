class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.render();
    }

    render() {
        const id = this.getAttribute("data-id");
        const title = this.getAttribute("data-title");
        const body = this.getAttribute("data-body");
        const createdAt =this.getAttribute("data-createdAt");
            
        this.shadowRoot.innerHTML = `
        <style>
            .note-item {
                background: #f9f9f9;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin-bottom: 20px;
                transition: 0.3s;
            }
                
            .note-item:hover {
                box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            }
                    
            .note-action {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
                        
            .edit-btn, .delete-btn {
                background-color: #4A90E2;
                color: #FFFFFF;
                padding: 8px;
                border-radius: 6px;
                font-size: 14px;
                cursor: pointer;
                transtion: background-color 0.3s ease;
            }
                    
            .edit-btn:hover {
                background-color: #357ABD;
            }
                
            .delete-btn:hover {
                background-color: #D9534F;
            }
                    
            .createdAt {
                font-size: 0.8em;
                color: #888;
                margin-top: 5px;
            }
            </style>
            <div class="note-item">
            <h3>${title}</h3>
            <p>${body}</p>
            <div class="createdAt">Created: ${new Date(createdAt).toLocaleString()}</div>
                <div class="note-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
            </div>
            <div class="edit-form" style="display: none;">
                <input type="text" class="edit-title" value="${title}" />
                <textarea class="edit-body">${body}</textarea>
                <button class="save-btn">Save</button>
            </div>
        </div>
        `;

        this.shadowRoot.querySelector(".edit-btn").addEventListener("click", () => this.showEditForm());
        this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => this.deleteNote(id));
        this.shadowRoot.querySelector(".save-btn").addEventListener("click", () => this.saveEdit(id));
    }

    showEditForm() {
        const editForm = this.shadowRoot.querySelector(".edit-form");
        editForm.style.display = editForm.style.display === "none" ? "block" : "none";
    }

    deleteNote(id) {
        const event = new CustomEvent("delete-note", { detail: { id } });
        document.dispatchEvent(event);
    }

    saveEdit(id) {
        const newTitle = this.shadowRoot.querySelector(".edit-title").value.trim();
        const newBody = this.shadowRoot.querySelector(".edit-body").value.trim();

        if (!newTitle || !newBody) {
            alert("Judul dan isi catatan tidak boleh kosong!");
            return;
        }
            
        const event = new CustomEvent("edit-note", { detail: { id, newTitle, newBody} });
        document.dispatchEvent(event);

        alert("Catatan berhasil diperbaharui!");
        this.showEditForm();
    }
}
customElements.define("note-item", NoteItem);