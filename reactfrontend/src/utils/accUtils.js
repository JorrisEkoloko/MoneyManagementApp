import axios from 'axios';

const API_URL = 'http://localhost:8080';

const API_ACC = API_URL + '/api/bank-accounts';

const API_TRA = API_ACC + '/transaction';

export async function getAccounts() {
  let result;
  result = await axios
    .get(API_ACC, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    })
    .then(res => res.data)
    .then(res => {
      // console.log(res)
      return res;
    });
  // console.log(result);
  return result;
}

export async function getTransactions(id) {
  let result;
  result = await axios
    .get(API_ACC + '/' + id + '/transaction-log', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
    })
    .then(res => res.data)
    .then(res => {
      console.log(res);
      return res;
    });
  console.log(result);
  return result;
}

export async function makeTransaction(type = '', { source, destination, amount }) {
  let result;
  let src = source,
    dst = destination,
    amt = amount;
  if (type === '') {
    console.log('Requires a transaction type');
    return null;
  }
  if (type === 'deposit') {
    src = null;
  }
  if (type === 'withdrawal') {
    dst = null;
  }
  result = await axios
    .post(
      API_TRA,
      {
        source: src,
        destination: dst,
        transactionValue: amt,
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('id_token') },
      },
    )
    .then(res => res.data)
    .then(res => {
      // console.log(res);
      return res;
    });
  console.log(result);
  return result;
}
