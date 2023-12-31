const express = require('express')
const path = require('path')
const app = express();
const {mergedpdf} = require('./merge')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'))

const port = 5000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files)
  await mergedpdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect("http://localhost:5000/static/merged.pdf")
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost: ${port}`)
})