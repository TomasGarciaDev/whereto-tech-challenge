import { useEffect, useRef, useState } from "react";
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
  const [curIndex, setCurIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!sliderRef.current || !cardRefs.current[curIndex]) return;

    const currentCard = cardRefs.current[curIndex];
    const slider = sliderRef.current;

    const cardCenter = currentCard.offsetLeft + currentCard.offsetWidth / 2;
    const sliderVisibleWidth = slider.offsetWidth;

    const newOffset = cardCenter - sliderVisibleWidth / 2;

    setOffset(newOffset);
  }, [curIndex, recordsData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextAlbum();
      } else if (e.key === "ArrowLeft") {
        prevAlbum();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [curIndex]);

  const nextAlbum = () => {
    setCurIndex((prev) => (prev === recordsData.length - 1 ? 0 : prev + 1));
  };

  const prevAlbum = () => {
    setCurIndex((prev) => (prev === 0 ? recordsData.length - 1 : prev - 1));
  };

  return (
    <section aria-label='Records Carrusel'>
      <div className='carrusel-container'>
        <button
          onClick={prevAlbum}
          className='nav-btn'
          style={{ left: 0 }}
          aria-label='View Previous Record'
        >
          &lArr;
        </button>

        <div className='carrusel'>
          <div
            ref={sliderRef}
            className='slider'
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {recordsData.map((record, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={
                  index === curIndex ? "slider-card active" : "slider-card "
                }
                aria-hidden={curIndex !== index}
              >
                <img
                  src={record.coverUrl}
                  alt={`Album cover for ${record.title}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextAlbum}
          className='nav-btn'
          style={{ right: 0 }}
          aria-label='View Next Record'
        >
          &rArr;
        </button>
      </div>
      <div className='table-container'>
        {recordsData[curIndex] && (
          <div className='track-table-wrapper'>
            <h2 style={{ textAlign: "center" }}>
              {recordsData[curIndex].title}
            </h2>
            <table className='track-table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Track</th>
                </tr>
              </thead>
              <tbody>
                {recordsData[curIndex].trackTitles.map((track, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{track}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
