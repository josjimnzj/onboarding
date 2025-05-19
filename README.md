# Onboarding de Crédito

Aplicación React para el proceso de onboarding de crédito, que guía al usuario a través de los diferentes pasos necesarios para solicitar un crédito.

## Características

- Formulario de selección de producto de crédito
- Validación de documentos
- Verificación biométrica
- Validación OTP
- Consentimiento para análisis crediticio
- Visualización de resultados de scoring

## Requisitos

- Node.js 14.0.0 o superior
- npm 6.0.0 o superior

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd onboarding-credito
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación en modo desarrollo:
```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

```
src/
  ├── components/
  │   ├── ProgressBar.js
  │   └── steps/
  │       ├── ProductSelection.js
  │       ├── DocumentNumber.js
  │       ├── AvailableOffers.js
  │       ├── ClientData.js
  │       ├── BiometricValidation.js
  │       ├── ValidatedData.js
  │       ├── OtpValidation.js
  │       ├── CreditConsent.js
  │       └── ScoringResult.js
  ├── App.js
  ├── App.css
  ├── index.js
  └── index.css
```

## Tecnologías Utilizadas

- React 18
- Bootstrap 5
- ApexCharts
- React Router (para futuras implementaciones)

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo desarrollo
- `npm test`: Ejecuta las pruebas
- `npm run build`: Construye la aplicación para producción
- `npm run eject`: Expone la configuración de webpack

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 