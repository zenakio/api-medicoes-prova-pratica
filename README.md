# API de Monitoramento Térmico

## 1. Sobre o Projeto

A API de Monitoramento Térmico é um projeto desenvolvido utilizando Node.js, Express e MySQL. Seu objetivo é permitir o cadastro, consulta, atualização e exclusão de medições de temperatura.

O sistema recebe valores em graus Celsius, realiza a conversão para Fahrenheit e classifica a temperatura de acordo com as regras definidas no projeto.

## 2. Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- Nodemon

## 3. Banco de Dados

**Nome do banco:** `monitoramento_db`

**Tabela:** `medicoes`

| Campo | Descrição |
|---|---|
| id | Identificador da medição |
| descricao | Descrição da medição |
| tipo | Tipo da medição |
| valor_original | Temperatura em Celsius |
| unidade_original | Unidade original |
| valor_convertido | Temperatura em Fahrenheit |
| unidade_convertida | Unidade convertida |
| classificacao | Classificação da temperatura |
| criado_em | Data de criação do registro |

## 4. Instalação e Configuração

Explique aqui como instalar as dependências, configurar o arquivo `.env` e importar o `schema.sql` no MySQL.

Comando para instalar as dependências:

```bash
npm install
```

Comando para iniciar o servidor:

```bash
npm run dev
```

## 5. Funcionamento da API

A API recebe uma temperatura em graus Celsius e realiza sua conversão para Fahrenheit através da fórmula:

`F = (C × 9/5) + 32`

O resultado é arredondado para duas casas decimais.

As classificações utilizadas são:

- Abaixo de 80 °C: Temperatura ideal.
- De 80 °C até abaixo de 95 °C: Atencao / Intermediario.
- De 95 °C até 105 °C: Acima da temperatura ideal.
- Acima de 105 °C: Limite crítico.

## 6. Rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | `/` | Verificar funcionamento |
| GET | `/medicoes` | Listar medições |
| GET | `/medicao/:id` | Buscar medição |
| POST | `/medicao` | Cadastrar medição |
| PUT | `/medicao/:id` | Atualizar medição |
| DELETE | `/medicao/:id` | Excluir medição |

## 7. Códigos HTTP

- **200:** Operação realizada com sucesso.
- **201:** Medição cadastrada.
- **400:** Dados inválidos ou incompletos.
- **404:** Medição não encontrada.
- **500:** Erro interno do servidor.

## 8. Considerações Finais

Complete esta seção explicando o que você aprendeu durante o desenvolvimento, as dificuldades encontradas e como a API atende ao objetivo do projeto.