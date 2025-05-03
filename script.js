// 音乐数据配置（根据实际文件修改路径）
const songs = [
    {
      title: "爱的回归线(live)",
      file: "music/爱的回归线(live).mp3",
      cover: "images/爱的回归线(live).jpg",
      lyrics: [
        "[00:00.0]爱的回归线 (Live) - 单依纯",
        "[00:00.71]词：李双周/陈韵若/韦正",
        "[00:01.58]曲：陈韵若",
        "[00:01.89]编曲：王子@Soulkidz/姜禹",
        "[00:02.44]原唱：陈韵若/陈每文",
        "[00:03.16]制作人：王子@Soulkidz",
        "[00:03.46]吉他：Derrick Sepnio",
        "[00:03.63]音乐总监：刘卓@维伴音乐",
        "[00:04.5]合声/合声编写：王子@Soulkidz",
        "[00:05.29]演唱设计：王子@Soulkidz",
        "[00:05.84]PGM：孙维峰@维伴音乐",
        "[00:06.55]人声编辑：石行@维伴音乐",
        "[00:07.42]混音：黄可爱@维伴音乐",
        "[00:08.21]音乐统筹：郎梓朔@维伴音乐",
        "[00:09.16]制作团队：北京维伴文化传媒有限公司",
        "[00:10.42]SP：索尼音乐版权代理（北京）有限公司",
        "[00:11.62]爱 像镜子里自己的脸",
        "[00:18.17]当 越靠近越看不完全",
        "[00:24.4]本以为是苦是甜",
        "[00:27.51]心甘情愿 无悔无怨",
        "[00:33.54]当风景看一遍",
        "[00:38.82]心 在离别前荡起秋千",
        "[00:45.62]泪 只能转身后说抱歉",
        "[00:51.7]初见走到了再见",
        "[00:54.96]回到原点 曙光重现",
        "[01:00.83]爱凝结了时间",
        "[01:04.96]在爱的回归线",
        "[01:08.28]又期待会相见",
        "[01:11.84]天会晴 心会暖",
        "[01:14.28]阳光在手指间",
        "[01:18.63]童话剧情上演",
        "[01:22.020004]在某天再一次遇见",
        "[01:26.62]我们的脸一如从前没变",
        "[01:33.71]心 在离别前荡起秋千",
        "[01:40.619995]泪 只能转身后说抱歉",
        "[01:46.57]初见走到了再见",
        "[01:49.81]回到原点 曙光重现",
        "[01:55.66]爱凝结了时间",
        "[02:03.21]在爱的回归线",
        "[02:06.55]又期待会相见",
        "[02:09.97]天会晴心会暖",
        "[02:12.92]阳光在手指间",
        "[02:16.89]童话剧情上演",
        "[02:20.20999]在某天再一次遇见",
        "[02:24.93]我们的脸一如从前没变",
        "[02:31.76]有时放开一点",
        "[02:35.22]对爱也是种成全",
        "[02:38.73]心是你的就不会走远",
        "[02:45.58]每一段爱情都危险",
        "[02:48.91]每一对恋人都勇敢",
        "[02:52.57]下一个瞬间 是下一个永远",
        "[03:01.52]在爱的回归线",
        "[03:05.53]有期待终会有相见",
        "[03:08.51]天会晴心会暖",
        "[03:11.0]阳光在手指间",
        "[03:15.22]那落单的誓言",
        "[03:18.53]有牵挂就不会飞远",
        "[03:22.92]我们的脸一如从前",
        "[03:26.57]只一瞬间抵过沧海桑田",
      ]
    },
    {
      title: "唯一", 
      file: "music/唯一.mp3",
      cover: "images/唯一.jpg",
      lyrics: [
        "[00:00.00] 第二首歌前奏",
        "[00:06.30] 开始演唱部分"
      ]
    }
  ];
  
  // 播放器全局变量
  let currentTrack = 0;
  let isDragging = false;
  const player = document.getElementById('player');
  const playlistElem = document.getElementById('playlist');
  const progressBar = document.getElementById('progress');
  const volumeBar = document.getElementById('volume');
  const lyricsElem = document.getElementById('lyrics');
  const coverArt = document.getElementById('cover');
  
  // 初始化播放器
  function initPlayer() {
    // 设置默认音量
    player.volume = 0.5;
    
    // 构建播放列表
    songs.forEach((song, index) => {
      const trackItem = document.createElement('div');
      trackItem.className = 'playlist-item';
      trackItem.innerHTML = `
        <img src="${song.cover}" width="40" height="40">
        <span>${song.title}</span>
      `;
      trackItem.addEventListener('click', () => loadTrack(index));
      playlistElem.appendChild(trackItem);
    });
  
    // 加载第一首歌曲
    loadTrack(0);
  }
  
  // 加载指定曲目
  function loadTrack(index) {
    currentTrack = index;
    const song = songs[index];
    
    // 更新播放器源
    player.src = song.file;
    
    // 更新封面
    coverArt.src = song.cover;
    
    // 解析歌词
    parseLyrics(song.lyrics);
    
    // 高亮当前曲目
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
      item.style.backgroundColor = i === index ? '#f0f0f0' : 'transparent';
    });
  
    // 自动播放
    player.play();
  }
  
  // 播放/暂停切换
  function togglePlay() {
    if (player.paused) {
      player.play();
      coverArt.style.animationPlayState = 'running';
    } else {
      player.pause();
      coverArt.style.animationPlayState = 'paused';
    }
  }
  
  // 上一曲
  function prevTrack() {
    currentTrack = (currentTrack - 1 + songs.length) % songs.length;
    loadTrack(currentTrack);
  }
  
  // 下一曲
  function nextTrack() {
    currentTrack = (currentTrack + 1) % songs.length;
    loadTrack(currentTrack);
  }
  
  // 解析歌词
  function parseLyrics(rawLyrics) {
    const lyricsData = [];
    
    rawLyrics.forEach(line => {
      const timeMatch = line.match(/$(\d{2}):(\d{2}\.\d{2})$/);
      if (timeMatch) {
        const minutes = parseInt(timeMatch[1]);
        const seconds = parseFloat(timeMatch[2]);
        const text = line.split('] ')[1] || '';
        lyricsData.push({
          time: minutes * 60 + seconds,
          text: text
        });
      }
    });
  
    // 歌词同步
    player.addEventListener('timeupdate', updateLyrics);
    
    function updateLyrics() {
      if (!isDragging) {
        const currentTime = player.currentTime;
        for (let i = 0; i < lyricsData.length; i++) {
          if (currentTime < lyricsData[i].time) {
            const displayLine = i > 0 ? lyricsData[i-1].text : '';
            lyricsElem.textContent = displayLine;
            break;
          }
        }
      }
    }
  }
  
  // 进度条控制
  progressBar.addEventListener('input', (e) => {
    isDragging = true;
    const seekTime = (e.target.value / 100) * player.duration;
    player.currentTime = seekTime;
  });
  
  progressBar.addEventListener('change', () => {
    isDragging = false;
  });
  
  player.addEventListener('timeupdate', () => {
    if (!isDragging && player.duration) {
      const progress = (player.currentTime / player.duration) * 100;
      progressBar.value = progress;
    }
  });
  
  // 音量控制
  volumeBar.addEventListener('input', (e) => {
    player.volume = e.target.value;
  });
  
  // 歌曲结束时自动下一首
  player.addEventListener('ended', nextTrack);
  
  // 初始化播放器
  document.addEventListener('DOMContentLoaded', initPlayer);
  