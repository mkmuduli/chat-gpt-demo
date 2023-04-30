import './App.css';
import './comp/header.css';
import './comp/imageList.css';
import './comp/switch.css'
import Header  from './comp/Header';
import { useState } from 'react';
// import ImageList from './comp/ImageList';

function App() {

  const [type,setType] = useState("image");

  const handleTypeChange = (val) =>{
    setType(val)
  }

  const handleFetch = (data)=>{
    console.log("mk",data)
  }

  return (
    <main className="main-container">
      <Header type={type} onTypeChange={handleTypeChange} onFetch={handleFetch} />
      {/* <ImageList /> */}
    </main>
  );
}

export default App;
