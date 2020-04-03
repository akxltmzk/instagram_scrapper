const cs= require('child_process')

exports.python_scrapping = (instaID)=>{
  return new Promise((resolve,reject)=>{
      // active app.py
    let spawn = cs.spawn
    let process = spawn('python',["python_scrapper/app.py",instaID.toString()] ) 

    // recieve data form app.py
    process.stdout.on('data',(data)=>{
      let utf8 = data.toString('utf-8')
      
      // if account is private
      if(data.toString() == Buffer.from("private\r\n", 'ascii'))
        return resolve('private')

      //if account doesnt exist
      else if (utf8 == Buffer.from("wrong\r\n", 'ascii'))
        return resolve('wrong')

      // account is public
      else{
        utf8 = utf8.replace(/['\[\]]/g, '')
        let array = utf8.split(',')
        return resolve(array)
      }
    })
  })
}

