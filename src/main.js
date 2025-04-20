import './components/app-header.js';
import './components/app-footer.js';
import './components/note-form.js';
import './components/note-grid.js';
import './components/note-item.js';
import './style/styles.css';

console.log("main.js loaded");

import { 
    fetchNotes,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    fetchArchivedNotes,
 } from "./components/note-api.js";

    
class SearchNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

     connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .search-container {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }

            input{
                flex-grow: 1;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            button {
                background-color: #4A90E2;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                transition: 0.3s;
            }

            button:hover {
                background-color: #357ABD;
            }
        </style>
        <div class="search-container">
            <input type="text" id="searchTitle" placeholder="Search title note . . ." />
            <button id="searchButton">Search</button>
        </div>
        `;
            
        this.shadowRoot.querySelector("#searchButton").addEventListener("click", () => this.searchNotes());
        this.shadowRoot.querySelector("#searchTitle").addEventListener("input", () => this.searchNotes());
    }
        
    searchNotes() {
        const searchValue = this.shadowRoot.querySelector("#searchTitle").value.toLowerCase();
        document.dispatchEvent(new CustomEvent("search-note", { detail: searchValue }));
    }
}
customElements.define("search-note", SearchNote);
    

document.addEventListener("DOMContentLoaded", async () => {
    const noteTitle = document.getElementById("note-title");
    const noteBody = document.getElementById("note-body");
    const addNoteBtn = document.getElementById("add-note-btn");
    
    // Cek apakah elemen-elemen yang
    if (!noteTitle || !noteBody || !addNoteBtn) {
        console.error("Error: Elemen tidak ditemukan");
        return;
    }

    await customElements.whenDefined("note-grid");
    const noteGrid = document.querySelector("note-grid");   

    if (!noteGrid) {
        console.error("Error: elemen note-grid tidak ditemukan.");
        return;
    }

    
    const loadNotes = async () => {
        try {// Cek apakah elemen note-grid sudah didefinisikan
            const notes = await fetchNotes();
            console.log("Catatan berhasil dimuat:", notes);
            noteGrid.setNotes(notes);
        } catch (error) {// tea
            console.error("Error saat memuat catatan:", error);
        }
    };

    addNoteBtn.addEventListener("click", async () => {
        const title = noteTitle.value.trim();
        const body = noteBody.value.trim();

        if (title && body) {
            try {
                const newNote = await addNote(title, body);
                if (newNote) {
                    noteTitle.value = "";
                    noteBody.value = "";
                    await loadNotes();
                }
            } catch (error) {
                console.error("Error saat menambahkan catatan:", error);
            }
        }
    });

    document.addEventListener("delete-note", async (event) => {
        const { id } = event.detail;
        try {
            const success = await deleteNote(id);
            if (success) {
                await loadNotes();
            }
        } catch (error) {
            console.error("Error saat menghapus catatan:", error);
        }
    });

    document.addEventListener("toggle-archive", async () => {
        try {
            const notes = await fetchArchivedNotes();
            noteGrid.setNotes(notes);
        } catch (error) {
            console.error("Error saat memuat catatan arsip:", error);
        }
    });

    document.addEventListener("archive-note", async (event) => {
        const { id } = event.detail;
        try {
            const success = await archiveNote(id);
            if (success) {
                await loadNotes();
            }
        } catch (error) {
            console.error("Error saat mengarsipkan catatan:". error);
        }
    });
    
    document.addEventListener("unarchive-note", async (event) => {
        const { id } = event.detail;
        try {
            const success = await unarchiveNote(id);
            if (success) {
                await loadNotes();
            }
        } catch (error) {
            console.error("Error saat membatalkan arsip catatan:", error);
        }
    });

    await loadNotes();
});