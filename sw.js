// 캐시 이름 설정
const CACHE_NAME = 'chyak-cache-v1';
// 캐싱할 파일 목록 (시작 페이지, CSS, 로고 등 필수 리소스)
const ASSETS_TO_CACHE = [
  '/chyak/index.html',
  '/chyak/chyak.png',
  '/chyak/deep work blackbox.png'
];

// 1. 설치 단계: 필수 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('캐시 오픈 및 리소스 저장 중');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 활성화 단계: 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('오래된 캐시 삭제 중:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. 페치(Fetch) 단계: 네트워크 오류 시 캐시된 내용 반환 (오프라인 지원)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 있으면 캐시 반환, 없으면 네트워크 요청
      return response || fetch(event.request);
    })
  );
});
