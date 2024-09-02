# Proyecto de NFT y API en la Blockchain "JunglaEsmeraldera"

[Documentación Completa en Notion](https://florentine-eater-bab.notion.site/IDEA-del-proyecto-d47944fdbb3e4a74863c4fc443fc9f06?pvs=74)

## Descripción General

Este proyecto implementa una API que interactúa con un smart contract de NFTs en la blockchain "JunglaEsmeraldera". La API permite la creación, transferencia y consulta de NFTs utilizando datos almacenados en Piñata y se integra con un contrato inteligente desarrollado en Solidity utilizando OpenZeppelin.

### Características del Proyecto

- **Minting de NFTs**: La API permite la creación de NFTs personalizados con metadatos almacenados en Piñata.
- **Transferencia de NFTs**: Los NFTs pueden ser transferidos a otras direcciones en la blockchain.
- **Interacción con Contrato Inteligente**: El proyecto incluye un contrato inteligente desplegado en la blockchain "JunglaEsmeraldera", que se encarga de la lógica de los NFTs.
- **Integración con Piñata**: Los metadatos de los NFTs se almacenan en Piñata, asegurando un acceso seguro y distribuido.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Uso](#uso)
5. [API Endpoints](#api-endpoints)
6. [Smart Contract](#smart-contract)
7. [Contribución](#contribución)
8. [Licencia](#licencia)

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Una cuenta en Piñata para la gestión de metadatos
- Credenciales de la blockchain "JunglaEsmeraldera"

## Instalación

Clona este repositorio:

```bash
git clone https://github.com/tuusuario/tu-repo.git
```

Navega al directorio del proyecto:

```bash
cd tu-repo
```

Instala las dependencias:

```bash
npm install
```

## Configuración

Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```
PIÑATA_API_KEY=tu_api_key
PIÑATA_SECRET_KEY=tu_secret_key
BLOCKCHAIN_API_URL=https://api.junglaesmeraldera.com
CONTRACT_ADDRESS=tu_direccion_del_contrato
```

## Uso

Inicia el servidor de la API:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## API Endpoints

- **POST /nft/mint**: Crea un nuevo NFT.
  - **Requiere**: Metadatos del NFT en el cuerpo de la solicitud.
- **POST /nft/transfer**: Transfiere un NFT a una nueva dirección.
  - **Requiere**: Dirección del destinatario y ID del NFT en el cuerpo de la solicitud.
- **GET /nft/:id**: Obtiene la información de un NFT específico.
  - **Requiere**: ID del NFT como parámetro de la solicitud.

## Smart Contract

El contrato inteligente para los NFTs está implementado en Solidity utilizando OpenZeppelin. Puedes encontrar el código en el directorio `contracts/` del repositorio.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. **Forkea el repositorio**.
2. **Crea una nueva rama**:
   ```bash
   git checkout -b mi-feature
   ```
3. **Realiza tus cambios** y haz commit:
   ```bash
   git add .
   git commit -m "Añadida nueva funcionalidad"
   ```
4. **Sube tus cambios** a tu fork:
   ```bash
   git push origin mi-feature
   ```
5. **Crea una Pull Request** desde tu fork al repositorio original.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
```
