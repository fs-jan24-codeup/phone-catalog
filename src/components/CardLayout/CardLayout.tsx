import fav from '../../assets/icons/favourites.svg'
import './CardLayout.scss';

//DELETE THIS
const TEST__PHONE = {
  "id": "apple-iphone-11-128gb-black",
  "category": "phones",
  "namespaceId": "apple-iphone-11",
  "name": "Apple iPhone 11 128GB Black",
  "capacityAvailable": [
      "64GB",
      "128GB",
      "256GB"
  ],
  "capacity": "128GB",
  "priceRegular": 1100,
  "priceDiscount": 1050,
  "colorsAvailable": [
      "black",
      "green",
      "yellow",
      "white",
      "purple",
      "red"
  ],
  "color": "black",
  "images": [
      "img/phones/apple-iphone-11/black/00.webp",
      "img/phones/apple-iphone-11/black/01.webp",
      "img/phones/apple-iphone-11/black/02.webp",
      "img/phones/apple-iphone-11/black/03.webp",
      "img/phones/apple-iphone-11/black/04.webp"
  ],
  "description": [
      {
          "title": "And then there was Pro",
          "text": [
              "A transformative triple-camera system that adds tons of capability without complexity.",
              "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
          ]
      },
      {
          "title": "Camera",
          "text": [
              "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
          ]
      },
      {
          "title": "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
          "text": [
              "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
          ]
      }
  ],
  "screen": "6.1' IPS",
  "resolution": "1792x828",
  "processor": "Apple A13 Bionic",
  "ram": "4GB",
  "camera": "12 Mp + 12 Mp + 12MP",
  "zoom": "Digital, 5x",
  "cell": [
      "GPRS",
      "EDGE",
      "WCDMA",
      "UMTS",
      "HSPA",
      "LTE"
  ]
}

export const CardLayout = () => {
   //CHANGE THIS
  const { images, name, priceRegular, priceDiscount, ram, screen, capacity } = TEST__PHONE;

  return (
    <article className="card">
      <div className="card__container">
        <img src={images[0]} alt={name} className="card__image" />

        <div className="card__name">
          {name}
        </div>

        <div className="card__prices">
          <div className="card__price--discount">{`${priceDiscount}$`}</div>
          <div className="card__price">{`${priceRegular}$`}</div>
        </div>

        <div className="card__breakline"></div>

        <div className="card__characteristics characteristics">
          <div className='screen'>
            <p className='characteristics--name'>Screen</p>
            <p className='characteristics--value'>{screen}</p>
          </div>

          <div className='capacity'>
            <p className='characteristics--name'>Capacity</p>
            <p className='characteristics--value'>{capacity}</p>
          </div>

          <div className='ram'>
            <p className='characteristics--name'>RAM</p>
            <p className='characteristics--value'>{ram}</p>
          </div>
        </div>

        <div className="card__button card__button--container">
          <button className="card__button--add">Add to card</button>

          <button className="card__button--favourite">
            <img src={fav} alt="Favourite" className='card__button--image'/>
          </button>
        </div>
      </div>
    </article>
  );
};
