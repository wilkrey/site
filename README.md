# WILKREY® — Digital Studio

Статический сайт на HTML, CSS и JavaScript. Сборка и зависимости не нужны.

## Структура

```
wilkrey/
├── index.html          # разметка, SEO, Open Graph, favicon
├── assets/
│   ├── styles.css      # дизайн-система, композиция, анимации, адаптивность, reduced-motion
│   └── script.js       # шапка при прокрутке, reveal, ленивые превью, меню, отклик 3D-объекта
└── README.md
```

## Запуск локально

Откройте папку в VS Code и запустите **Live Server** («Go Live»). Либо откройте `index.html` в браузере.

## Публикация

```bash
npx wrangler pages deploy . --project-name=wilkrey
```

## Перед публикацией

- Проверьте `og:url` в `index.html` (сейчас `https://wilkrey.pages.dev/`).
- Вместо блока `.contact__slot` добавьте реальные контакты, когда они появятся.
- Превью кейсов загружают живые демо с `wilkrey.github.io`. Если сайт демо недоступен, в рамке будет пусто, а ссылка «Открыть демо» продолжит работать.

## Заметки

- Превью кейсов — это живые демо-страницы в уменьшенном виде, а не статические скриншоты. Загружаются они только при приближении к экрану.
- 3D-объект в hero построен на CSS (`transform-style: preserve-3d`), без WebGL и внешних библиотек.
- Анимации отключаются при `prefers-reduced-motion: reduce`.
