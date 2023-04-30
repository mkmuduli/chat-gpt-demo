

const ImageList = ({ images }) => {

    return (
        <div className={`image__container ${images.length > 1 ? 'two-column' : ''}`} >
            {images.map((eachImage,idx) => {
                return <img key={idx} src={eachImage.url} alt="test" />

            })}
        </div>
    )
}

export default ImageList