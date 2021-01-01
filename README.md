# Video Memo App

## Overview

This is a video learning support application that creates a list of videos from Youtube's PlayLis, etc., and assigns a rating (on a 5-point scale) to these videos, as well as what was learned, and allows you to check the list screen. In addition, the number of registered videos and the number of videos for which you have written notes are displayed on the list screen, allowing you to check your learning progress.

## Features

### Main functions

![image1](https://user-images.githubusercontent.com/45728258/103328275-8ebbf100-4a9b-11eb-8688-9680d4723131.png)

From left 
1. Top page (list of playlists)
It shows the name of the playlist, the total number of videos in each playlist, and the number of videos with memos.

1. VideoList page (a list of the respective playlists) 
There is a filter function by title name and a sorting function (rating, memo presence/absence, video release date).

1. Individual Video Page 
You can fill in a memo and enter a rating while playing a Youtube video.

### Login function (Firebase Auth)

![image2](https://user-images.githubusercontent.com/45728258/103328341-e65a5c80-4a9b-11eb-94ad-8cf46fd92840.png)

### Youtube Playlist csv download function

![image3](https://user-images.githubusercontent.com/45728258/103328420-3d603180-4a9c-11eb-9ea1-99665aa919c0.png)

## Initial Setup

1. Set up information about Yotube, Airtable, and Firebase in the .env file

1. Configure Airtable:Create a new base and set the PlayListIndex table and each VideoList table.

1. From the Settings screen, enter the PlaylistId of Youtube that you want to import.
The csv data will be output.Then, copy this csv file to the table of each VideoList in Airtable.

![image4](https://user-images.githubusercontent.com/45728258/103328428-418c4f00-4a9c-11eb-80c2-219de82dd2d2.png)

## Tech Stack

- NuxtJs
- Vuex
- FirebaseAuth
- Airtable（AirtableAPI）
- YoutubeAPI
- tailwindCSS

## Libraries

- [vue-star-rating](https://www.npmjs.com/package/vue-star-rating) 　
- [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) 　
- [vue-youtube](https://www.npmjs.com/package/vue-youtube) 　

## Function addition

1. The first time you register a PlayList, you do it in batches via a csv file, but you can automate the addition of VideoData by using the zappier and airtable integration functions.

1. The filled-in Videomemo data can also be deployed to a website via Airtable's API.

![image5](https://user-images.githubusercontent.com/45728258/103328431-451fd600-4a9c-11eb-84ab-16226970b795.png)

## Demo Url （id and password required）

[VideoMemoAppDemo](https://video-memo-demo.netlify.app/login)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```