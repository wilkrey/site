# WILKREY® — Digital Studio

Статический сайт на HTML, CSS и JavaScript. Сборка и зависимости не нужны.

## Структура

```
wilkrey/
├── index.html          # разметка, SEO, Open Graph, favicon
├── assets/
│   ├── styles.css      # дизайн-система, композиция, анимации, адаптивность, reduced-motion
│   └── script.js       # шапка при прокрутке, reveal, ленивые превью, меню, отклик 3D-объекта
├── scripts/
│   └── build-publish.sh  # сборка dist/ по белому списку (единственный источник публикации)
└── README.md
```

## Запуск локально

Откройте папку в VS Code и запустите **Live Server** («Go Live»). Либо откройте `index.html` в браузере.

## Публикация

Публикуется только папка `dist/`, которую собирает скрипт по белому списку файлов
(`scripts/build-publish.sh`). README, `deploy/`, `.wrangler/`, скриншоты и скрипты в публикацию не попадают.

```bash
./scripts/build-publish.sh
npx wrangler pages deploy dist --project-name=wilkrey
```

Новый публичный файл добавляется в массив `PUBLIC_FILES` в скрипте. Без этого он в `dist/` не попадёт.

## Перед публикацией

- Проверьте `og:url` в `index.html` (сейчас `https://wilkrey.pages.dev/`).
- Вместо блока `.contact__slot` добавьте реальные контакты, когда они появятся.
- Превью кейсов загружают живые демо с `wilkrey.github.io`. Если сайт демо недоступен, в рамке будет пусто, а ссылка «Открыть демо» продолжит работать.

## Заметки

- Превью кейсов — это живые демо-страницы в уменьшенном виде, а не статические скриншоты. Загружаются они только при приближении к экрану.
- 3D-объект в hero построен на CSS (`transform-style: preserve-3d`), без WebGL и внешних библиотек.
- Анимации отключаются при `prefers-reduced-motion: reduce`.
