if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let c={};const o=e=>i(e,r),d={module:{uri:r},exports:c,require:o};a[r]=Promise.all(s.map((e=>d[e]||o(e)))).then((e=>(n(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Logo-illu.jpeg",revision:"601e0381338d15ed8145c91aaebcdd5c"},{url:"/_next/static/RFmxEEvG2PLHMLNpK2ZDP/_buildManifest.js",revision:"d8963c6657102db1f2fa51dc81a43a6f"},{url:"/_next/static/RFmxEEvG2PLHMLNpK2ZDP/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/105-1212b0bddaad3625.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/166-17c44f7594ad8571.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/201-d502f93dbba9e7f5.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/210-5d2cf56fe03be06b.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/2170a4aa.a0545f6137664539.js",revision:"a0545f6137664539"},{url:"/_next/static/chunks/300-d42d609e3dc31c57.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/325.db08e70451b3bca7.js",revision:"db08e70451b3bca7"},{url:"/_next/static/chunks/413-ad487c2f30acff47.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/460-bfd6fc2bfd17d224.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/468-80c2fb790fe7dd5e.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/474-dde6f0f80e7091da.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/500-3a5f1f927a7dd4f0.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/568.d203e79468994a50.js",revision:"d203e79468994a50"},{url:"/_next/static/chunks/640-8c460c2206b106c4.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/680-76bf6f3710deb0d6.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/70-e9d058c8527f95ea.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/756-6d8a389ab8aedac0.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/827-4ff10e4a9f443493.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/867.4ae9080420865bce.js",revision:"4ae9080420865bce"},{url:"/_next/static/chunks/879-25dbd71119874d24.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/902-f50873830ec5b48e.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/_not-found-7d082d60bab7bfb9.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/admin/page-346dd7c27374763f.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/layout-387489953765a7c2.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/login/page-4a9b69f728885267.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/page-6890aa7c94b4afb1.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/settings/page-316280c856aa7671.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/statistics/page-f25af60f643ed975.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/app/users/page-58d8b19c625d6df0.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/d0deef33.722ad9a6f2305383.js",revision:"722ad9a6f2305383"},{url:"/_next/static/chunks/fd9d1056-e00e39710efcf9e6.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/framework-b370f160bb96059c.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/main-012f7de06099a4e4.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/main-app-9b93f0a40f11f736.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/pages/_app-d21e88acd55d90f1.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/pages/_error-d6107f1aac0c574c.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b49f8224a4ec267c.js",revision:"RFmxEEvG2PLHMLNpK2ZDP"},{url:"/_next/static/css/63516b7b0d9e3452.css",revision:"63516b7b0d9e3452"},{url:"/_next/static/css/958f5df9b5fa8ece.css",revision:"958f5df9b5fa8ece"},{url:"/_next/static/media/ec1a1eae803b668e-s.p.woff2",revision:"313812e61a1aacffa37a0e33e321d6b2"},{url:"/_next/static/media/layers-2x.9859cd12.png",revision:"9859cd12"},{url:"/_next/static/media/layers.ef6db872.png",revision:"ef6db872"},{url:"/_next/static/media/marker-icon-2x.93fdb12c.png",revision:"93fdb12c"},{url:"/_next/static/media/marker-icon.d577052a.png",revision:"d577052a"},{url:"/_next/static/media/marker-shadow.612e3b52.png",revision:"612e3b52"},{url:"/android/android-launchericon-144-144.png",revision:"9a0024bd9f6858b2b517dea2c1d4f022"},{url:"/android/android-launchericon-192-192.png",revision:"f215445cf182aaf9044dc51ea29a31c0"},{url:"/android/android-launchericon-48-48.png",revision:"539227399e430470dcd04a70cc410770"},{url:"/android/android-launchericon-512-512.png",revision:"c62fdb1f0ac4086a63ade2095fdfcd33"},{url:"/android/android-launchericon-72-72.png",revision:"66025bd7ca620d76edfde2bad9cbd4da"},{url:"/android/android-launchericon-96-96.png",revision:"1acededfd32faca7a59d5d51936ed1af"},{url:"/icons.json",revision:"5dbbc3fe59816e65ba28e355a58ea45c"},{url:"/ios/100.png",revision:"4725e63a3b212c75de47299a32799bde"},{url:"/ios/1024.png",revision:"85e28315b8874330b31ad1606c21a8c7"},{url:"/ios/114.png",revision:"150516a500ac282ee485ae69173a08e2"},{url:"/ios/120.png",revision:"64d9837dafa8cb1caf05a84bf5483172"},{url:"/ios/128.png",revision:"d9fa19c9788a0e85f48410fdcc9b867e"},{url:"/ios/144.png",revision:"9a0024bd9f6858b2b517dea2c1d4f022"},{url:"/ios/152.png",revision:"00cd1253839bc31c58e1af1837e39f70"},{url:"/ios/16.png",revision:"474a6fd10806cfacc2465c78c0fb902f"},{url:"/ios/167.png",revision:"2409aa5eac6b542ab20b0c4201767c89"},{url:"/ios/180.png",revision:"483987f2538c3c38f1b50326a9cfad81"},{url:"/ios/192.png",revision:"f215445cf182aaf9044dc51ea29a31c0"},{url:"/ios/20.png",revision:"e46073e154e14d1fe33b87c9deee97fc"},{url:"/ios/256.png",revision:"5954601e031a50855b5d291224f665ad"},{url:"/ios/29.png",revision:"6eaf8ac771cf8ae84e6835ba546d2a3e"},{url:"/ios/32.png",revision:"3d86dd6cd439b899c5090e2c1050aab2"},{url:"/ios/40.png",revision:"2aebf80edbc3eb67e00569068c5a3999"},{url:"/ios/50.png",revision:"ff4c2b111317be6b00b49c5fac65ad95"},{url:"/ios/512.png",revision:"c62fdb1f0ac4086a63ade2095fdfcd33"},{url:"/ios/57.png",revision:"1c87edf100cd0f0b89865711d9f02a79"},{url:"/ios/58.png",revision:"58ad92b3dee099e5e1b3a628994b04d9"},{url:"/ios/60.png",revision:"3f09494ffb5f8156bd2855ba9ce2d8fd"},{url:"/ios/64.png",revision:"bee0b2c62a540f33619c572558d8fd88"},{url:"/ios/72.png",revision:"66025bd7ca620d76edfde2bad9cbd4da"},{url:"/ios/76.png",revision:"7d72b7859872ba8fcb38b5c8ab365885"},{url:"/ios/80.png",revision:"b23b2b7a4c93162cbba299a20d6ac41d"},{url:"/ios/87.png",revision:"962c2ffce2388d9a36de67b80dfe04cb"},{url:"/lamp-post.png",revision:"60ab4988e03f7d56875709762bd403b5"},{url:"/lamp-post.svg",revision:"1807e0ae96524cd146379119e7356e3f"},{url:"/location-arrow.svg",revision:"23a30357087e04230ba696ebadbfffc8"},{url:"/manifest.json",revision:"5c3032536f49209e2af8719a184a8ec4"},{url:"/motion-sensor.png",revision:"9a8f4430b1437ed5f1c432e6d7df86c1"},{url:"/my-location.jpg",revision:"71d234a65a31bafe201e4bfd08102031"},{url:"/pole-icon.jpeg",revision:"c8d04a72a845abb9cf35d73d113b6d48"},{url:"/pole-type.png",revision:"f9919aea60683f0d9c25426ec02624c2"},{url:"/pole-type2.png",revision:"f965a7677bdfc9d6ac1eb01b41a712fd"},{url:"/square.svg",revision:"bc32287d06f7e6184cb4a6f411d1f494"},{url:"/street-light.png",revision:"1b53b10469cd613d6610ada7b7f46684"},{url:"/windows11/LargeTile.scale-100.png",revision:"6e619425815bd31173b01469c6e8c1dc"},{url:"/windows11/LargeTile.scale-125.png",revision:"bc5d685891aae64a62d10b797e00184f"},{url:"/windows11/LargeTile.scale-150.png",revision:"c7e5bbd06b287f5d1c7e691cc0d82776"},{url:"/windows11/LargeTile.scale-200.png",revision:"2f0fc9ae2a1ee200d7582ee27b1ade6d"},{url:"/windows11/LargeTile.scale-400.png",revision:"593d0a2aa55e7fdfaf41eee8440b2228"},{url:"/windows11/SmallTile.scale-100.png",revision:"aed6e4fe79b10cc5154178f07453d0c1"},{url:"/windows11/SmallTile.scale-125.png",revision:"0433d63f8e8e8b6041e50d461cf5b336"},{url:"/windows11/SmallTile.scale-150.png",revision:"e665f7426ff91565a1803159236698c0"},{url:"/windows11/SmallTile.scale-200.png",revision:"0b0a26c4edd008f45869d9533ea0a1af"},{url:"/windows11/SmallTile.scale-400.png",revision:"db38a0e52b362860b52daad9e5ef0b0f"},{url:"/windows11/SplashScreen.scale-100.png",revision:"a3545b944556acee52bef28f30cf60cb"},{url:"/windows11/SplashScreen.scale-125.png",revision:"4fcd1d7b77611a8433f89cbecbbddc74"},{url:"/windows11/SplashScreen.scale-150.png",revision:"695a47feffb9381e62a601543533279d"},{url:"/windows11/SplashScreen.scale-200.png",revision:"d3db0186c9972dd02a2facce2b22fedd"},{url:"/windows11/SplashScreen.scale-400.png",revision:"2e50248b709cd8a4559a8c83f3b97a4b"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"94f381b1d949ab42532a1c696dbda6db"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"6cd07cc6eb6f37a05b6c9529bc94fea8"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"8a5bb7b9bd31d0c86fb1490c6387e6e7"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"cf27083af65c6dfc7c896bd8ab4b33d2"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"e50c577ae428813bbcb5fd68d763e715"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"474a6fd10806cfacc2465c78c0fb902f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"e46073e154e14d1fe33b87c9deee97fc"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"be6d846296f44c266c225a998cb4ba02"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"5954601e031a50855b5d291224f665ad"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"a8ebaaf72cf037ca757d738b0503487b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"3d86dd6cd439b899c5090e2c1050aab2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"9f7d79e584ca9e10805bc8275c5b5956"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"2aebf80edbc3eb67e00569068c5a3999"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"37c7ff970bbf33c0cb4abe64bdffa7c9"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"539227399e430470dcd04a70cc410770"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"3f09494ffb5f8156bd2855ba9ce2d8fd"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"bee0b2c62a540f33619c572558d8fd88"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"66025bd7ca620d76edfde2bad9cbd4da"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"b23b2b7a4c93162cbba299a20d6ac41d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"1acededfd32faca7a59d5d51936ed1af"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"474a6fd10806cfacc2465c78c0fb902f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"e46073e154e14d1fe33b87c9deee97fc"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"be6d846296f44c266c225a998cb4ba02"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"5954601e031a50855b5d291224f665ad"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"a8ebaaf72cf037ca757d738b0503487b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"3d86dd6cd439b899c5090e2c1050aab2"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"9f7d79e584ca9e10805bc8275c5b5956"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"2aebf80edbc3eb67e00569068c5a3999"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"37c7ff970bbf33c0cb4abe64bdffa7c9"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"539227399e430470dcd04a70cc410770"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"3f09494ffb5f8156bd2855ba9ce2d8fd"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"bee0b2c62a540f33619c572558d8fd88"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"66025bd7ca620d76edfde2bad9cbd4da"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"b23b2b7a4c93162cbba299a20d6ac41d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"1acededfd32faca7a59d5d51936ed1af"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"37c7ff970bbf33c0cb4abe64bdffa7c9"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"d9e8c23f1eb1bc63bc4f7e9c5eef8e39"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"d62927b458a1d9b838bc1583a57fed6f"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"b75c5953e03eea710a8d8601778dc770"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"60e6a4b697e91602520d6a9cd2ede5ae"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"474a6fd10806cfacc2465c78c0fb902f"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"e46073e154e14d1fe33b87c9deee97fc"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"be6d846296f44c266c225a998cb4ba02"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"5954601e031a50855b5d291224f665ad"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"a8ebaaf72cf037ca757d738b0503487b"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"3d86dd6cd439b899c5090e2c1050aab2"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"9f7d79e584ca9e10805bc8275c5b5956"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"2aebf80edbc3eb67e00569068c5a3999"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"37c7ff970bbf33c0cb4abe64bdffa7c9"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"539227399e430470dcd04a70cc410770"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"3f09494ffb5f8156bd2855ba9ce2d8fd"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"bee0b2c62a540f33619c572558d8fd88"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"66025bd7ca620d76edfde2bad9cbd4da"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"b23b2b7a4c93162cbba299a20d6ac41d"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"1acededfd32faca7a59d5d51936ed1af"},{url:"/windows11/StoreLogo.scale-100.png",revision:"dab8d3dda1bc9ca3501721d2114a9eba"},{url:"/windows11/StoreLogo.scale-125.png",revision:"fc995b4a2d91d0c24b26f1cb5df66a1f"},{url:"/windows11/StoreLogo.scale-150.png",revision:"e80177d0c4e5b78489e2e08e0e704b2d"},{url:"/windows11/StoreLogo.scale-200.png",revision:"dad6714c262e1ebdb1b1067605dc0559"},{url:"/windows11/StoreLogo.scale-400.png",revision:"1456f255f89d0abc5bbe252a1e8bf9b5"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"78903c9c51b6c11dc7467bf93407f397"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"96f4f7ae77e3e6706908c13dfc1e7c2a"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"2f3d8ffefbd1550a6d9ca99c28343f1a"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"a3545b944556acee52bef28f30cf60cb"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"d3db0186c9972dd02a2facce2b22fedd"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
