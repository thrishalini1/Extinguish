// console.log(__dirname)
// // setInterval(()=>{
// //     console.log('Hello World')
// // },1000)
// console.log(module)

// module.exports.items = ['item1', 'item2']
// const person = { name: 'bob',
// }
// module.exports.singlePerson = person
// console.log(process.env)

// const os = require('os')
// // info about current user const user = os.userInfo() console.log(user)
// // method returns the system uptime in seconds
// console.log(`The System Uptime is ${os.uptime()} seconds`)
// const currentOS = { name: os.type(),
// release: os.release(), totalMem: os.totalmem(), freeMem: os.freemem(),
// } 
// console.log(currentOS)


// const path = require('path')
// console.log(path.sep)
// const filePath = path.join('/content/', 'subfolder', 'test.txt') 
// console.log(filePath)
// const base = path.basename(filePath) 
// console.log(base)
// const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt') 
// console.log(absolute)




// const http = require('http')

// const server = http.createServer((req,res)=>{

//     const url = req.url;

//     if(url === '/')

//      {   
//         res.writeHead(200,{'content-type':'text/html'})
//         res.write('<h1>Home Page</h1>')
//         res.end()
//      }
//      else if(url === '/about')
//      {
//         res.writeHead(200,{'content-type':'text/html'})
//         res.write('<h1>About page</h1>')
//         res.end()
//      }
//      else{
//         res.writeHead(404,{'content-type':'text/html'})
//         res.write('<h1>page not found</h1>')
//         res.end()
//      }
// });

// server.listen(3000,()=>{
// console.log('Server is running')
// })


// const http = require('http')
// const server = http.createServer((req, res) => {
// // console.log(req.method) 
// const url = req.url
// // home page 
// if (url === '/') {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     res.write('<h1>home page</h1>')
//     res.end()
//  }
// // about page
// else if (url === '/about') {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     res.write('<h1>about page</h1>')
//     res.end() 
// }
// // 404
//  else {
//     res.writeHead(404, { 'content-type': 'text/html' })
//     res.write('<h1>page not found</h1>')
//     res.end() 
// }
// }) 

// server.listen(3000)


const express = require('express') 
const path = require('path')
const app = express()
// setup static and middleware app.use(express.static('./public'))

app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))

})

app.all('*', (req, res) => {

   res.status(404).send('resource not found') 
   
})

app.listen(5000, () => { 
   console.log('server is listening on port 5000....') 
})