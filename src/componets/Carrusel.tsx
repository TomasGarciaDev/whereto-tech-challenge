import { useState } from "react";
import "./Carrusel.css";

interface Record {
  title: string;
  coverUrl: string;
  trackTitles: string[];
}

interface CarruselProps {
  recordsData: Record[];
}

export default function Carrusel({ recordsData }: CarruselProps) {
  const [curIndex, setCurIndex] = useState(4);

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
        // style={{ transform: `translateX(${(curIndex - index) * 100}%)` }}
      >
        {recordsData.map((record, index) => (
          <div
            key={index}
            className='slider-card'
            style={{ transform: `translateX(${(index - curIndex) * 60}%)` }}
          >
            <img
              src={record.coverUrl}
              alt={`Album cover for ${record.title}`}
            />
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
