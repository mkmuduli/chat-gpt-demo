import './App.css';
import './comp/header.css';
import './comp/imageList.css';
import './comp/switch.css'
import Header from './comp/Header';
import { useState } from 'react';
import { fetchImagesFromDALLE } from './utils/imageHelper';
import ImageList from './comp/ImageList';
import Suggestion from './comp/SuggetionList';

function App() {

  const [type, setType] = useState("image");
  const [images, setImages] = useState([]);

  const [isLoading,setLoading] = useState(false);

  const handleTypeChange = (val) => {
    setType(val)
  }

  const handleFetch = (bodyData) => {
    if (type === 'image') {
      setLoading(true)
      fetchImagesFromDALLE(bodyData.prompt, bodyData.apiKey, 2)
      .then(resp=>{
        setLoading(false)
        setImages(resp)
      })
    }
  }

  return (
    <main className="main-container">
      <Header type={type} onTypeChange={handleTypeChange} onFetch={handleFetch} />
      { isLoading ?
        <>Loading</>
      :type === "image" ?
        <ImageList images={images} />
        :
        <Suggestion />}
    </main>
  );
}

export default App;
