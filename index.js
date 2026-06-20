// import は削除して、代わりにグローバル変数を使用
const { Player } = TextAliveApp;



// Unity に歌詞を送る関数
const animateWord = function (now, unit) {
  if (unit.contains(now)) {
    // Unity のオブジェクト LyricsReceiver の OnLyricsUpdate(string lyric) を呼ぶ
    SendMessage("LyricsReceiver", "OnLyricsUpdate", unit.text);
  }
};

// TextAlive Player を作成
const player = new Player({
  app: {
    token: "YWRByOT0TY6ysgdW",
  },
  mediaElement: null, // Unity では不要
});

// イベント登録
player.addListener({
  onAppReady,
  onVideoReady,
});

// TextAlive 初期化完了
function onAppReady(app) {
  // 曲URLが指定されていなければ読み込む
  if (!app.songUrl) {
    player.createFromSongUrl("https://piapro.jp/t/CyPO/20250128183915", {
      video: {
        beatId: 4694280,
        chordId: 2830735,
        repetitiveSegmentId: 2946483,
        lyricId: 67815,
        lyricDiffId: 20659
      },
    });
  }
}

// 動画（歌詞データ）が読み込まれたら呼ばれる
function onVideoReady(v) {
  // 各単語に animateWord をセット
  let w = player.video.firstWord;
  while (w) {
    w.animate = animateWord;
    w = w.next;
  }
}
