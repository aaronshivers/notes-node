const fs = require('fs')
const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

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

// 'add' command
if (command === 'add') {

  // create note
  const note = notes.addNote(argv.title, argv.body)

  // create and log note
  if (note) {
    console.log('Note created...')
    notes.logNote(note)
  } else {
    console.log(`The note: ${ argv.title } already exists.`)
  }

// 'list' command
} else if (command === 'list') {

  // get and log notes
  const allNotes = notes.getAll()
  console.log(`Printing ${allNotes.length} note(s).`)
  allNotes.forEach(note => notes.logNote(note))

// 'read' command
} else if (command === 'read') {

  // get note
  const note = notes.getNote(argv.title, argv.body)

  // log note
  if (note) {
    console.log('Note read')
    notes.logNote(note)
  } else {
    console.log('Note not found')
  }

// 'remove' command
} else if (command === 'remove') {
  
  // remove note
  const noteRemoved = notes.removeNote(argv.title)

  // create and log message
  const message = noteRemoved ? `Note removed` : 'Note not found'
  console.log(message)

// error message
} else {
  console.log('Command not recognized')
}