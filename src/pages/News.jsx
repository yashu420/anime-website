import React from 'react'
import AnimeNewsBanner from './NewsComp/AnimeNewsBanner'
import AnimeNewsSection from "./NewsComp/AnimeNewsSection"
const News = () => {
  return (
    <div>
        <div className="div">
            <AnimeNewsBanner/>
            <AnimeNewsSection/>
        </div>
    </div>
  )
}

export default News