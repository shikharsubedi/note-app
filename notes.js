const fs = require('fs');

var fetchNotes = () => {
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var findNote = (title) => {
    let notes = fetchNotes();
    return notes.find(note => note.title === title);
};


let addNote = (title, body) => {
    let note = {
        title,
        body
    };
    let notes = fetchNotes();

    let duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        return null;
    }
};

let getAll = () => {
    return fetchNotes();
};

let getNote = (title) => {
    return findNote(title);
};

let removeNote = (title) => {
    let notes = fetchNotes();
    index = notes.findIndex(note => note.title === title);
    if (index !== -1) {
        notes.splice(index, 1);
        saveNotes(notes);
        return notes;
    } else {
        return null;
    }
};

let logNote = ({title, body})=>{
    console.log("-----");
    console.log("Title:",title);
    console.log(body);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};