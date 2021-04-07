import React, { useState } from "react";
import style from '../CSS/player.module.css';
import Controls from './Controls';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const Player = () => {
    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState(null);
    const [artist, setArtist] = useState(null);
    const Fetch = async () => {
        const response1 = await fetch('https://api.laut.fm/station/city/current_song')
        const curmeta = await response1.json();
        setTitle(curmeta.title);
        setArtist(curmeta.artist.name);
        const name = curmeta.live === true ? curmeta.title : curmeta.album
        const response2 = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${curmeta.artist.name.replace(/ /g, '%20').replace(/&/g, '%26').replace('(', '%28').replace(')', '%29')}&album=${name.replace(/ /g, '%20').replace(/&/g, '%26').replace('(', '%28').replace(')', '%29')}&api_key=ac93b58817c64de67582b6350184ca24&format=json`);
        const curcover = await response2.json();
        const photo = curcover?.album?.image[4]["#text"] !== undefined ? curcover?.album?.image[4]["#text"] : 'https://i.ibb.co/dpnXYhh/CityFM.jpg';
        setCover(photo);
    }
    Fetch();
    setInterval(Fetch, 55000)
    return (
        <section className={style.player}>
            <div className={style.song_cover} style={{ backgroundImage: `url(${cover})` }}>
            </div>
            <Controls />
            <div>
                <Link to={`/artist/${artist}/track/${title}`}><p className={style.song_meta}>{title}</p></Link>
                <Link to={`/artist/${artist}`}><p className={style.song_meta}>{artist}</p></Link>
            </div>
        </section>
    )
}

export default Player