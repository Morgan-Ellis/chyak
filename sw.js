const CACHE_NAME = 'chyak-cache-v1';

// 사진에 있는 파일명과 동일하게 맞춤
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/chyak.png",
  "/icon-192.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 하나라도 경로가 틀리면 전체 캐싱이 실패하여 PWA가 안 뜹니다.
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ... 나머지 activate, fetch 코드는 기존과 동일하게 유지 ...
