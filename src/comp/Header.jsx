import Switch from "./Switch"


const Header = () => {
    return (
        <section className="header" >
            <div className="search" >
                <input className="search__input" placeholder="Enter Prompt" />
                <button className="search__btn" > Fetch </button>
                <Switch />
            </div>
            <div className="api__container" >
                <span>ChatGPT :</span>
                <input className="search__input" placeholder="Enter API key" />
            </div>

        </section>
    )

}

export default Header;