const player = new TextAliveApp.Player({
  app: { token: "n5AtEkOImaNDVmCm" }
});

player.addListener({
  onAppReady(app) {
    if (!app.songUrl) {
      player.createFromSongUrl("https://piapro.jp/t/6W2N/20251215164617", {
        video: {
          beatId: 4827293,
          chordId: 2963754,
          repetitiveSegmentId: 3086261,
          lyricId: 126519,
          lyricDiffId: 28645,
        },
      });
    }
  },

  onTimeUpdate(position) {
    if (!player.video || !unityInstance) return;

    const char = player.video.findChar(position);
    if (char) {
      unityInstance.SendMessage("GameManager", "OnLyric", char.text);
    }
  }
});
