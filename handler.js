import {
  saveRequest,
  getRequest,
  listRequests,
  deleteRequest,
  getTransaction,
  newTransaction,
  deleteTransaction,
  updateTransaction,
  listTransactions,
} from './src/functions';

// sls invoke local -f SaveRequest -s $STAGE -p tests/saveRequest.json --aws-profile $PROFILE
export const SaveRequest = async (event, context) => saveRequest(event, context);

// sls invoke local -f GetRequest -s $STAGE -p tests/getRequest.json --aws-profile $PROFILE
export const GetRequest = async (event, context) => getRequest(event, context);

// sls invoke local -f ListRequest -s $STAGE -p tests/listRequest.json --aws-profile $PROFILE
export const ListRequest = async (event, context) => listRequests(event, context);

// sls invoke local -f DeleteRequest -s $STAGE -p tests/deleteRequest.json --aws-profile $PROFILE
export const DeleteRequest = async (event, context) => deleteRequest(event, context);

// sls invoke local -f GetTransaction -s $STAGE -p tests/getTransaction.json --aws-profile $PROFILE
export const GetTransaction = async (event, context) => getTransaction(event, context);

// sls invoke local -f NewTransaction -s $STAGE -p tests/newTransaction.json --aws-profile $PROFILE
export const NewTransaction = async (event, context) => newTransaction(event, context);

// sls invoke local -f DeleteTransaction -s $STAGE -p tests/deleteTransaction.json --aws-profile $PROFILE
export const DeleteTransaction = async (event, context) => deleteTransaction(event, context);

// sls invoke local -f UpdateTransaction -s $STAGE -p tests/updateTransaction.json --aws-profile $PROFILE
export const UpdateTransaction = async (event, context) => updateTransaction(event, context);

// sls invoke local -f ListTransactions -s $STAGE -p tests/listTransactions.json --aws-profile $PROFILE
export const ListTransactions = async (event, context) => listTransactions(event, context);