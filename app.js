// Importa o módulo express
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Cria uma instância do express
const app = express();

// Define a porta na qual o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Definições do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Itens',
      version: '1.0.0',
      description: 'API simples de CRUD para gerenciamento de itens',
      contact: {
        name: 'Profesor Ermerson',
        email: 'seuemailprofessor@ermerson.com'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local'
        }
      ]
    }
  },
  apis: ['./app.js'] // Caminho para o arquivo que contém as anotações da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Array para armazenar os itens localmente
let items = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do item...
 *         name:
 *           type: string
 *           description: Nome do item 
 *       example:
 *         id: 1
 *         name: "Item exemplo2"
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Operações relacionadas a itens
 */

/**
 * @swagger
 * /info:
 *   sumary: qualquer coisa
 *   description: apenas testando mais informações
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Cria um novo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
app.post('/items', (req, res) => {
    const item = { id: items.length + 1, name: req.body.name };
    items.push(item);
    res.status(201).json(item);
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna todos os itens
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
app.get('/items', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualiza um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.name = req.body.name;
    res.json(item);
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       204:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    items.splice(itemIndex, 1);
    res.status(204).send();
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})