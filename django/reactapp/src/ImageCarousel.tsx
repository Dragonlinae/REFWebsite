import './css/core.css';
import './css/imageCarousel.css';
import { PictureInterface } from './CourseInterface';

function ImageCarousel(props: { images: PictureInterface[] }) {
  return (
    <div className="cs-image-gallery">
      <div className="cs-image-gallery-main">
        {props.images.map((image, index) => (
          <a id={"image" + index} href={image.picture} target="_blank" className="cs-image-carousel-main-link">
            <img src={image.picture} alt="carousel" className="cs-image-gallery-item" />
          </a>
        ))}
        <a id="default" href={props.images[0].picture} target="_blank" className="cs-image-carousel-main-link">
          <img src={props.images[0].picture} alt="carousel" className="cs-image-gallery-item" />
        </a>
      </div>
      <div className="cs-image-gallery-thumbs">
        {props.images.map((image, index) => (
          <a href={"#image" + index}>
            <img src={image.picture} alt="carousel" className="cs-image-gallery-thumb" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;