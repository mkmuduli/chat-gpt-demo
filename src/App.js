import './App.css';
import './comp/header.css';
import './comp/imageList.css';
import './comp/switch.css'
import Header from './comp/Header';
import { useState } from 'react';
import { fetchImagesFromDALLE } from './utils/imageHelper';
import ImageList from './comp/ImageList';
import Suggestion from './comp/Suggetion';
import { getSuggestions } from './utils/chatComplition';

function App() {

  const [type, setType] = useState("image");
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  const [isLoading,setLoading] = useState(false);

  const handleTypeChange = (val) => {
    setType(val)
  }

  const handleFetch = (bodyData) => {
    if(isLoading) return;
    if (type === 'image') {
      setLoading(true)
      fetchImagesFromDALLE(bodyData.prompt, bodyData.apiKey, 6)
      .then(resp=>{
        setLoading(false)
        setImages(resp)
      })
    }else{
      setLoading(true)
      getSuggestions(bodyData.prompt,bodyData.apiKey,1).then(resp=>{        
        setLoading(false)
        setText(resp[0].message.content)
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
        <Suggestion value={text} />}
    </main>
  );
}

export default App;
