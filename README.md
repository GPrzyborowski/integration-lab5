# Integracja systemów informatycznych

## Laboratorium 5: Automatyzacja CI/CD z GitHub Actions i wdrożenie PaaS

## Wymagania

- Docker Desktop
- Git

## Konfiguracja pliku `.env`

W katalogu `backend` należy utworzyć plik `.env`:

```env
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=postgres
DB_PORT=5432
DB_NAME=mydb
```

## Uruchomienie aplikacji

W głównym katalogu projektu należy wykonać polecenie:

```bash
docker compose up --build
```

Po uruchomieniu aplikacja będzie dostępna pod adresami:

### Frontend

```text
http://localhost:80
```
Lub po prostu:
```text
http://localhost
```

### Backend

```text
http://localhost:5000
```

### PostgreSQL

```text
localhost:5432
```

## Zatrzymywanie aplikacji

```bash
docker compose down
```

## Migracje i seed bazy danych

Podczas pierwszego uruchomienia kontenera PostgreSQL automatycznie wykonywane są pliki:

```text
backend/db/schema.sql
backend/db/seed.sql
```

Plik `schema.sql` tworzy strukturę tabel:
- users
- books
- loans

Plik `seed.sql` dodaje przykładowe dane do bazy.

## Usuwanie wolumenów i pełny reset bazy danych

Aby usunąć kontenery, sieć oraz wolumeny:

```bash
docker compose down -v
```

Po ponownym uruchomieniu:

```bash
docker compose up
```

baza danych zostanie utworzona od nowa wraz z migracją i seedem.