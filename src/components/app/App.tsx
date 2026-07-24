import { useEffect } from "react"


import { fetchNotes } from "../../services/noteService"

import "../app/App.module.css"

function App() {
  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes({ page: 1, search: "" });
        console.log(data)
      }
      catch (error){
        console.log("Error loading notes:", error)
      }
    };
    getNotes();
  }, []);

  

  return (
    <>
     
    </>
  )
}

export default App
