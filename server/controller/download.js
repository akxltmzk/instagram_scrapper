const download = require('image-downloader') 
const fs = require('fs')
const filePath = process.env.FILE_PATH

exports.download_image = (urlArray)=>{
  let i = 0
  urlArray.forEach(async(element) =>{ 
    const options = {
      url: element,
      dest: filePath
    }

    await download.image(options).then(({ filename, image }) => {

      filename = filename.replace(/\\/g, '/') 
      fs.rename(filename,filePath + i +'.jpg', (err)=>{
        if (err) throw err;
      })
      i++
    })
    .catch((err) => console.error(err))
  })
}

exports.delete_image = ()=>{
  let FOLDER_PATH = filePath
  let files = fs.readdirSync(FOLDER_PATH)
  files.forEach(element => {
      fs.unlinkSync(FOLDER_PATH + "/" + element)
  })
}