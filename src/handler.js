import {nanoid} from 'nanoid'
import notes from './notes.js'

/**
    * @param {Request} r
    * @param {Response} h
    * @return {Response}
*/
function addNoteHandler(r, h) {
    const {title, tags, body} = r.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    }

    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    })
    response.code(500)
    return response
}

/**
 * @param {Request} r
 * @param {Response} h
 * @return {Response}
*/
function getAllNotesHandler(r, h) {
    const response = h.response({
        status: 'success',
        data: {
            notes,
        },
    })
    response.code(200)
    return response
}

/**
 * @param {Request} r
 * @param {Response} h
 * @return {Response}
*/
function getNoteByIdHandler(r, h) {
    const {id} = r.params

    const note = notes.filter((n) => n.id === id)[0]

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    })
    response.code(404)
    return response
}

/**
 * @param {Request} r
 * @param {Response} h
 * @return {Response}
*/
function editNoteByIdHandler(r, h) {
    const {id} = r.params

    const {title, tags, body} = r.payload
    const updatedAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    })
    response.code(404)
    return response
}

/**
 * @param {Request} r
 * @param {Response} h
 * @return {Response}
*/
function deleteNoteByIdHandler(r, h) {
    const {id} = r.params

    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    })
    response.code(404)
    return response
}

export {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
}