import { useEffect, useState } from "react";
import Carrusel from "./componets/Carrusel";
import "./App.css";

function App() {
  const [recordData, setRecordData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://demo.subsonic.org/rest/getAlbumList2?u=guest&p=guest&v=1.12.0&c=wheretoapp&f=json&type=newest"
        );
        const data = await res.json();
        const albumData = data["subsonic-response"].albumList2.album;
        console.log("albumData", albumData);

        const mutatedData = await Promise.all(
          albumData.map(async (album) => {
            const tracksRes = await fetch(
              `http://demo.subsonic.org/rest/getAlbum?u=guest&p=guest&v=1.12.0&c=wheretoapp&f=json&id=${album.id}`
            );
            const tracksData = await tracksRes.json();
            console.log("tracks", tracksData);
            const tracksArr = tracksData["subsonic-response"].album.song;
            console.log(
              "tracksData",
              tracksData["subsonic-response"].album.song
            );
            const trackTitles = tracksArr.map((track) => track.title);

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
