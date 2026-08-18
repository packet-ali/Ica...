/* =========================================================
   TIMELINE DATA
   OUR LITTLE UNIVERSE
========================================================= */

/*
  =========================================================
  CARA MENAMBAH MEMORY

  Tinggal tambahkan object baru ke dalam array.

  Contoh:

  {
      day: "24",
      month: "December",
      year: "2024",

      title: "A Little Moment",

      description:
          "Cerita tentang memory ini...",

      image:
          "/images/timeline/05.jpg",

      orientation: "landscape",
  }

  =========================================================
  ORIENTATION FOTO

  "landscape" = frame 4:3
  "portrait"  = frame 3:4

  Jadi kamu cukup menentukan orientasi setiap foto
  di bagian "orientation".

  Tidak perlu mengubah Timeline.jsx untuk setiap foto.
  =========================================================
*/


export const timelineData = [

    {
        day: "17",
        month: "August",
        year: "2024",

        title:
            "The Beginning",

        description:
            "Hari ketika semuanya bermula. Sebuah awal kecil yang mungkin terlihat sederhana, tapi ternyata membawa kita ke begitu banyak cerita setelahnya.",

        image:
            "/images/timeline/IMG_20260816_204902_213.jpg",

        orientation:
            "landscape",
    },


    {
        day: "03",
        month: "September",
        year: "2024",

        title:
            "Little Things",

        description:
            "Tentang hal-hal kecil yang mungkin tidak pernah kita anggap penting saat itu, tapi sekarang justru menjadi bagian dari kenangan yang paling ingin aku simpan.",

        image:
            "/images/timeline/02.jpg",

        orientation:
            "landscape",
    },


    {
        day: "21",
        month: "December",
        year: "2024",

        title:
            "One More Memory",

        description:
            "Ada banyak hal yang terjadi di antara awal dan hari ini. Dan entah bagaimana, setiap potongan kecilnya membuat perjalanan ini terasa semakin berarti.",

        image:
            "/images/timeline/03.jpg",

        orientation:
            "landscape",
    },


    {
        day: "14",
        month: "February",
        year: "2025",

        title:
            "Still Here",

        description:
            "Kalau aku melihat kembali semua yang sudah kita lewati, mungkin yang paling aku syukuri bukan hanya setiap momennya, tapi karena aku bisa melewatinya bersamamu.",

        image:
            "/images/timeline/04.jpg",

        orientation:
            "landscape",
    },

];