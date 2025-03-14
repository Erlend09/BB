# Connect API - Discord-inspirert API

Dette er et API inspirert av Discord, laget som en del av skoleoppgaven.

## API URL (Prod - Deployet på Render)
API-et kjører live på:
[https://connect-api-i0ly.onrender.com](https://connect-api-i0ly.onrender.com)

## Hvordan bruke API-et
Du kan teste API-et ved hjelp av **Postman** eller et annet API-verktøy.

### GET-endepunkter
- **Hente alle brukere**: `[GET] /api/users`
- **Hente spesifikk bruker**: `[GET] /api/users/:id`
- **Hente alle grupper**: `[GET] /api/groups`
- **Hente spesifikk gruppe**: `[GET] /api/groups/:id`
- **Hente alle kanaler**: `[GET] /api/channels`
- **Hente spesifikk kanal**: `[GET] /api/channels/:id`
- **Hente alle meldinger**: `[GET] /api/messages`
- **Hente spesifikk melding**: `[GET] /api/messages/:id`

### POST-endepunkter (Opprette data)
- **Opprette bruker**: `[POST] /api/users`
- **Opprette gruppe**: `[POST] /api/groups`
- **Opprette kanal**: `[POST] /api/channels`
- **Opprette melding**: `[POST] /api/messages`

### PUT-endepunkter (Oppdatere data)
- **Oppdatere bruker**: `[PUT] /api/users/:id`
- **Oppdatere gruppe**: `[PUT] /api/groups/:id`
- **Oppdatere kanal**: `[PUT] /api/channels/:id`
- **Oppdatere melding**: `[PUT] /api/messages/:id`

### DELETE-endepunkter (Slette data)
- **Slette bruker**: `[DELETE] /api/users/:id`
- **Slette gruppe**: `[DELETE] /api/groups/:id`
- **Slette kanal**: `[DELETE] /api/channels/:id`
- **Slette melding**: `[DELETE] /api/messages/:id`

## Testing med Postman
For å teste API-et, bruk den eksporterte **Postman Collection**.  
Den ligger i repoet her: [`postman-tests/postman_collection.json`](postman-tests/postman_collection.json)

1. **Åpne Postman**.
2. **Importer `postman-tests/postman_collection.json`**.
3. **Kjør testene mot API-et!** 🎉

---

## Lagre endringene og last opp til GitHub**
Når du har oppdatert `README.md`, lagre filen og kjør følgende i terminalen:

```sh
git add README.md
git commit -m "Updated README with API documentation"
git push origin main


# Connect API - Discord-inspirert API

Dette er et API inspirert av Discord, laget som en del av skoleoppgaven.  
API-et lar deg håndtere **brukere, grupper, kanaler og meldinger** med **GET, POST, PUT og DELETE**.

---

##  API URL (Prod - Deployet på Render)
API-et kjører live på:  
[https://connect-api-i0ly.onrender.com](https://connect-api-i0ly.onrender.com)

---

## Hvordan bruke API-et
Du kan teste API-et ved hjelp av **Postman**, **cURL** eller andre API-verktøy.

---

## GET-endepunkter (Hente data)
| Ressurs        | Endepunkt                     | Beskrivelse                          |
|---------------|------------------------------|--------------------------------------|
| **Brukere**   | `[GET] /api/users`            | Henter alle brukere                  |
|               | `[GET] /api/users/:id`        | Henter en spesifikk bruker          |
| **Grupper**   | `[GET] /api/groups`           | Henter alle grupper                 |
|               | `[GET] /api/groups/:id`       | Henter en spesifikk gruppe          |
| **Kanaler**   | `[GET] /api/channels`         | Henter alle kanaler                 |
|               | `[GET] /api/channels/:id`     | Henter en spesifikk kanal           |
| **Meldinger** | `[GET] /api/messages`         | Henter alle meldinger               |
|               | `[GET] /api/messages/:id`     | Henter en spesifikk melding         |

**Eksempel: Hente alle grupper med cURL**
```sh
curl -X GET http://localhost:3000/api/groups

Render link: https://connect-api-i0ly.onrender.com/
