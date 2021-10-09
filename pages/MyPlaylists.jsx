import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Container } from "../src/components/Container";
import { SwitchToggle } from "../src/components/Switch";
import { ThemeContext } from "../src/ThemeContext";

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [monitor, setMonitor] = useState(true);
  const { themeLight } = useContext(ThemeContext);

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
    <div
      style={{
        backgroundColor: themeLight ? "white" : "black",
        height: "100vh",
      }}
    >
      <Container>
        <Link href="/">
          <span
            style={{
              color: themeLight ? "black" : "white",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Voltar
          </span>
        </Link>
        <div
          style={{
            width: 170,
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: themeLight ? "black" : "white",
          }}
        >
          Mudar tema
          <SwitchToggle />
        </div>
        <div>
          {localStorage.getItem("songListSaved") &&
            playlists.map((pl, index) => {
              return (
                <div
                  style={{
                    minWidth: 800,
                    backgroundColor: "#0ec99d",
                    border: "5px solid #00000026",
                    borderRadius: "10px",
                    marginTop: "10px",
                    padding: "10px",
                    color: themeLight ? "white" : "black",
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
                      width: 120,
                      height: 40,
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                      textDecoration: "none",
                      cursor: "pointer",
                      borderRadius: 10,
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                    }}
                    onClick={() => deletePlaylist(index)}
                  >
                    Excluir Playlist
                  </button>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
}
