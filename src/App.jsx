import { useState } from 'react'
import "./style.css"
import axios from 'axios'

function App() {

const [file, setFile] = useState(null)
const [areaName, setAreaName] = useState("")
  const sendForm = async () => {
    console.log(file)
    console.log(areaName)
    let res = await axios.post("http://192.168.91.138:8000/update", {"area":areaName, "audio": file}, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status == 200) {
      setFile("")
      setAreaName("")
    }else{
      alert("Ocurrio un error enviando, vuelva a intentarlo")
    }
  }
  return (
    <div className="App">
      <h1>Olimpiada FTP</h1>
      <h1>Página de administradores del museo</h1>

      <p>Puede ingresar una nueva area del museo y un archivo de audio como descripción</p>

      <form  onSubmit={event => sendForm()}>
      
        <input onChange={(e) => setAreaName(e.target.value)}value={areaName} name="area" type="text"/>
       
        <input onChange={(e) => setFile(e.target.files[0])}name="audio" type="file" />
       <div> <input type="button" onClick = {() => {sendForm()}} value="Enviar"/></div>
      </form>
    </div>
  )
}

export default App

// enctype='multipart/form-data' action="http://192.168.91.138:8000/update"  method="post"