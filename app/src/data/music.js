/* =========================================================
   MUSIC DATA
   OUR LITTLE UNIVERSE
========================================================= */

/*
  =========================================================
  CARA MENAMBAHKAN / MENGUBAH LAGU

  Setiap lagu memiliki:

  title  = judul lagu
  artist = nama artist
  cover  = lokasi foto cover
  audio  = lokasi file audio
  lyrics = potongan lirik

  Untuk lirik:

  Setiap item dalam array = SATU BARIS.

  Jadi kamu bebas menentukan kapan lirik berganti baris.

  Contoh:

  lyrics: [
    "Baris pertama",
    "Baris kedua",
    "",
    "Baris setelah jeda"
  ]

  String kosong ("") akan membuat jarak antar bagian lirik.
  =========================================================
*/

export const musicData = [

  /* =======================================================
     SONG 01
  ======================================================= */

  {
    id: 1,

    title: "Photograph",

    artist: "Ed Sheeran",

    cover:
      "/images/music/photograph.jpg",

    audio:
      "/audio/music/photograph.mp3",

    lyrics: [
      "Masukkan potongan lirik",
      "lagu pertama di sini.",
      "",
      "Baris berikutnya",
      "bisa kamu atur sendiri."
    ],
  },


  /* =======================================================
     SONG 02
  ======================================================= */

  {
    id: 2,

    title: "Song Two",

    artist: "Artist Name",

    cover:
      "/images/music/song-2.jpg",

    audio:
      "/audio/music/song-2.mp3",

    lyrics: [
      "Masukkan potongan lirik",
      "untuk lagu kedua di sini.",
      "",
      "Kamu bisa membuat",
      "baris baru sesuka hati."
    ],
  },


  /* =======================================================
     SONG 03
  ======================================================= */

  {
    id: 3,

    title: "Song Three",

    artist: "Artist Name",

    cover:
      "/images/music/song-3.jpg",

    audio:
      "/audio/music/song-3.mp3",

    lyrics: [
      "Masukkan potongan lirik",
      "untuk lagu ketiga di sini.",
      "",
      "Setiap item adalah",
      "satu baris lirik."
    ],
  },


  /* =======================================================
     SONG 04
  ======================================================= */

  {
    id: 4,

    title: "Lewat Sudah Pukul Dua, Makin Banyak Bicara Kita",

    artist: "Sal Priadi",

    cover:
      "/Images/music/Screenshot_20260818-195003.png",

    audio:
      "/audio/music/song-4.mp3",

    lyrics: [
      "Kita jangan jadi tua dan membosankan",
      "S'lamanya janjinya menyenangkan oh",
      "",
      "S'lamanya menyenangkan",
      "S'lamanya mengesankan",
      "S'lamanya menenangkan",
      "S'lamanya menyenangkan"
    ],
  },

];
