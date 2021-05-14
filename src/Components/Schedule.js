import React, { useState, useEffect } from 'react'
import style from '../CSS/schedule.module.css';

const Schedule = () => {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const Fetch = async () => {
            const response1 = await fetch("https://api.laut.fm/station/city");
            const data1 = await response1.json();
            setInfo(data1);
        }
        Fetch();
        setInterval(Fetch, 180000)
    }, [])
    return (
        <section className={style.schedule_section}>
            <div className={style.now_onair}>
                <h2>У микрофона:</h2>
                <div className={style.dj_block}>
                    <h3 className={style.dj_name}>{info?.current_playlist.name}</h3>
                    <h3 className={style.dj_time}>{info?.current_playlist.hour + 1}:00&nbsp;&nbsp;&gt;&nbsp;&nbsp;{info?.current_playlist.end_time + 1}:00</h3>
                </div>
            </div>
            <div className={style.next_onair}>
                <h2>Далее в эфире:</h2>
                <h3>{info?.next_playlist.name}</h3>
                <p>{info?.next_playlist.description}</p>
                <p>{info?.next_playlist.hour + 1}:00 — {info?.next_playlist.end_time + 1}:00</p>
            </div>
        </section>
    )
}

export default Schedule