# WILKREY® — Digital Studio

Статический сайт на HTML, CSS и JavaScript. Для локального просмотра сборка не нужна. Для публикации см. раздел «Публикация».

## Структура

```
wilkrey/
├── index.html            # разметка, SEO, Open Graph, Twitter Cards, JSON-LD, favicon
├── robots.txt            # правила для поисковых роботов, ссылка на sitemap
├── sitemap.xml           # карта сайта (одна страница)
├── assets/
│   ├── styles.css        # дизайн-система, композиция, анимации, адаптивность, reduced-motion
│   ├── script.js         # шапка при прокрутке, reveal, ленивые превью, меню, отклик 3D-объекта
│   ├── logo-mark.png     # логотип
│   └── og-image.png      # превью для соцсетей, 1200×630
├── scripts/
│   └── build-publish.sh  # сборка dist/ по белому списку (единственный источник публикации)
├── deploy/               # старая копия сайта, не публикуется
├── .gitignore
└── README.md
```

## Запуск локально

Откройте папку в VS Code и запустите **Live Server** («Go Live»). Либо откройте `index.html` в браузере.

## Публикация

Публикуется только папка `dist/`, которую собирает скрипт по белому списку файлов
(`scripts/build-publish.sh`). README, `deploy/`, `.wrangler/`, скриншоты и скрипты в публикацию не попадают.

```bash
bash scripts/build-publish.sh && npx wrangler pages deploy dist --project-name=wilkrey
```

Не используйте `wrangler pages deploy .`: эта команда загрузит всю папку, включая `deploy/`, `.git` и служебные файлы.

Новый публичный файл добавляется в массив `PUBLIC_FILES` в скрипте. Без этого он в `dist/` не попадёт.

## Перед публикацией

- Проверьте, что `og:url`, `canonical` и адрес в `sitemap.xml` указывают на `https://wilkrey.pages.dev/` (сейчас так и есть).
- Превью кейсов загружают живые демо с `wilkrey.github.io`. Если сайт демо недоступен, в рамке будет пусто, а ссылка «Открыть демо» продолжит работать.

## Заметки

- Превью кейсов — это живые демо-страницы в уменьшенном виде, а не статические скриншоты. Загружаются они только при приближении к экрану.
- 3D-объект в hero построен на CSS (`transform-style: preserve-3d`), без WebGL и внешних библиотек.
- Анимации отключаются при `prefers-reduced-motion: reduce`.
