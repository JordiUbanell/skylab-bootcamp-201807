const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const package = require('./package.json')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

app.use(fileUpload())

app.get('/helloworld', (req, res) => {
    res.send(`<html>
    <head>
        <title>hola mundo</title>
        <link rel="stylesheet" href="styles.css"/>
        <link href="
    </head>
    <body>
        <h1>hello world!</h1>
    </body>
</html>`)
})

// file names
app.get('/files', (req, res) => {
    const files = fs.readdirSync('files')

    res.send(`<html>
    <head>
        <title>files</title>
    </head>
    <body>
    <ul>
    
    ${files.map(file => `<li style="list-style-type: none"> <a href="/files/${file}"> X &nbsp;</a> <a href="/files/${file}"> ${file} </a></li>`).join('')}
    </ul>

        <form action="/files" method="post" encType="multipart/form-data">
            <input type="file" name="upload">
            <button>upload</button>
        </form>
    </body>
</html>`)
})

app.post('/files', (req, res) => {
    const { files: { upload } } = req

    upload.mv(`files/${upload.name}`, function (err) {
        if (err)
            return res.status(500).send(err)

        res.redirect('/files')
    });
})

// Download files
app.get('/files/:file', (req, res) => {
    const file = `files/${req.params.file}`
    res.download(file)
})

// Delete files
app.get('/files/delete:file', (req, res) => {
    const file = `files/${req.params.file}`
    res.alert(`Are you sure to delete the file &{file}`)
})

app.listen(port, () => console.log(`${package.name} ${package.version} up and running on port ${port}`))