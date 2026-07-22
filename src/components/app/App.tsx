import { useEffect } from "react"


import { fetchNotes } from "../../services/noteService"

import "../app/App.css"

function App() {
  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes(1, "");
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
      <h1>NoteHub</h1>
    </>
  )
}

export default App
