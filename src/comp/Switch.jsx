 const Switch = ({value, onChange}) => {
    return (
        <div className="switcher" >
            Suggestion
            <label className="switch">
                <input type="checkbox" checked={value} onChange={onChange} />
                <span className="slider round"></span>
            </label>
        </div>


    )
}


export default Switch