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

Primeiro, clone o repositório e acesse a pasta do projeto.

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com os dados de conexão do MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=monitoramento_db
```

Importe o arquivo `schema.sql` no MySQL para criar o banco de dados e a tabela necessária.

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API ficará disponível em:

`http://localhost:3000`

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

## 8. Exemplos de Testes no Insomnia

Para testar a API, utilize o Insomnia, selecionando o método HTTP correspondente e configurando o Body como JSON quando necessário.

**URL base:**

`http://localhost:3000`

### 8.1. Cadastrar uma medição (POST)

**Rota:** `POST /medicao`

**Body (JSON):**

```json
{
    "descricao": "Temperatura do processador",
    "tipo": "temperatura",
    "valor": 85
}
```

**Outros exemplos de temperaturas:**

Temperatura ideal:

```json
{
    "descricao": "Temperatura ambiente",
    "tipo": "temperatura",
    "valor": 25
}
```

Temperatura intermediária:

```json
{
    "descricao": "Temperatura do equipamento",
    "tipo": "temperatura",
    "valor": 90
}
```

Temperatura acima do ideal:

```json
{
    "descricao": "Temperatura do motor",
    "tipo": "temperatura",
    "valor": 100
}
```

Limite crítico:

```json
{
    "descricao": "Temperatura crítica",
    "tipo": "temperatura",
    "valor": 110
}
```

### 8.2. Consultar todas as medições (GET)

**Rota:** `GET /medicoes`

Retorna todas as medições cadastradas no banco de dados.

### 8.3. Consultar uma medição específica (GET)

**Rota:** `GET /medicao/1`

Retorna os dados da medição com o ID informado.

### 8.4. Atualizar uma medição (PUT)

**Rota:** `PUT /medicao/1`

**Body (JSON):**

```json
{
    "descricao": "Temperatura atualizada",
    "tipo": "temperatura",
    "valor": 95
}
```

Atualiza os dados da medição correspondente ao ID informado.

### 8.5. Excluir uma medição (DELETE)

**Rota:** `DELETE /medicao/1`

Exclui a medição correspondente ao ID informado.

### 8.6. Testes de validação (POST)

Também é possível testar o tratamento de erros enviando dados inválidos.

**Descrição vazia:**

```json
{
    "descricao": "",
    "tipo": "temperatura",
    "valor": 85
}
```

**Tipo incorreto:**

```json
{
    "descricao": "Teste de pressão",
    "tipo": "pressao",
    "valor": 85
}
```

**Valor enviado como texto:**

```json
{
    "descricao": "Teste inválido",
    "tipo": "temperatura",
    "valor": "85"
}
```

**Temperatura abaixo do zero absoluto:**

```json
{
    "descricao": "Temperatura inválida",
    "tipo": "temperatura",
    "valor": -300
}
```

**JSON vazio:**

```json
{}
```

Esses testes devem retornar o código HTTP `400`, indicando que os dados enviados são inválidos.

## 9. Considerações Finais

Durante o desenvolvimento deste projeto, foi possível aprender e praticar conceitos importantes de desenvolvimento Back-end, como a criação de APIs utilizando Node.js e Express, integração com banco de dados MySQL e manipulação de requisições HTTP.

Uma das dificuldades encontradas foi implementar corretamente as operações de cadastro, consulta, atualização e exclusão, além de realizar as validações dos dados recebidos pela API.

Também foi possível trabalhar com conversão de unidades, classificação automática de temperaturas, tratamento de erros e utilização de comandos SQL.

A API atende ao objetivo proposto, permitindo armazenar e gerenciar medições térmicas, converter temperaturas de Celsius para Fahrenheit e identificar automaticamente sua classificação, tornando o monitoramento mais organizado e eficiente.