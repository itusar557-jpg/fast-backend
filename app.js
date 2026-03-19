const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { isUtf8 } = require('buffer');
const { time } = require('console');
app.set('view engine', 'ejs')
app.set(express.static(path.join(__dirname,"public")))

app.use(express.json()); // JSON data parse করার জন্য
app.use(express.urlencoded({ extended: true })); // form data parse করার জন্য

app.get("/", (req , res)=>{
  fs.readdir('./data',(err,file)=>{
    res.render('index',{file:file})
  })
})
app.post('/save',(req, res)=>{
 
   const aaj = new Date();
let tarik = aaj.toLocaleDateString('en-GB').split('/').join('-');
let somoy = aaj.toLocaleTimeString('en-GB').split(':').join('⁚')
    fs.writeFile(`./data/${req.body.title} - writeFile - ${tarik} - ${somoy} .txt`,`${req.body.content}`,(err)=>{
  
    })
 
  res.redirect('/')
})
app.get('/view/:filename',(req,res)=>{ 
  fs.readFile(`./data/${req.params.filename}`,'utf-8',(err, file)=>{
res.render('ditels',{
  filename:req.params.filename,
  file:file,
 })
  }) 
})
app.get('/edit/:filename',(req ,res)=>{
  res.render('edit' ,{
    filename:req.params.filename
  })

})
app.post('/edits/:filename',(req, res)=>{
   const aaj = new Date();
let tarik = aaj.toLocaleDateString('en-GB').split('/').join('-');
let somoy = aaj.toLocaleTimeString('en-GB').split(':').join('⁚') 
fs.rename(`./data/${req.params.filename}`,`./data/${req.body.title} - Rename -  ${tarik} - ${somoy} .txt`,(err)=>{
  res.redirect('/')
})
  
})
app.get('/delete/:filename',(req,res)=>{
  fs.unlink(`./data/${req.params.filename}`,(err)=>{
    console.log(req.params.filename);
    
    res.redirect('/')

  })
})
app.get(`/Editfile/:filename`,(req,res)=>{
  fs.readFile(`./data/${req.params.filename}`,'utf-8',(err,file)=>{
    res.render('editfile',{
      fileName : req.params.filename,
      file:file
    })
    
  })
})
app.post('/saveus',(req,res)=>{
  fs.writeFile(`./data/${req.body.title}`,`${req.body.content}`,()=>{
    res.redirect('/')
  })
 
})
app.get("/Rdd", (req , res)=>{
  fs.readdir('./rd',(err,file)=>{
    let mat = Math.floor(Math.random()*file.length);
    fs.readFile(`./rd/${file[mat]}`,'utf-8',(err,filev)=>{
        fs.readdir('./data',(err,gfile)=>{
          res.render('indexx',{txtfile:filev,file:gfile}) 
  
        })
        
      })
      
      
    })

   

    
})

app.listen(3000)
