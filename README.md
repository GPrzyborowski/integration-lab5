# Integracja systemów informatycznych

## Laboratorium 5: Automatyzacja CI/CD z GitHub Actions i wdrożenie PaaS

# Publiczne adresy aplikacji

## Frontend

```text
https://frontend-rdn1.onrender.com
```

## Backend API

```text
https://integration-lab5.onrender.com
```

## Health Check

```text
https://integration-lab5.onrender.com/health
```

---

# Pipeline CI/CD

Projekt wykorzystuje GitHub Actions do realizacji procesów CI/CD.

Pipeline automatycznie wykonuje:
- instalację zależności,
- lintowanie kodu,
- uruchamianie testów jednostkowych,
- deployment aplikacji na Render.com,
- sanity check endpointu `/health`.

Workflow znajduje się w pliku:

```text
.github/workflows/main.yml
```

---

# Testy jednostkowe

## Backend

Backend wykorzystuje:
- `jest`
- `ts-jest`
- `supertest`

Uruchamianie testów:

```bash
cd backend
npm test
```

Uruchamianie lintera:

```bash
npm run lint
```

---

## Frontend

Frontend wykorzystuje:
- `vitest`
- `jsdom`

Uruchamianie testów:

```bash
cd frontend
npm test -- --run
```

Uruchamianie lintera:

```bash
npm run lint
```

---

# Uruchamianie aplikacji lokalnie

## Wymagania

- Docker Desktop
- Git

---

## Konfiguracja pliku `.env`

W katalogu `backend` należy utworzyć plik `.env`:

```env
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=postgres
DB_PORT=5432
DB_NAME=mydb
```

---

## Uruchomienie aplikacji

W głównym katalogu projektu należy wykonać polecenie:

```bash
docker compose up --build
```

---

## Dostęp do aplikacji lokalnie

### Frontend

```text
http://localhost
```

lub po prostu:

```text
http://localhost:80
```

### Backend

```text
http://localhost:5000
```

### PostgreSQL

```text
localhost:5432
```

---

# Migracje i seed bazy danych

Podczas pierwszego uruchomienia kontenera PostgreSQL automatycznie wykonywane są pliki:

```text
backend/db/schema.sql
backend/db/seed.sql
```

Plik `schema.sql` tworzy tabele:
- users
- books
- loans

Plik `seed.sql` dodaje przykładowe rekordy do bazy danych.

---

# Reset środowiska lokalnego

Aby usunąć kontenery, sieci oraz wolumeny Docker:

```bash
docker compose down -v
```

Ponowne uruchomienie:

```bash
docker compose up
```

spowoduje ponowne utworzenie bazy danych wraz z migracją i seedem.