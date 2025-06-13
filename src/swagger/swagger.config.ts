import { Role, TransactionStatus, TransactionType } from '@/interfaces';
import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'POS Terminal API',
    version: '1.0.0',
    description: 'POS Terminal Simulator',
    contact: {
      name: 'Santiago Lorduy',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      InternalServerError: {
        type: 'object',
        required: ['statusCode', 'message'],
        properties: {
          statusCode: {
            type: 'integer',
            example: 500,
          },
          message: {
            type: 'string',
            example: 'Internal Server Error',
          },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      TransactionDTO: {
        type: 'object',
        required: ['terminalId', 'amount', 'currency', 'cardMasked', 'transactionType', 'status'],
        properties: {
          terminalId: {
            type: 'string',
            example: 'POS-001',
          },
          amount: {
            type: 'number',
            minimum: 0,
            example: 25000,
          },
          currency: {
            type: 'string',
            enum: ['COP'],
            example: 'COP',
          },
          cardMasked: {
            type: 'string',
            example: '41111111123',
          },
          transactionType: {
            type: 'string',
            enum: Object.values(TransactionType),
            example: 'sale',
          },
          status: {
            type: 'string',
            enum: Object.values(TransactionStatus),
            example: 'approved',
          },
        },
      },
      TransactionResponse: {
        allOf: [
          { $ref: '#/components/schemas/TransactionDTO' },
          {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '664a1234567890abcdef1234',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-06-13T14:25:43.511Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-06-13T14:26:43.511Z',
              },
            },
          },
        ],
      },
      CreateTransactionResponse: {
        type: 'object',
        required: ['message', 'data'],
        properties: {
          message: {
            type: 'string',
            example: 'Transacción creada con éxito',
          },
          data: {
            $ref: '#/components/schemas/TransactionResponse',
          },
        },
      },
      TransactionsResponse: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/TransactionResponse',
        },
      },
      SignupDTO: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'test@mail.co',
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            example: '123456',
          },
        },
      },
      LoginDTO: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'test@mail.co',
          },
          password: {
            type: 'string',
            format: 'password',
            example: '123456',
          },
        },
      },
      UserResponse: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '664a1234567890abcdef1234',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'test@mail.co',
          },
          role: {
            type: 'string',
            enum: [Role.Admin],
            default: Role.Admin,
            description: 'El rol del usuario',
            example: Role.Admin,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-13T14:25:43.511Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-13T14:26:43.511Z',
          },
        },
      },
      SignupResponse: {
        type: 'object',
        required: ['message', 'user'],
        properties: {
          message: {
            type: 'string',
            example: 'Usuario creado con éxito',
          },
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
        },
      },
      LoginResponse: {
        type: 'object',
        required: ['token', 'user'],
        properties: {
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          },
          user: {
            $ref: '#/components/schemas/UserResponse',
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);
