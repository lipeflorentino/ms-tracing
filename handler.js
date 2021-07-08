import {
  saveRequest,
  getRequest,
  deleteRequest,
  getTransaction,
  newTransaction,
  deleteTransaction,
  updateTransaction,
} from './src/functions';

// sls invoke local -f SaveRequest -s dev -p tests/saveRequest.json --aws-profile dev-uff
export const SaveRequest = async (event, context) => saveRequest(event, context);

// sls invoke local -f GetRequest -s dev -p tests/getRequest.json --aws-profile dev-uff
export const GetRequest = async (event, context) => getRequest(event, context);

// sls invoke local -f DeleteRequest -s dev -p tests/deleteRequest.json --aws-profile dev-uff
export const DeleteRequest = async (event, context) => deleteRequest(event, context);

// sls invoke local -f GetTransaction -s dev -p tests/getTransaction.json --aws-profile dev-uff
export const GetTransaction = async (event, context) => getTransaction(event, context);

// sls invoke local -f NewTransaction -s dev -p tests/newTransaction.json --aws-profile dev-uff
export const NewTransaction = async (event, context) => newTransaction(event, context);

// sls invoke local -f DeleteTransaction -s dev -p tests/deleteTransaction.json --aws-profile dev-uff
export const DeleteTransaction = async (event, context) => deleteTransaction(event, context);

// sls invoke local -f UpdateTransaction -s dev -p tests/updateTransaction.json --aws-profile dev-uff
export const UpdateTransaction = async (event, context) => updateTransaction(event, context);