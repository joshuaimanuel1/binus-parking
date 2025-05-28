# Dokumentasi API Backend Sistem Parkir Otomatis BINUS

Base URL: `http://localhost:5000/api`

---

## Endpoints Utama

### 1. Autentikasi dan Pengguna

- **POST /users/login**  
  Login pengguna dengan RFID.  
  **Request Body:**
  ```json
  {
    "rfid": "string"
  }
  ```
