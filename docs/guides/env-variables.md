# Environment Variables

Copy the generated example before starting. Client environment location: `frontend/.env` for client values.

| Variable | Visibility | Required | Purpose |
|---|---|---:|---|
| `VITE_API_URL` | client/public | yes | Base URL of the application API. |

Values with `VITE_` are bundled into client code and must never contain secrets. Keep real environment files out of version control.
