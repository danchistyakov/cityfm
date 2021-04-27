import React, { Component } from 'react'
import style from '../CSS/feed.module.css';

const Feed = () => {
    return (
        <section className="section_feed">
            <h1 className="section_title">Программы</h1>
            <div className={style.feed}>
                <div className={style.feed_post}>
                    <h2>GOOD MORNING!</h2>
                </div>
                <div className={style.feed_post}>
                    <h2>2010 FLASHBACKS</h2>
                </div>
                <div className={style.feed_post}>
                    <h2>HOT 20 CNTDWN</h2>
                </div>
            </div>
        </section>
    )
}

export default Feed