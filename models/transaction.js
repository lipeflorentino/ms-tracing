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
        name: 'elapsedTimeIndex',
        rangeKey: 'elapsedTime',
      },
    ]
  },
  elapsedTime: {
    type: Number,
    default: Date.now(),
  },
  status: {
    type: String,
    index: [
      {
        global: true,
        name: 'statusIndex',
        rangeKey: 'elapsedTime',
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
