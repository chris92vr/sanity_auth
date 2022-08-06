import React, { useEffect, useState } from 'react';

import { Modal, Button, Stack } from 'react-bootstrap';
import { client } from '../client';
import { currencyFormatter } from '../utils';

function ViewExpenses({ budgetId, handleClose }) {
  const [expenses, setExpenses] = useState([]);
  const useri = localStorage.getItem('userid').split('"')[1];
  const [budgetI, setBudgetId] = useState('');

  console.log('budgetId: ', budgetId);
  budgetId = JSON.stringify(budgetId);

  function deleteBudget(budgetId) {
    console.log('budgetIgdsgd: ', budgetId);
    const budgetIdi = budgetId.split('"')[1];

    client
      .fetch('*[_type == "expense" && references(' + budgetId + ')]')
      .then((data) => {
        console.log('darfasfrta: ', data);
        data.forEach((data) => {
          console.log('dadsadta: ', data);
          client.delete(data._id);
        });
      });

    client.delete(budgetIdi);
    client
      .fetch('*[_type == "budget" && _id == ' + budgetId + ']')
      .then((data) => {
        client
          .patch(useri)
          .dec({
            totalAmount: parseFloat(data[0].totalAmount),
            totalMax: parseFloat(data[0].max),
          })
          .commit()
          .catch((err) => console.log(err));
      });
  }

  function DeleteExpense(expenseId) {
    console.log('expenseId: ', expenseId);
    const budgetIdi = budgetId.split('"')[1];
    client
      .fetch('*[_type == "budget" && _id == ' + budgetId + ']')
      .then((data) => {
        console.log('data: ', data);
        setBudgetId(data[0]._id);
        console.log('budget id: ', budgetI);
      });
    client
      .fetch('*[_type == "expense" && _id == "' + expenseId + '"]')
      .then((data) => {
        console.log('expense data: ', data[0].amount);
        client
          .patch(useri)
          .dec({ totalAmount: parseFloat(data[0].amount) })
          .commit()
          .catch((err) => console.log(err));
        client
          .patch(budgetIdi)
          .dec({ totalAmount: parseFloat(data[0].amount) })
          .commit()
          .catch((err) => console.log(err));
      })
      .then(() => {
        client
          .delete(expenseId)
          .then(() => {
            console.log('deleted');
            window.location.reload();
          })
          .catch((err) => console.log(err));
      });
  }

  useEffect(() => {
    const getExpenses = async () => {
      client
        .fetch('*[_type == "expense"  && references(' + budgetId + ') ]')
        .then((data) => {
          setExpenses(data);

          console.log('data: ', data);
        });
    };

    getExpenses();
  }, [budgetId]);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses </div>

            <Button
              onClick={() => {
                deleteBudget(budgetId);
                handleClose();
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {Array.isArray(expenses)
            ? expenses.map((expense) => (
                <Stack direction="horizontal" gap="2" key={expense._id}>
                  <div className="me-auto fs-4">
                    {expense.title} - {expense.createdAt.split('T')[0]}
                  </div>
                  <div className="fs-5">
                    {currencyFormatter.format(expense.amount)}
                  </div>
                  <Button
                    onClick={() => DeleteExpense(expense._id)}
                    size="sm"
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Stack>
              ))
            : null}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpenses;
