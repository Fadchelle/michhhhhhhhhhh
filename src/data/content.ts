// Data konten untuk MichieHots
// 
// SISTEM VIDEO TERINTEGRASI DENGAN GOOGLE DRIVE:
// - Total: 15 kategori dengan real Google Drive URLs
// - Sistem deteksi otomatis: hanya tampilkan episode dengan video asli
// - Trending hero section menggunakan episode dengan video valid
// - Cards series responsif dengan episode counter yang akurat
// - Status: 8 kategori lengkap (12 ep), 7 kategori sebagian (5-11 ep)
export interface Episode {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
  rating?: number;
  views?: string;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  year: number;
  quality: string;
  rating: number;
  genre: string[];
  mature?: boolean;
  episodes: Episode[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  series: Series[];
}

// Sample Google Drive video links (placeholder) - Total 50+ URLs untuk rotasi
// CARA MENGISI VIDEO ASLI:
// 1. Upload video ke Google Drive
// 2. Klik kanan → Get link → Set "Anyone with the link can view"
// 3. Ubah format dari: https://drive.google.com/file/d/FILE_ID/view
//    Menjadi: https://drive.google.com/file/d/FILE_ID/preview
// 4. Ganti URLs di bawah dengan link Google Drive asli Anda

const sampleVideoUrls = [
  // Michooy - Episodes 1-12 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1-g8sxy5Jyec6uxkJL4hh1zvyJWKye2ok/preview",
  "https://drive.google.com/file/d/1-zdY2u4GRaGlCLqW5Ii7FD9SJ1SeW6fN/preview",
  "https://drive.google.com/file/d/10tPGS4z8w3upToRLGwTP9s6nSQVteuCK/preview",
  "https://drive.google.com/file/d/11Qhhbm8aYvORZgaBxaZIwKcX6O2wBaHx/preview",
  "https://drive.google.com/file/d/11scHOXHneWwabI1VZPyMDk1TnWqopRO6/preview",
  "https://drive.google.com/file/d/12BhnXyR21g2Y2c2VT8R-PasQsGymWYuK/preview",
  "https://drive.google.com/file/d/12qQliLd0qBQvv3Zd9SFmQI1YJLNem2pO/preview",
  "https://drive.google.com/file/d/13EzdltQcW3KmjL-tQK0MEPbWosyBpmiI/preview",
  "https://drive.google.com/file/d/13MVnb5oOm55gORrM2sDNnbL4IkoSzmhQ/preview",
  "https://drive.google.com/file/d/13cbvrv6njgFKyO7wdkWxyNLj_fp87GKO/preview",
  "https://drive.google.com/file/d/1YbqDWxJp7nKYZAuRSTXkswOO3H3Q9Ha2/preview",
  "https://drive.google.com/file/d/1h_2JzLg_UlhXp8-7wspUpGnJ733aPCMS/preview",
  
  // Michelle - Episodes 13-24 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1-ujrALAERXIeH-JMBmIBRNKvSxzczohd/preview",
  "https://drive.google.com/file/d/10R8NtBQcr6ZmxlUxxhdjxTZweumni9rG/preview",
  "https://drive.google.com/file/d/110TX0H4AefpZ35qF3O3nylSIv2CcTdWC/preview",
  "https://drive.google.com/file/d/11Up8IaqHHT0_ghxTkt2uFxYkismnNI53/preview",
  "https://drive.google.com/file/d/11vVbM953lSYAnvKGMAkOj0TMae6h00gx/preview",
  "https://drive.google.com/file/d/12PXNtJsU1CCeiI_t-ksk9qpmJvngTepo/preview",
  "https://drive.google.com/file/d/12tgT8a5jFSwUcstECZHmO6wiBauoxEVp/preview",
  "https://drive.google.com/file/d/13F6SEA0q659mIc2JPDSYhr5en45yRqdb/preview",
  "https://drive.google.com/file/d/13RjGkFD2-GEHc0J5cSgvKPrCJcdD1wK3/preview",
  "https://drive.google.com/file/d/13fJuQTwNzjMNIfljhHFytaRLMX8DzuL2/preview",
  "https://drive.google.com/file/d/1YjUI6L6yfAlnNA6PljOSs2YVEGBcbOmO/preview",
  "https://drive.google.com/file/d/1hazt-8p018FUcS-vHgN8qeunqtYmYXGm/preview",
  
  // Michoooos - Episodes 25-36 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1-t1ksFecI2EtvKJDFWrJoSBfPUQuYAMp/preview",
  "https://drive.google.com/file/d/10V1dw6pQowBJuKyvkR2h_sJTL9r8tvJX/preview",
  "https://drive.google.com/file/d/11GjPXo1fz4Uch_Lc7zR2s8ao7MLUsaEU/preview",
  "https://drive.google.com/file/d/11iSb3X5GJGA933MfoPvfzH6OVaaIn7Gc/preview",
  "https://drive.google.com/file/d/13acGKZe7fpWj92TUM0Pufnx7SyoUzZgv/preview",
  "https://drive.google.com/file/d/12jIKhqPVIOIzRJSkvPlgjOGRNJrHNFaF/preview",
  "https://drive.google.com/file/d/12zv0Kqqs2TiA_P5KxpeVlq4P8cTv0UJF/preview",
  "https://drive.google.com/file/d/13I9Ogy1mSnBPhycaUGQPfFzHChN5aJqS/preview",
  "https://drive.google.com/file/d/13T5rL4Hb30pnWCpblgjRrUXAgPX5tvUs/preview",
  "https://drive.google.com/file/d/13txxe_6UuiN26k2JPcl60W3u04wVGaIy/preview",
  "https://drive.google.com/file/d/1Yvd_6P_J98s5VKku1KoR9v5QLnh9P8MJ/preview",
  "https://drive.google.com/file/d/1hbE8TwJk5IGc_a-oGpDY9xpEJSOPRSC0/preview",
  
  // Michsx - Episodes 37-48 (Real Google Drive URLs)
  "https://drive.google.com/file/d/10Kuk0u5MI-N9q454IcQWV7nsoKPTA907/preview",
  "https://drive.google.com/file/d/10_UWhxCbDRWASIfxEfUpxRVBzbK8zljn/preview",
  "https://drive.google.com/file/d/11PSDRwxMY9brJ2-PiQXNnpHQ6tNnXCrT/preview",
  "https://drive.google.com/file/d/11m-GoFjQhKcfh8oekb1v5Bz-GyknGwls/preview",
  "https://drive.google.com/file/d/125tKtgEg1MUclDEqIQT9GvCPY2bVz8Dk/preview",
  "https://drive.google.com/file/d/12kdphv5nooxqSV9JzoV25msBvhZEmtmx/preview",
  "https://drive.google.com/file/d/13A2rAYMSKrsNdiM190rqgem19aBngLjH/preview",
  "https://drive.google.com/file/d/13LV_1KLq5qR5TIPHWYV6qEKWxW7PnUKt/preview",
  "https://drive.google.com/file/d/13WKVdi_ukwQ3taMtT8-9jyswitc_m3Tk/preview",
  "https://drive.google.com/file/d/13wW8nbvS8MXwR3Z_otN8y4MpVK2ekoRk/preview",
  "https://drive.google.com/file/d/1YzHNsvq7THYiBzkzPaG49Uy7_pv7StTp/preview",
  "https://drive.google.com/file/d/1hd7nbXJtKurgGlj4ThDXtJPJPpn7hRbw/preview",
  
  // Michahhs - Episodes 49-60 (Real Google Drive URLs, ep 10 is empty in source)
  "https://drive.google.com/file/d/10IstP0OWslhov6YTmbZuF344K4aoYeMi/preview",
  "https://drive.google.com/file/d/10eqdyTfmWxTM85lquSBF3Jj6q71bg8K8/preview",
  "https://drive.google.com/file/d/11QUUa0vqWUV9E4b1QiQZ8ieX_gsma_wL/preview",
  "https://drive.google.com/file/d/11sNpx22M9zRhadsvLNmuC9IXIA6NwUE8/preview",
  "https://drive.google.com/file/d/127C1QeiCcn6L3XTVy_pfPIW6gIXuRTTY/preview",
  "https://drive.google.com/file/d/12mdT2w0TQhk3mkjyjL-P91al6Xb85kyV/preview",
  "https://drive.google.com/file/d/13E-MuDzav7rI-7m23nTip5cR1ENUs_Ux/preview",
  "https://drive.google.com/file/d/13MInrK2LXdt6wCj2N4JX5N1Fxpd6m1Js/preview",
  "https://drive.google.com/file/d/13YMIPvE197Yn4M5UCmPeg2lVktbjtAAR/preview",
  "", // Episode 10 is empty in source data
  "https://drive.google.com/file/d/1Z9xtaZvLzOfbzK6esMt5YA1wQHHRdfs6/preview",
  "https://drive.google.com/file/d/1heZDsqcWupkgO5RvKVJS3nkMOSWc7YxZ/preview",
  
  // Michneo - Episodes 61-72 (Real Google Drive URLs, only 5 available)
  "https://drive.google.com/file/d/1Rz0_UpAUcaIyec1Wb00Pw8snWfMBhQHw/preview",
  "https://drive.google.com/file/d/1RXh6JtJbddpxQ1h2jIQZ4N6HpWBehEq9/preview",
  "https://drive.google.com/file/d/1UocvW3DvL_BUBPyKjxNKzgkgUgcOIhlO/preview",
  "https://drive.google.com/file/d/1UAcevg-22Msnryc2IMOuod9co13ICyWj/preview",
  "https://drive.google.com/file/d/1VQ-SppVZrQpDVhMlc1x8I1AbdmdvUPbi/preview",
  "", // Episodes 6-12 not available yet
  "", 
  "",
  "",
  "",
  "",
  "",
  
  // Michraw - Episodes 73-84 (Real Google Drive URLs, only 5 available, one needs fixing)
  "https://drive.google.com/file/d/1RxrEXMY61UK9-JRRAaf980ocXFAGUoJP/preview",
  "https://drive.google.com/file/d/1V3hZl-fWefVENDFJhSimezedrE3u9G9h/preview",
  "https://drive.google.com/file/d/1Ui0JcZz2y8-lgwGlPbirjR0wLKdnvGpT/preview",
  "https://drive.google.com/file/d/1U7Tj52RIjcZCS00yF4nFXba_SMFFoYse/preview",
  "https://drive.google.com/file/d/1Xe8w5g_4J9lPtXvCpEQE6asFWX2mRWUh/preview", // Fixed from /view to /preview
  "", // Episodes 6-12 not available yet
  "",
  "",
  "",
  "",
  "",
  "",
  
  // Michsnap - Episodes 85-96 (Real Google Drive URLs, only 5 available, one needs fixing)
  "https://drive.google.com/file/d/1RkP6d0BjUuN3lmVA9j2SkouwnBRZ3cHn/preview",
  "https://drive.google.com/file/d/1UqdoXsGY-HR6TObsGeYF6_wakfXL4eSr/preview",
  "https://drive.google.com/file/d/1UMEQ_vc1b8vdxFRM4CQQnmdUo4UWt_5L/preview",
  "https://drive.google.com/file/d/1TqsJs1JzhkbU7cc8j6fEawDwjEmXA3Cz/preview",
  "https://drive.google.com/file/d/1YQz-eaFw0Vo6wJLd9GZXHriS3P8CQ9xa/preview", // Fixed from /view to /preview
  "", // Episodes 6-12 not available yet
  "",
  "",
  "",
  "",
  "",
  "",
  
  // Ngabalex - Episodes 97-108 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1hcIAEPkpZ6ejakbScxCGlP98IWPbfBqC/preview",
  "https://drive.google.com/file/d/1htbpV1y0FK6oP2tuxkmzAc2qqaOABV51/preview",
  "https://drive.google.com/file/d/17etKgfl8gjUYvu01s4BbNbLZn4HY94i8/preview",
  "https://drive.google.com/file/d/18G93K36h36dv0I_j1nIgbY-B3dj0b9lj/preview",
  "https://drive.google.com/file/d/187_cj39oKmA8wgfo4JGziSllqDZDlnpp/preview",
  "https://drive.google.com/file/d/17oPcLMS22yVKR5P9NaKzNdYdVVLf1kF6/preview",
  "https://drive.google.com/file/d/18MdVz6tVDB_NnE8Pp84V6SLtT0cm7qXP/preview",
  "https://drive.google.com/file/d/1RQm-yiDJh2d4Tap39CCo80ibwGvUXj95/preview",
  "https://drive.google.com/file/d/1RL6JVP-v8hgz1LVF4ZuTLLBuI7ZwKNoE/preview",
  "https://drive.google.com/file/d/1RK4oexTlbEiPSBryqLAL_MGQXok3aMNW/preview",
  "https://drive.google.com/file/d/1RGLcHLjHy2WipxBkla6l7fCQUVEq9xDB/preview",
  "https://drive.google.com/file/d/1RAfihIiSPU0ye4qQXfAjoRf9wcphpwBD/preview",
  
  // Mecistop - Episodes 109-120 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1i0zNU6HJgYoj1ZtfYflps6tzuGpaXox0/preview",
  "https://drive.google.com/file/d/1i4LRwHl5SfcTRwRS6buLSQwQAkt7N4fW/preview",
  "https://drive.google.com/file/d/17hl6K7DD2SbnHZ977Jat6UUUv2uYzqo6/preview",
  "https://drive.google.com/file/d/18ELR1_6qf9gSMp4rfifilhkovCks6vDG/preview",
  "https://drive.google.com/file/d/17xbYoH4nH7Qarhl83tN2ijL1wVLVCf22/preview",
  "https://drive.google.com/file/d/18UYUd1fYAzXqOCBN0qnkHK79iAx6rZTZ/preview",
  "https://drive.google.com/file/d/18M1oOzzEnUsycOzs8OOP2gcN-0EHeNJB/preview",
  "https://drive.google.com/file/d/1Tf_--DfJZ3EqqKsqZK9ZSVviwOsH11io/preview",
  "https://drive.google.com/file/d/1ToLwyrKleH3v7FNJOrXNuU1w5i3bHb-G/preview",
  "https://drive.google.com/file/d/1V7sEEVKOBX_9LzDSNtdgZ3AxdWPz9jTE/preview",
  "https://drive.google.com/file/d/1V4BXcW-0ovHVu5STYotCuJ5F0xY0uM2B/preview",
  "https://drive.google.com/file/d/1Tan8nSRAyksA5BOxoz3qcO3DXLsOCcnp/preview",
  
  // Cece - Episodes 121-132 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1hwwG883Sbmj70tInixclN2zCwHLLNeo0/preview",
  "https://drive.google.com/file/d/1iFHLpTQG9IZBY2VnC5_wHWcBxnQERcXZ/preview",
  "https://drive.google.com/file/d/18J6pL0ql7nQod1GxNYpsbtLJvm8s9B_6/preview",
  "https://drive.google.com/file/d/18DZh7OWwGtHzCJVHgvsnbbAaUX7pxDdK/preview",
  "https://drive.google.com/file/d/17tLyq05QfDxWfVu9xRHsCCkbE0iSDQs/preview",
  "https://drive.google.com/file/d/17n054zdkda18WMhekvPkqjBwK2a15DAc/preview",
  "https://drive.google.com/file/d/18LCbp3RQyrJOSsb8erDhNkszHpq8LZVf/preview",
  "https://drive.google.com/file/d/1TQAuIcGAONMFxO13Sa5pX2YGmR292QUV/preview",
  "https://drive.google.com/file/d/1TNQU_24Jue8RvSZCCjbTzae645Gz_ll8/preview",
  "https://drive.google.com/file/d/1TG60CZt8NsdC7K7D3fmxGjJS9bYkGVL9/preview",
  "https://drive.google.com/file/d/1TDdxbXVpjotaRy2Di5NCNNQwA0AIC3t_/preview",
  "https://drive.google.com/file/d/1T6v5auf7G60Wys44rTvcLo2fVACGa-jX/preview",
  
  // Michieer - Episodes 133-144 (Real Google Drive URLs)
  "https://drive.google.com/file/d/1hkBAeJUDPmTBdpTctLrNWrfkQOi1QpjK/preview",
  "https://drive.google.com/file/d/18GkYSLn0V-PLXCQnOsyfsquRDvxiAMZr/preview",
  "https://drive.google.com/file/d/188FhwWesW1LdgmV08dmMzwXAlZGZSxpX/preview",
  "https://drive.google.com/file/d/17r2zZPkI0MlL3A7PtsuiTB8kWr_3tie0/preview",
  "https://drive.google.com/file/d/18Pw7CxJSGnvoOL_KBXJpcsfMVc6G5dLp/preview",
  "https://drive.google.com/file/d/18Vn8pyuLsRODSaWrkWl1Tg2cu3hgimuV/preview",
  "https://drive.google.com/file/d/1SsApeCze2QEWjl-7vnKRS7LtLxM_35qP/preview",
  "https://drive.google.com/file/d/1SOnWfMFAAhhwe8hARZjxxgTPVQrzrm2K/preview",
  "https://drive.google.com/file/d/1SLdoiac5VOany2VeL8UHsMvt_Bqlrazu/preview",
  "https://drive.google.com/file/d/1SJWdrZx21hOQnyKa9RQoU36QtUD_FsIE/preview",
  "https://drive.google.com/file/d/1S3M7ZibkWuadK4zxFQSJrkr2gzvT9Ony/preview",
  "https://drive.google.com/file/d/1S0RozSss4_8wRy8USl7fm-sSSQfU0CKq/preview",
  
  // Michidark (previously Mimpi Buruk) - Episodes 145-156 (Using michdream data for now, only 5 available)
  "https://drive.google.com/file/d/1Rw4LhiaSrd-XR7pvWUk0m6hDvl2MBurp/preview",
  "https://drive.google.com/file/d/1UnTxS7MdIGs-yGi7eRzo-Fc3jrD6o0t9/preview",
  "https://drive.google.com/file/d/1UagTZqIZnndSwuzFrCQ8LXXAoWyEOZnZ/preview",
  "https://drive.google.com/file/d/1TtYWQEvV3co8CRZYlJDG1bOQGzy7IRue/preview",
  "https://drive.google.com/file/d/1XgdYgofZBMdWB2qkLf3Ptrt8xJdIgoH1/preview",
  "", // Episodes 6-12 not available yet
  "",
  "",
  "",
  "",
  "",
  "",
  
  // Michdark - Episodes 157-168 (Real Google Drive URLs, only 5 available)
  "https://drive.google.com/file/d/1Ro3HtXRf6jrYMtZhd-Ea-DJQClWbXwg7/preview",
  "https://drive.google.com/file/d/1V1zeOOlcDrXdO5m7VnMUpJE9Fyi7Y22C/preview",
  "https://drive.google.com/file/d/1UQz6lhvNkv2Q47W4npxKaaOAO7AH2DUh/preview",
  "https://drive.google.com/file/d/1TsEVxttHeFq6NsCFdsu-WlM3iBbTdadD/preview",
  "https://drive.google.com/file/d/1YPULzAKQYd0weDA2ockprYjkri8eaG1H/preview",
  "", // Episodes 6-12 not available yet
  "",
  "",
  "",
  "",
  "",
  "",
  
  // Michlite - Episodes 169-180 (Real Google Drive URLs, only 5 available)
  "https://drive.google.com/file/d/1Rnz0OV3pbaMFP_ahvp9Hb335eMBLlE6r/preview",
  "https://drive.google.com/file/d/1UqhJUHnizPumjh24hJ-JRdPrvOZo2p4f/preview",
  "https://drive.google.com/file/d/1UNAnRkAINgSv68RNFeangM46CwAOJt_z/preview",
  "https://drive.google.com/file/d/1Trv0RbxYkXbUH7KGOrwoKy7ycg2DEEB_/preview",
  "https://drive.google.com/file/d/1YUVeelTkQKsaqj2osyp8ja8QmHwDWqC7/preview",
  "", // Episodes 6-12 not available yet
  "",
  "",
  "",
  "",
  "",
  ""
  
  // TOTAL: 180 slots dengan real Google Drive URLs yang tersedia
  // ✅ LENGKAP (12 episode): Michooy, Michelle, Michoooos, Michsx, Ngabalex, Mecistop, Cece, Michieer
  // ⚠️  SEBAGIAN (5-9 episode): Michahhs (11 ep, 1 kosong), Michneo (5 ep), Michraw (5 ep), Michsnap (5 ep), Michidark (5 ep), Michdark (5 ep), Michlite (5 ep)
  // Sistem otomatis akan hanya menampilkan episode dengan video asli (bukan kosong)!
];

// Category-specific images from Catbox + Unsplash for variety
const seriesImages = [
  "https://files.catbox.moe/dnyaor.jpg",    // 0: Michooy
  "https://files.catbox.moe/ibj4a2.jpg",   // 1: Michelle  
  "https://files.catbox.moe/m2hd2v.jpeg",  // 2: Michoooos
  "https://files.catbox.moe/4tjwfo.jpeg",  // 3: Michsx
  "https://files.catbox.moe/fgynpk.jpeg",  // 4: Michahhs
  "https://files.catbox.moe/skijvp.jpg",   // 5: Michneo
  "https://files.catbox.moe/cvstos.jpg",   // 6: Michraw
  "https://files.catbox.moe/wslozw.jpg",   // 7: Michsnap
  // Mix Catbox with new requested images
  "https://files.catbox.moe/cd978r.jpeg",   // 8: Ngabalex (updated)
  "https://files.catbox.moe/aspao4.jpg",    // 9: Mecistop (updated)
  "https://files.catbox.moe/m2hd2v.jpeg",  // 10: Cece (keep Catbox)
  "https://files.catbox.moe/4tjwfo.jpeg",  // 11: Michieer (keep Catbox)
  "https://files.catbox.moe/9ex3m1.jpg",   // 12: Michidark (updated name and image)
  "https://files.catbox.moe/skijvp.jpg",   // 13: Michdark (keep dark image)
  "https://files.catbox.moe/vjj2c5.jpg"    // 14: Michlite (updated image)
];

// Episode thumbnails - 12 unique Catbox images + Unsplash extras for episodes
const episodeThumbnails = [
  // Original 12 Catbox images
  'https://files.catbox.moe/veo8xt.jpg',
  'https://files.catbox.moe/cup0oo.jpg', 
  'https://files.catbox.moe/ykxq8z.jpg',
  'https://files.catbox.moe/aawogf.jpg',
  'https://files.catbox.moe/ff9jsh.jpg',
  'https://files.catbox.moe/4slru7.jpg',
  'https://files.catbox.moe/ogfxvq.jpg',
  'https://files.catbox.moe/we0m7r.jpg',
  'https://files.catbox.moe/olk4r3.jpg',
  'https://files.catbox.moe/z8yrl4.jpg',
  'https://files.catbox.moe/yebrss.jpg',
  'https://files.catbox.moe/f8mpa5.jpg',
  // Additional Unsplash images for variety
  'https://images.unsplash.com/photo-1548328928-34db1c5fcc1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHJlYW1pbmclMjB2aWRlbyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU2ODIzODkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1572188863110-46d457c9234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwbW92aWUlMjBwb3N0ZXJzJTIwY2luZW1hfGVufDF8fHx8MTc1NjgyMzg5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1598640965743-4d67f6b47956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwdHYlMjBzaG93JTIwdGh1bWJuYWlsc3xlbnwxfHx8fDE3NTY4MjM5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1695114584354-13e1910d491b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHNjZW5lJTIwZHJhbWF0aWN8ZW58MXx8fHwxNzU2ODIzOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1643677841226-d6427625f118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGhyaWxsZXIlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NTY3ODEwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
];

const genres = [
  ["Action", "Thriller"],
  ["Drama", "Romance"],
  ["Horror", "Supernatural"],
  ["Sci-Fi", "Adventure"],
  ["Mystery", "Crime"],
  ["Comedy", "Family"],
  ["Documentary", "Biography"],
  ["Fantasy", "Magic"],
  ["War", "History"],
  ["Western", "Classic"]
];

const categoryDescriptions = [
  "Konten premium dengan aksi mendebarkan",
  "Drama romantis yang mengharukan",
  "Series eksklusif penuh misteri",
  "Petualangan futuristik yang memukau",
  "Kisah gelap dan menegangkan",
  "Konten avant-garde yang revolusioner",
  "Series dokumenter yang menginspirasi",
  "Konten viral dan trending",
  "Series klasik yang legendaris",
  "Konten premium berkualitas tinggi",
  "Series eksklusif untuk dewasa",
  "Konten orisinal yang menghibur",
  "Thriller psikologis yang mencekam",
  "Series gelap dan intens",
  "Konten ringan dan menggembirakan"
];

// Generate episodes for each series dengan unique video URLs
const generateEpisodes = (seriesName: string, categoryIndex: number, count: number = 12): Episode[] => {
  return Array.from({ length: count }, (_, i) => {
    // Calculate unique video index for each episode across all categories
    const videoIndex = (categoryIndex * count) + i;
    
    return {
      id: `${seriesName.toLowerCase().replace(/\s+/g, '-')}-ep-${i + 1}`,
      title: `Episode ${i + 1}`,
      videoUrl: sampleVideoUrls[videoIndex] || "", // Handle undefined URLs with empty string
      thumbnail: episodeThumbnails[((categoryIndex * count) + i) % episodeThumbnails.length], // Always cycle through all available thumbnails
      duration: `${Math.floor(Math.random() * 30) + 15}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      description: `Episode ${i + 1} dari series ${seriesName}. ${getEpisodeDescription(seriesName, i + 1)}`,
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
      views: `${Math.floor(Math.random() * 900 + 100)}K`
    };
  });
};

// Generate unique episode descriptions
const getEpisodeDescription = (seriesName: string, episodeNum: number): string => {
  const descriptions = [
    "Petualangan yang mendebarkan dimulai dengan aksi yang spektakuler.",
    "Misteri mulai terungkap dengan plot twist yang mengejutkan.",
    "Karakter utama menghadapi tantangan terbesar dalam hidupnya.",
    "Drama emosional yang akan membuat Anda terhanyut dalam cerita.",
    "Action-packed episode dengan visual effects yang memukau.",
    "Romantisme dan intrik politik berpadu dalam episode yang menawan.",
    "Klimaks yang telah ditunggu-tunggu akhirnya tiba dengan kejutan besar.",
    "Flashback mengungkap rahasia masa lalu yang mengubah segalanya.",
    "Persahabatan diuji dalam situasi yang penuh tekanan dan bahaya.",
    "Finale yang epic dengan resolution yang memuaskan namun mengejutkan.",
    "Plot baru dimulai dengan karakter dan konflik yang fresh.",
    "Episode final season dengan ending yang akan memukau penonton."
  ];
  
  return descriptions[(episodeNum - 1) % descriptions.length];
};

// Generate series for each category
const generateSeries = (categoryName: string, index: number): Series[] => {
  const imageIndex = index; // Use direct index to match category order
  const genreSet = genres[index % genres.length];
  
  return [{
    id: `${categoryName.toLowerCase().replace(/\s+/g, '-')}-series`,
    title: categoryName,
    description: categoryDescriptions[index % categoryDescriptions.length],
    thumbnail: seriesImages[imageIndex], // Use category-specific image
    heroImage: seriesImages[imageIndex], // Use same image for hero and thumbnail for consistency
    year: 2022 + Math.floor(Math.random() * 3), // 2022-2024
    quality: Math.random() > 0.3 ? "4K" : "HD",
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 - 5.0
    genre: genreSet,
    mature: Math.random() > 0.7, // 30% chance of mature content
    episodes: generateEpisodes(categoryName, index) // Pass category index for unique videos
  }];
};

// Kategori dengan gambar Catbox yang sesuai (indeks sesuai dengan seriesImages array)
export const categories: Category[] = [
  { id: "michooy", name: "Michooy", description: "Konten eksklusif dengan aksi yang mendebarkan", series: generateSeries("Michooy", 0) },          // dnyaor.jpg
  { id: "michelle", name: "Michelle", description: "Drama romantis yang mengharukan dan inspiratif", series: generateSeries("Michelle", 1) },        // ibj4a2.jpg
  { id: "michoooos", name: "Michoooos", description: "Series penuh misteri dan petualangan seru", series: generateSeries("Michoooos", 2) },         // m2hd2v.jpeg
  { id: "michsx", name: "Michsx", description: "Konten dewasa dengan cerita yang kompleks", series: generateSeries("Michsx", 3) },                  // 4tjwfo.jpeg
  { id: "michahhs", name: "Michahhs", description: "Komedi cerdas yang menghibur sepanjang hari", series: generateSeries("Michahhs", 4) },          // fgynpk.jpeg
  { id: "michneo", name: "Michneo", description: "Sci-fi futuristik dengan teknologi canggih", series: generateSeries("Michneo", 5) },              // skijvp.jpg
  { id: "michraw", name: "Michraw", description: "Dokumenter dan konten edukasi berkualitas", series: generateSeries("Michraw", 6) },               // cvstos.jpg
  { id: "michsnap", name: "Michsnap", description: "Konten viral dan trending terkini", series: generateSeries("Michsnap", 7) },                   // wslozw.jpg
  { id: "ngabalex", name: "Ngabalex", description: "Fantasy dan dunia magis yang memukau", series: generateSeries("Ngabalex", 8) },                // cd978r.jpeg (updated)
  { id: "mecistop", name: "Mecistop", description: "Thriller dan suspense yang mencekam", series: generateSeries("Mecistop", 9) },                 // aspao4.jpg (updated)
  { id: "cece", name: "Cece", description: "Konten keluarga yang hangat dan menyentuh", series: generateSeries("Cece", 10) },                      // m2hd2v.jpeg (reuse)
  { id: "michieer", name: "Michieer", description: "Series orisinal dengan cerita unik", series: generateSeries("Michieer", 11) },                 // 4tjwfo.jpeg (reuse)
  { id: "michidark", name: "Michidark", description: "Horror dan supernatural yang menakutkan", series: generateSeries("Michidark", 12) },   // 9ex3m1.jpg (updated)
  { id: "michdark", name: "Michdark", description: "Konten gelap dengan plot yang dalam", series: generateSeries("Michdark", 13) },                // skijvp.jpg (keep existing)
  { id: "michlite", name: "Michlite", description: "Konten ringan dan santai untuk bersantai", series: generateSeries("Michlite", 14) }            // vjj2c5.jpg (updated)
];

// Enhanced trending content with smarter rotation
let lastShownCategories: string[] = [];
let rotationIndex = 0;

export const getTrendingContent = () => {
  // Get categories with valid episodes only
  const validCategories = getCategoriesWithValidEpisodes().filter(
    category => category.series.some(series => series.episodes.length > 0)
  );
  
  if (validCategories.length === 0) {
    // Fallback ke kategori biasa kalau belum ada valid episodes
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomSeries = randomCategory.series[0];
    const randomEpisode = randomSeries.episodes[Math.floor(Math.random() * randomSeries.episodes.length)];
    
    return {
      category: randomCategory,
      series: randomSeries,
      episode: randomEpisode
    };
  }
  
  // Smart rotation: avoid showing same category too often
  let availableCategories = validCategories.filter(
    category => !lastShownCategories.includes(category.id)
  );
  
  // If we've cycled through all categories, reset the list
  if (availableCategories.length === 0) {
    lastShownCategories = [];
    availableCategories = validCategories;
  }
  
  // Pick category with weighted preference for variety
  const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
  const validSeries = randomCategory.series.filter(series => series.episodes.length > 0);
  const randomSeries = validSeries[Math.floor(Math.random() * validSeries.length)];
  const randomEpisode = randomSeries.episodes[Math.floor(Math.random() * randomSeries.episodes.length)];
  
  // Track shown categories (keep last 3)
  lastShownCategories.push(randomCategory.id);
  if (lastShownCategories.length > 3) {
    lastShownCategories.shift();
  }
  
  rotationIndex++;
  
  return {
    category: randomCategory,
    series: randomSeries,
    episode: randomEpisode,
    rotationId: rotationIndex // For tracking uniqueness
  };
};

// Get featured content with more variety
export const getFeaturedRotation = () => {
  const validCategories = getCategoriesWithValidEpisodes().filter(
    category => category.series.some(series => series.episodes.length > 0)
  );
  
  // Create multiple featured options for more variety
  const featuredOptions = [];
  
  // Add top-rated content
  const topRatedCategories = validCategories
    .sort((a, b) => b.series[0].rating - a.series[0].rating)
    .slice(0, 5);
    
  topRatedCategories.forEach(category => {
    const series = category.series[0];
    if (series.episodes.length > 0) {
      featuredOptions.push({
        category,
        series,
        episode: series.episodes[0],
        type: 'top-rated'
      });
    }
  });
  
  // Add newest content (by year)
  const newestCategories = validCategories
    .sort((a, b) => b.series[0].year - a.series[0].year)
    .slice(0, 5);
    
  newestCategories.forEach(category => {
    const series = category.series[0];
    if (series.episodes.length > 0) {
      featuredOptions.push({
        category,
        series,
        episode: series.episodes[Math.floor(Math.random() * series.episodes.length)],
        type: 'newest'
      });
    }
  });
  
  // Add random popular picks
  for (let i = 0; i < 3; i++) {
    const randomCategory = validCategories[Math.floor(Math.random() * validCategories.length)];
    const series = randomCategory.series[0];
    if (series.episodes.length > 0) {
      featuredOptions.push({
        category: randomCategory,
        series,
        episode: series.episodes[Math.floor(Math.random() * series.episodes.length)],
        type: 'popular'
      });
    }
  }
  
  return featuredOptions;
};

// Export total episode count untuk informasi
export const getTotalEpisodeCount = () => {
  return categories.reduce((total, category) => {
    return total + category.series.reduce((seriesTotal, series) => {
      return seriesTotal + series.episodes.length;
    }, 0);
  }, 0);
};

// Fungsi untuk deteksi episode yang valid (bukan placeholder)
export const isValidVideoUrl = (url: string): boolean => {
  // Check if URL is not empty and is a real Google Drive URL
  return url && 
         url.length > 0 && 
         !url.includes('example') && 
         url.includes('drive.google.com') && 
         url.includes('/preview') &&
         !url.includes('FILE_ID'); // Make sure it's real Google Drive ID
};

// Get only valid episodes (yang punya real video URLs)
export const getValidEpisodes = (episodes: Episode[]): Episode[] => {
  return episodes.filter(episode => isValidVideoUrl(episode.videoUrl));
};

// Get episode count untuk series (hanya yang valid)
export const getSeriesValidEpisodeCount = (series: Series): number => {
  return getValidEpisodes(series.episodes).length;
};

// Update series dengan hanya episode yang valid
export const getSeriesWithValidEpisodes = (series: Series): Series => {
  const validEpisodes = getValidEpisodes(series.episodes);
  return {
    ...series,
    episodes: validEpisodes
  };
};

// Get categories dengan hanya episode yang valid
export const getCategoriesWithValidEpisodes = (): Category[] => {
  return categories.map(category => ({
    ...category,
    series: category.series.map(series => getSeriesWithValidEpisodes(series))
  }));
};

// Statistics untuk monitoring
export const getEpisodeStatistics = () => {
  let totalEpisodes = 0;
  let validEpisodes = 0;
  let categoriesWithValidContent = 0;
  
  categories.forEach(category => {
    category.series.forEach(series => {
      const total = series.episodes.length;
      const valid = getValidEpisodes(series.episodes).length;
      
      totalEpisodes += total;
      validEpisodes += valid;
      
      if (valid > 0) {
        categoriesWithValidContent++;
      }
    });
  });
  
  return {
    totalEpisodes,
    validEpisodes,
    placeholderEpisodes: totalEpisodes - validEpisodes,
    categoriesWithValidContent,
    validPercentage: Math.round((validEpisodes / totalEpisodes) * 100)
  };
};

// Get all content for search
export const getAllContent = () => {
  return categories.flatMap(category => 
    category.series.flatMap(series => 
      series.episodes.map(episode => ({
        ...episode,
        seriesTitle: series.title,
        categoryName: category.name,
        categoryId: category.id,
        seriesId: series.id
      }))
    )
  );
};