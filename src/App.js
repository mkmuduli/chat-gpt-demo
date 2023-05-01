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

  const [type, setType] = useState("suggestion");
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  const [isLoading, setLoading] = useState(false);

  const handleTypeChange = (val) => {
    if (val === "image") setText(''); else setImages([]);
    setType(val)
  }

  const handleFetch = (bodyData) => {
    if (isLoading) return;
    if (type === 'image') {
      setLoading(true)
      fetchImagesFromDALLE(bodyData.prompt, bodyData.apiKey, 4)
        .then(resp => {
          setLoading(false)
          setImages(resp)
        })
        .catch((err) => {
          alert(err.message)
          setLoading(false)
        })
    } else {
      setLoading(true)
      getSuggestions(bodyData.prompt, bodyData.apiKey, 1)
        .then(resp => {
          setLoading(false)
          setText(resp[0].message.content)
        })
        .catch((err) => {
          alert(err.message)
          setLoading(false)
        })
    }
  }

  return (
    <main className="main-container">
      <Header type={type} onTypeChange={handleTypeChange} onFetch={handleFetch} />
      {isLoading ?
        <div className={`no-item container-tool ${type !== "image" ? 'no-item-sug' : ''}`}>
          <div class="loader"/>
          </div>
        : !images.length && !text ?
          <div className={`no-item container-tool ${type !== "image" ? 'no-item-sug' : ''}`}  >
            Enter Prompt and API key
            then Click on Fetch get Result
          </div>
          : type === "image" ?
            <ImageList images={images} />
            :
            <Suggestion value={text} />}
    </main>
  );
}

export default App;
