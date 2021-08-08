import * as dynamoose from 'dynamoose';

import moment from 'moment';

import { v5 as uuid } from 'uuid';

const TransactionSchema = new dynamoose.Schema({
  transactionId: {
    type: String,
    hashKey: true,
    default: uuid('https://www.w3.org/', 'c3e23e31-83ea-4a96-9ead-49029c96abdd'),
  },
  createdAt: {
    type: String,
    default: moment().format(),
    index: [
      {
        global: true,
        name: 'DateIndex',
        rangeKey: 'status',
      },
    ]
  },
  status: {
    type: String,
    index: [
      {
        global: true,
        name: 'StatusIndex',
      },
    ],
  },
}, {
  saveUnknown: true,
  timestamps: false,
});

const Transaction = dynamoose.model(
  process.env.transactionTable,
  TransactionSchema,
  {
    create: false,
    waitForActive: false,
  },
);

export default Transaction;
