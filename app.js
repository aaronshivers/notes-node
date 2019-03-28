const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

let message

// set options for title
const titleOptions =  {
  describe: "Title of note",
  demand: true,
  alias: "t"
}

// set options for body
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

// create arguments
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv

// get argument from cli
const command = argv._[0]

switch (command) {

  // add note
  case 'add':

    // create note
    const note = notes.addNote(argv.title, argv.body)

    // create message
    message = note ? 'Note created...' : `The note: ${ argv.title } already exists.`

    // log note and message
    notes.logNote(note)
    console.log(message)

    break

  // list all notes
  case 'list':

    // get and log notes
    const allNotes = notes.getAll()
    console.log(`Printing ${allNotes.length} note(s).`)
    allNotes.forEach(note => notes.logNote(note))

    break

  // read one note
  case 'read':

    // get note
    const foundNote = notes.getNote(argv.title, argv.body)

    // create message
    message = foundNote ? 'Note read' : 'Note not found'
    
    // log note and message
    notes.logNote(foundNote)
    console.log(message)

    break

  // remove note
  case 'remove':

    // remove note
    const removedNote = notes.removeNote(argv.title)

    // create and log message
    message = removedNote ? `Note removed` : 'Note not found'
    console.log(message)

    break

  default:

    // error message
    console.log('Command not recognized')
}
