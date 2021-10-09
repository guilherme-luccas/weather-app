import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "../src/components/Container";

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [monitor, setMonitor] = useState(true);

  function deletePlaylist(ev) {
    let arr = [...JSON.parse(localStorage.getItem("songListSaved"))];
    arr.splice(ev, 1);
    localStorage.setItem("songListSaved", JSON.stringify(arr));
    setMonitor(!monitor);
  }

  useEffect(() => {
    // const songs = JSON.parse(localStorage.getItem("songListSaved")).map((pl) =>
    //   pl.map((song) => song.track)
    // );
    const songs = JSON.parse(localStorage.getItem("songListSaved"));

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
      <button
        style={{
          width: 90,
          height: 30,
          backgroundColor: "#0ec99d85",
          border: "none",
          textDecoration: "none",
          cursor: "pointer",
          borderRadius: 10,
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        <Link href="/">Voltar</Link>
      </button>
      <div>
        {localStorage.getItem("songListSaved") &&
          playlists.map((pl, index) => {
            return (
              <div
                style={{
                  minWidth: 800,
                  backgroundColor: "#0ec99d85",
                  border: "5px solid #00000026",
                  borderRadius: "10px",
                  marginTop: "10px",
                  padding: "10px",
                }}
                key={index}
              >
                Playlist {index + 1}
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: "17px",
                  }}
                >
                  <p>{pl.cityName}</p>
                  <p>{pl.genre}</p>
                  <p>Temperatura {pl.temperature}°C</p>
                </div>
                {pl.songList.map((song, index) => {
                  return (
                    <div
                      style={{
                        width: "100%",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                      key={index}
                    >
                      {song.track.title} - {song.track.subtitle}
                    </div>
                  );
                })}
                <button
                  style={{
                    marginBottom: "10px",
                  }}
                  onClick={() => deletePlaylist(index)}
                >
                  Excluir playlist {index + 1}
                </button>
              </div>
            );
          })}
      </div>
    </Container>
  );
}
