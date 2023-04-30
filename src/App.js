import './App.css';
import './comp/header.css';
import './comp/imageList.css';
import './comp/switch.css'
import Header  from './comp/Header';
import { useState } from 'react';
import { fetchImagesFromDALLE } from './utils/imageHelper';
import ImageList from './comp/ImageList';

function App() {

  const [type,setType] = useState("image");
  const [images,setImages] = useState([]);

  const handleTypeChange = (val) =>{
    setType(val)
  }

  const handleFetch = (bodyData)=>{
    if(type === 'image'){
      const chatGPTAPIKEY = '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';
      fetchImagesFromDALLE(bodyData.prompt,chatGPTAPIKEY,4).then(setImages)
    }
  }

  return (
    <main className="main-container">
      <Header type={type} onTypeChange={handleTypeChange} onFetch={handleFetch} />
      <ImageList images={images} />
    </main>
  );
}

export default App;
