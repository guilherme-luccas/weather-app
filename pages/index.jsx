import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Container } from "../src/components/Container";
import styles from "../styles/Home.module.css";
import Logo from "../public/Logo.png";
import { api } from "./api/hello";
import { Loading } from "../src/components/Loading";
import { Button } from "../src/components/Button";
import { ThemeContext } from "../src/ThemeContext";
import { SwitchToggle } from "../src/components/Switch";

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [showCity, setShowCity] = useState(false);
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validCity, setValidCity] = useState(true);

  const { themeLight } = useContext(ThemeContext);

  function handleSubmit(event) {
    event.preventDefault();
    fetchCity(cityName);
  }
  async function fetchCity(city) {
    try {
      const res = await api.get(
        `data/2.5/weather?q=${city}&units=metric&appid=6c75139ff916ca0ebbc62725a2e7710d`
      );
      const response = res.data.main.temp;
      setTemperature(Math.round(response));
      setShowCity(true);
      fetchMusic(response);
      setValidCity(true);
    } catch (err) {
      if (err) {
        setValidCity(false);
        console.log("digite cidade valida");
      }
    }
  }

  useEffect(() => {
    console.log("temperatura", temperature);
    console.log("musicas", songList);
  }, [temperature, songList]);

  function fetchMusic(temp) {
    setLoading(true);

    let genre = "";
    if (temp >= 32) {
      genre = "rock";
    } else if (temp < 32 && temp >= 24) {
      genre = "pop";
    } else if (temp < 24 && temp >= 16) {
      genre = "classical";
    } else if (temp < 16) {
      genre = "lofi";
    }
    var options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: { term: `${genre}`, locale: "en-US", offset: "0", limit: "5" },
      headers: {
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": "90729b7143msh60ff4dd3115abc6p147bdejsn904f0c4ca92f",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSongList(response.data.tracks.hits);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function handleSaveList(temp) {
    let genre = "";
    if (temp >= 32) {
      genre = "rock";
    } else if (temp < 32 && temp >= 24) {
      genre = "pop";
    } else if (temp < 24 && temp >= 16) {
      genre = "classical";
    } else if (temp < 16) {
      genre = "lofi";
    }
    let songListSaved = new Array();
    if (localStorage.hasOwnProperty("songListSaved")) {
      songListSaved = JSON.parse(localStorage.getItem("songListSaved"));
    }
    let date = new Date();
    let dateFormated =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const search = {
      date: dateFormated,
      genre,
      temperature,
      cityName,
      songList,
    };

    songListSaved.push(search);
    localStorage.setItem("songListSaved", JSON.stringify(songListSaved));
  }

  return (
    <div
      style={{
        backgroundColor: themeLight ? "white" : "black",
        height: "100vh",
      }}
    >
      <Head>
        <title>WeatherMusic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Image src={Logo} alt="Logo weather music" />
          <h1
            style={{
              fontSize: 90,
              color: "black",
            }}
          >
            weather
            <span
              style={{
                color: "#0ec99d85",
              }}
            >
              Music
            </span>
          </h1>{" "}
          <span
            style={{
              fontSize: 120,
            }}
          >
            .
          </span>
        </div>
        <SwitchToggle />
        <div className={styles.inputContainer}>
          <h2 style={{ color: themeLight ? "black" : "white" }}>
            Digite uma cidade:
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(ev) => {
                setCityName(ev.target.value);
                setShowCity(false);
              }}
              name="cityName"
              value={cityName}
              type="text"
              className={styles.input}
            />
            <input
              style={{ marginRight: 10 }}
              type="submit"
              value="Pesquisar"
              className={styles.input}
              disabled={!cityName}
            />
          </form>
          <Button>
            <Link href="/MyPlaylists">Minhas Playlists</Link>
          </Button>
        </div>
        {!validCity && <div>Digite uma cidade Válida</div>}
        {showCity && loading == false ? (
          <div style={{ textAlign: "center" }}>
            Em <strong>{cityName.toUpperCase()}</strong> está {temperature}°C
            <div style={{ textAlign: "center" }}>
              Sugestões de musicas para esse clima:{" "}
            </div>
            {songList.map((song) => {
              return (
                <div
                  style={{ textAlign: "left", marginBottom: 10 }}
                  key={song.track.key}
                >
                  {song.track.title} - {song.track.subtitle}{" "}
                </div>
              );
            })}
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
              onClick={() => handleSaveList(temperature)}
            >
              SALVAR
            </button>
          </div>
        ) : (
          showCity && <Loading />
        )}
      </Container>
    </div>
  );
}
