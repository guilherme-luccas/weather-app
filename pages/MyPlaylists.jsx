import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../src/components/Button";
import { Container } from "../src/components/Container";

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [monitor,setMonitor]= useState(true);

  function deletePlaylist(ev) {
    let arr = [...JSON.parse(localStorage.getItem("songListSaved"))];
    arr.splice(ev, 1);
    localStorage.setItem("songListSaved", JSON.stringify(arr));
    setMonitor(!monitor)
    
  }

  useEffect(() => {
    const songs = JSON.parse(localStorage.getItem("songListSaved")).map((pl) =>
      pl.map((song) => song.track)
    );
    console.log("songs", songs);
    setPlaylists(songs);
  }, [monitor]);

  useEffect(() => {
    console.log("useffectmonitor", playlists);
    // if (playlists.length > 0) {
    //   localStorage.setItem("songListSaved", JSON.stringify(playlists));
    // }
  }, [playlists]);

  return (
    <Container>
      <button>
        <Link href="/">Voltar</Link>
      </button>
      <div>
        {playlists.map((pl, index) => {
          console.log(pl);
          return (
            <div key={index}>
              Playlist {index + 1}
              {pl.map((song) => {
                return <div key={song.key}>{song.title}</div>;
              })}
              <button onClick={() => deletePlaylist(index)}>
                Excluir playlist {index + 1}
              </button>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
