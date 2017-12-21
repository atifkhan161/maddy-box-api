const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('underscore');
const torrentStream = require('torrent-stream');
const downloadPath = "D:\\download\\tmp"
// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};


// Get query
router.post('/play', (req, res) => {
  const mpv = require('node-mpv');  
  var query = req.body.query;
  let mpvPlayer = new mpv();
  let file1 = "http://www.sample-videos.com/video/mkv/720/big_buck_bunny_720p_20mb.mkv";
  let torrent = "magnet:?xt=urn:btih:A1D0C3B0FD52A29D2487027E6B50F27EAF4912C5&dn=Deadpool&tr=udp://open.demonii.com:1337&tr=udp://tracker.istole.it:80&tr=http://tracker.yify-torrents.com/announce&tr=udp://tracker.publicbt.com:80&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://exodus.desync.com:6969&tr=http://exodus.desync.com:6969/announce";
  let engine = torrentStream(torrent, {
    tmp: 'D:/download/tmp',
  });

  engine.on('ready', function () {
    let file = _.find(engine.files, function (file) {
      let isVideo = false;
      if (file.path.endsWith('.avi') || file.path.endsWith('.mkv') || file.path.endsWith('.mp4')) {
        isVideo = true;
      }
      return isVideo;
    });
    // stream is readable stream to containing the file content
    file.select();
    mpvPlayer.load(engine.path + "\\" + file.path);
  });
});
module.exports = router;
