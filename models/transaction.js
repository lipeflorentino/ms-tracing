import * as dynamoose from 'dynamoose';

import moment from 'moment';

const TransactionSchema = new dynamoose.Schema({
  transactionId: {
    type: String,
    hashKey: true,
  },
  createdAt: {
    type: String,
    default: moment().format("YYYY-MM-DDThh:mm:ss:SSS"),
    index: [
      {
        global: true,
        name: 'CreatedAtIndex',
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
