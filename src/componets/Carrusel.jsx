import { useState } from "react";
import "./Carrusel.css";

export default function Carrusel({ recordsData }) {
  const [curIndex, setCurIndex] = useState(0);

  const nextAlbum = () => {
    if (curIndex === recordsData.length - 1) return setCurIndex(0);
    setCurIndex(curIndex + 1);
  };

  const prevAlbum = () => {
    if (curIndex === 0) return setCurIndex(recordsData.length - 1);
    setCurIndex(curIndex - 1);
  };
  return (
    <div className='carrusel'>
      <button onClick={prevAlbum} className='nav-btn'>
        &lArr;
      </button>
      <div
        className='slider'
        style={{ transform: `translateX(-${curIndex * 20}%)` }}
      >
        {recordsData.map((record) => (
          <div className='slider-card'>
            <img src={record.coverUrl}></img>
          </div>
        ))}
        <h1>{recordsData[curIndex].title}</h1>
      </div>
      <button onClick={nextAlbum} className='nav-btn'>
        &rArr;
      </button>
    </div>
  );
}
