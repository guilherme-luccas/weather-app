import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Container } from "../src/components/Container";
import { SwitchToggle } from "../src/components/Switch";
import { ThemeContext } from "../src/ThemeContext";
import styles from "../styles/MyPlaylists.module.css";

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [monitor, setMonitor] = useState(true);
  const { themeLight } = useContext(ThemeContext);
  const [localS, setLocalS] = useState(null);

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
    setLocalS(songs);

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
      className={styles.container}
      style={{
        backgroundColor: themeLight ? "white" : "black",
      }}
    >
      <Container>
        <div
          className={styles.switchContainer}
          style={{
            color: themeLight ? "black" : "white",
          }}
        >
          Mudar tema
          <SwitchToggle />
        </div>
        <Link href="/">
          <span
            className={styles.spanBack}
            style={{
              color: themeLight ? "black" : "white",
            }}
          >
            Voltar
          </span>
        </Link>

        <div>
          {localS &&
            playlists.map((pl, index) => {
              return (
                <div
                  className={styles.playlist}
                  style={{
                    color: themeLight ? "white" : "black",
                  }}
                  key={index}
                >
                  Playlist {index + 1}
                  <div className={styles.playlistHeader}>
                    <p>{pl.date}</p>
                    <p>{pl.cityName}</p>
                    <p>{pl.genre}</p>
                    <p>Temperatura {pl.temperature}°C</p>
                  </div>
                  {pl.songList.map((song, index) => {
                    return (
                      <div className={styles.playlistSong} key={index}>
                        {song.track.title} - {song.track.subtitle}
                      </div>
                    );
                  })}
                  <button
                    className={styles.button}
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
