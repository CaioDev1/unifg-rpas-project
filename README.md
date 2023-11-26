
### Projeto de e-commerce de roupas R-pas

#### Como instalar
> Requisitos
> * Docker
> * Docker Compose 

1. `docker compose build`
2. `docker compose up -d`

#### Rodando testes E2E com Cypress
`docker compose up cypress`

#### Rodando testes de integração do backend
```bash
docker compose exec backend /bin/sh
npm run test
```

#### Rodando testes unitários do backend
```bash
docker compose exec backend /bin/sh
npm run test:unit
```