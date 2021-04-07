import React, { useEffect, useState } from 'react'
import style from '../CSS/lastsongs.module.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const Lastsongs = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const Fetch = async () => {
            const lastSongsResponse = await fetch("https://api.laut.fm/station/city/last_songs");
            const lastSongs = await lastSongsResponse.json();
            lastSongs.length = Math.min(6, lastSongs.length);

            const promises = lastSongs.map(async (song) => {
                const params = {
                    method: 'album.getInfo',
                    artist: song.artist.name.replace(/ /g, '%20').replace(/&/g, '%26').replace('(', '%28').replace(')', '%29'),
                    album: song.live === true ? song.title.replace(/ /g, '%20').replace(/&/g, '%26').replace('(', '%28').replace(')', '%29') : song.album.replace(/ /g, '%20').replace(/&/g, '%26').replace('(', '%28').replace(')', '%29'),
                    api_key: 'ac93b58817c64de67582b6350184ca24',
                    format: 'json',
                };

                const url = "https://ws.audioscrobbler.com/2.0/?" + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
                const cover = await fetch(url);
                const json = await cover.json();
                const date = new Date(song.started_at);
                if ((json?.album?.image[4]["#text"] !== undefined) && (json?.album?.image[4]["#text"] !== '')) { var photo = json?.album?.image[4]["#text"] } else { photo = 'https://i.ibb.co/dpnXYhh/CityFM.jpg' }
                const songData = {
                    id1: song.id,
                    id2: song.id + 1,
                    artist: song.artist.name,
                    title: song.title,
                    cover: photo,
                    started_at: date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0')
                }
                return (songData);
            });
            const results = await Promise.all(promises);
            setResults(results);
        }
        Fetch();
        setInterval(Fetch, 55000);
    }, [])
    return (
        <section className={style.lastsongs}>
            <h2 className={style.section_title}>История эфира:</h2>
            <div className={style.section_container}>
                <div className={style.song_history}>
                    {results?.map((song, index) => (
                        <div className={style.lastsong} key={song.id1}>
                            <div className={style.lastsong_cover} key={index} style={{ backgroundImage: `url(${song.cover})` }}>
                                <p className={style.song_meta_time}>{song.started_at}</p>
                            </div>
                            <div>
                                <Link to={`/artist/${song.artist.replace(/&/g, '%26')}/track/${song.title}`}><p className={style.song_meta} key={song.id1}>{song.title}</p>
                                    <p className={style.song_meta} key={song.id2}>{song.artist}</p></Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.lastsongs_next}><Link to="/lastsongs">Далее</Link></div>
            </div>
        </section>
    )
}

export default Lastsongs