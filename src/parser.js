'use strict'

const Feed = require('rss-to-json')
const fs = require('fs')

Feed.load(
  'https://www.listennotes.com/c/r/5597931cc47c4ba18ea46c52dd81d866',
  async function(err, rss) {
    try {
      const episodes = rss.items.map(episode => {
        const episodesData = {
          title: episode.title,
          subtitle: episode.itunes_subtitle,
          description: episode.itunes_summary,
          pubDate: episode.pubDate,
          length: episode.enclosures[0].length,
          audioUrl: episode.enclosures[0].url
        }
        return episodesData
      })
      const data = {
        title: rss.title,
        description: rss.description,
        image: rss.image,
        episodes: [...episodes]
      }
      fs.writeFile('CheckPoint.json', JSON.stringify(data, null, 2), err => {
        if (err) throw err
        console.log('File saved successfully')
      })
      console.log(JSON.stringify(data, null, 2))
    } catch (err) {
      console.error(err)
    }
  }
)

// Feed.load(
//   'http://feeds.feedburner.com/DenOfThieves-100ThievesPodcast',
//   function(err, rss) {
//     fs.writeFile('100T.json', JSON.stringify(rss, null, 2), err => {
//       if (err) throw err
//       console.log('File saved successfully')
//     })
//   }
// )
