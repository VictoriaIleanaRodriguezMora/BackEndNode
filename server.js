const express = require('express')
const multer = require("multer")
const app = express()
const port = 7000
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
            '-' +
            Date.now() +
            '.' +
            file.originalname.split('.').pop()
        );
    },
});
const upload = multer({ storage: storage });

