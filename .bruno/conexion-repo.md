# Repo de Carlos conectado a Bruno

Por qué importa: acá vive el conocimiento del trabajo (fichas de tareas) y, más
adelante, las páginas que Bruno publique. Que esté en el repo de Carlos = el saber
es suyo y cualquiera puede retomar una tarea sin contexto.

## Pasos
- [x] Token de GitHub cargado como variable de entorno `GITHUB_TOKEN`
- [x] Acceso al repo `amper-git/dinheiro-na-hora` verificado (lectura + escritura)
- [x] Estructura `.bruno/` creada con primera ficha + commit de prueba
- [ ] Pasar el repo a **privado** (pendiente, decisión de Carlos)

## Estado hoy
Conexión funcionando. El repo tiene un frontend estático en `frontend/` (no se toca).
Siguiente paso: cuando Carlos decida, cambiar visibilidad a privada desde
Settings → Danger Zone. Hasta entonces, NO guardar datos sensibles acá.

## Decisiones
- Las fichas viven en `.bruno/` para no mezclarse con el código del proyecto (`frontend/`).
