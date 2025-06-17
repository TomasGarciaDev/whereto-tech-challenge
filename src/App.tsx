import { useEffect, useState } from "react";
import Carrusel from "./componets/Carrusel";
import "./App.css";

interface Track {
  title: string;
  id: string;
}

interface Album {
  id: string;
  name: string;
  coverArt: string;
}

interface Record {
  title: string;
  coverUrl: string;
  trackTitles: string[];
}

function App() {
  const [recordData, setRecordData] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://demo.subsonic.org/rest/getAlbumList2?u=guest&p=guest&v=1.12.0&c=wheretoapp&f=json&type=newest"
        );
        const data = await res.json();
        const albumData: Album[] = data["subsonic-response"].albumList2.album;

        const mutatedData: Record[] = await Promise.all(
          albumData.map(async (album: Album) => {
            const tracksRes = await fetch(
              `http://demo.subsonic.org/rest/getAlbum?u=guest&p=guest&v=1.12.0&c=wheretoapp&f=json&id=${album.id}`
            );
            const tracksData = await tracksRes.json();

            const tracksArr: Track[] =
              tracksData["subsonic-response"].album.song;

            const trackTitles: string[] = tracksArr.map(
              (track: Track) => track.title
            );

            const coverUrl = `http://demo.subsonic.org/rest/getCoverArt?u=guest&p=guest&v=1.12.0&c=wheretoapp&f=json&id=${album.coverArt}`;

            return {
              title: album.name,
              coverUrl,
              trackTitles,
            };
          })
        );

        setLoading(false);
        setRecordData(mutatedData);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching album data", error);
        return [];
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      {loading ? "LOADING..." : <Carrusel recordsData={recordData} />}
    </div>
  );
}

export default App;
