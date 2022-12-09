import React from 'react';
function Item({ image, name, desc, color, price, rating }) {
  return (
    <div className="item">
      <div className="item-info">
        <img src={image.src} alt="img" width="100px" />
        <p>
          {' '}
          <strong>{name}</strong>
        </p>
        <p>{desc}</p>
        <p>Цвет: {color}</p>
        <p>Цена: {price} руб.</p>
        <p>Рейтинг: {rating}</p>
      </div>
    </div>
  );
}

export default React.memo(Item);
