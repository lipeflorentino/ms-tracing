import * as dynamoose from 'dynamoose';

import moment from 'moment';

import { v4 as uuidv4 } from 'uuid';



const TracingSchema = new dynamoose.Schema({
  requestId: {
    type: String,
    hashKey: true,
    default: uuidv4(),
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
  transactionId: {
    type: Number,
    index:[
      {
        global: true,
        name: 'TransactionIndex',
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
  type: String,
  service: String,
  input: Object,
  output: Object,
  ErrorTrace: Object,
}, {
  saveUnknown: true,
  timestamps: false,
});

const Tracing = dynamoose.model(
  process.env.tracingTable,
  TracingSchema,
  {
    create: false,
    waitForActive: false,
  },
);

export default Tracing;
