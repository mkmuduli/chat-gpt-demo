import { useState } from "react";
import Switch from "./Switch"


const Header = ({ type, onTypeChange, onFetch }) => {

    const [apiKey, setApiKey] = useState('');
    const [prompt, setPrompt] = useState('');

    const handlePromptChange = (e) => { setPrompt(e.target.value) }
    const handleApiChange = (e) => { setApiKey(e.target.value) }

    const handleTypeChange = (e) => {
        onTypeChange(e.target.checked === true ? 'suggestion': 'image')
    }

    const handleFetchClick = () => {
        onFetch({ apiKey, prompt })
    }

    return (
        <section className="header" >
            <div className="search" >
                <input className="search__input" placeholder="Enter Prompt" value={prompt} onChange={handlePromptChange} />
                <button className="search__btn" onClick={handleFetchClick} > Fetch </button>
                <Switch value={type !== "image"} onChange={handleTypeChange} />
            </div>
            <div className="api__container" >
                <span>ChatGPT :</span>
                <input className="search__input" placeholder="Enter API key" value={apiKey} onChange={handleApiChange} />
            </div>

        </section>
    )

}

export default Header;