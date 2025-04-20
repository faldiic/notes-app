const BASE_URL = "https://notes-api.dicoding.dev/v2";

// mengambil semua catatan yang tidak di arsip
export const fetchNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil catatan:", error);
    return [];
  }
};

// mengambil semua catatan yang di arsip
export const fetchArchivedNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil catatan yang diarsipkan: ", error);
    return[];
  }
};

// mengambil satu catatan berdasarkan id
export const fetchNoteById = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat mengambil catatan dengan ID ${noteId}:`, error);
    return null;
  }
};

// menambahkan catatan Baru
export const addNote = async (title, body) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat catatan:", error);
    return null;
  }
};

// mengarsipkan catatan
export const archiveNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: "POST",
    });
    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat mengarsipkan catatan dengan ID ${noteId}:`, error);
    return null;
  }
};

// menghapus arsip catatan
export const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: "POST",
    });
    const result = await response.json();
    if (response.ok) {
      return result.message;
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat menghapus arsip catatan dengan ID ${noteId}:`, error);
    return null;
  }
};

// menghapus catatan
export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat menghapus catatan dengan ID ${noteId}:`, error);
    return null;
  }
};

// memperbaharui catatan berdasarkan ID
export const updateNote = async (noteId, { title, body }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat memperbarui catatan dengan ID ${noteId}:`, error);
    return null;
  }
};