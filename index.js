import  express from 'express'
import bodyParser from "body-parser";
import path from "path";
import fs from "fs"
import qr_img from 'qr-image'
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));




const app=express();
const port=3000
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/submit",(req,res)=>{
    var website=req.body["website"]
    var qr_svg = qr_img.image(website);
    qr_svg.pipe(fs.createWriteStream("pagina_png.png"))
    res.sendFile(__dirname+"/pagina_png.png")
    

})
app.listen(port,(err)=>{
    if(err) throw err

    console.log(`server runnig on port ${port}`)
})