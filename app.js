const fs = require('fs');
const process = require('process');

const _ = require('lodash');
const yargs = require('yargs');

const titleOptions = {
        describe: "Note Title",
        demand: true,
        alias: 't'
    };
const bodyOptions = {
        describe: "Body of the note",
        "demand": true,
        alias: 'b'
    };

const argv = yargs
.command('add','Add a new note', 
{
    "title": titleOptions,
    "body": bodyOptions

}
)
.command('list', 'List all notes')
.command('remove',"Remove a note with given title",
{
    "title": titleOptions
}
)
.command('read', "Read a note",
{
    "title": titleOptions
})

.help()
.argv;
const notes = require('./notes.js');

let command  = argv._[0];


if(command === 'add'){
    let addedNote = notes.addNote(argv.title, argv.body);
    if(addedNote) {
        console.log("Note added");
        notes.logNote(addedNote);
    }else {
        console.log("Could not add note");
    }
    
} else if (command === 'list') {
    let listNotes = notes.getAll();
    listNotes.forEach(notes.logNote);
} else if (command === 'read'){
    let note = notes.getNote(argv.title);
    if(!note){
        console.log("Note not found");
    }else {
        notes.logNote(note);
    }
    
} else if (command === 'remove') {
    let allNotes = notes.removeNote(argv.title);
    if(!allNotes) {
        console.log("note not found");
    }else {
        console.log("Note removed","title: ",argv.title);
    }
} else {
    console.log('Command not recognized');
}