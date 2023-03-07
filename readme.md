## Клон сайта www.kinopoisk.ru

SPA приложение с клиент-серверной архитектурой.
1. Разработка приложения велась в команде
2. Разработали Авторизацию/Регистрацию, JWT.
3. Личный кабинет пользователя с возможностью редактирования и администрирования.
4. На основе https://kinopoiskapiunofficial.tech/ построены страницы со списками фильмов, страницы с данными по каждому фильму, страница с постерами, страница с плеером, страница с поиском по ключевому слову, страница с расширенным поиском
5. Примеры запросов для Postman:
  - [x] GET http://localhost:3000/api/posts/all
  - [x] GET http://localhost:3000/api/posts/byfilm/448
  - [x] GET http://localhost:3000/api/settings/premiere


### Админ Login/Password: admin p@ssw0rd

### deploy: https://chervyakov-vladislav.github.io/RS-Clone/



### Запуск проекта локально
```
git clone https://github.com/chervyakov-vladislav/RS-Clone.git .
cd client -> npm i -> npm start
cd server -> npm i -> npm run start:dev
```


### Стек технологий
- Frontend: Typescript, SCSS
- Backend: Typescript, NodeJS, Express, MongoDB
- Code quality: ESLint, AirBnB config

### Команда

1. <a href="https://github.com/EXisTAnZ" target="_blank">EXisTAnZ</a>
2. <a href="https://github.com/CTpaTer" target="_blank">CTpaTer</a>
3. <a href="https://github.com/chervyakov-vladislav" target="_blank">chervyakov-vladislav</a>