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
    <div className='carrusel-container'>
      <button onClick={prevAlbum} className='nav-btn' style={{ left: 0 }}>
        &lArr;
      </button>
      <div className='carrusel'>
        <div
          className='slider'
          style={{ transform: `translateX(-${curIndex * 100}%)` }}
        >
          {recordsData.map((record, index) => (
            <div key={index} className='slider-card'>
              <img
                src={record.coverUrl}
                alt={`Album cover for ${record.title}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextAlbum} className='nav-btn' style={{ right: 0 }}>
        &rArr;
      </button>
    </div>
  );
}
