import React, { useEffect, useState } from 'react';

import { Modal, Button, Stack } from 'react-bootstrap';
import { client } from '../client';
import { currencyFormatter } from '../utils';

function ViewExpenses({ budgetId, handleClose }) {
  const [expenses, setExpenses] = useState([]);
  const useri = localStorage.getItem('userid').split('"')[1];

  budgetId = JSON.stringify(budgetId);

  function deleteBudget(budgetId) {
    const budgetIdi = budgetId.split('"')[1];
    if (budgetId !== undefined) {
      client
        .fetch('*[_type == "expense" && references(' + budgetId + ')]')
        .then((data) => {
          data.forEach((data) => {
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
    window.alert('Budget deleted!');
    window.location.reload();
  }

  function DeleteExpense(expenseId) {
    const budgetIdi = budgetId.split('"')[1];
    if (expenseId !== undefined) {
      client
        .fetch('*[_type == "expense" && _id == "' + expenseId + '"]')
        .then((data) => {
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
              window.location.reload();
              window.alert('Expense deleted!');
            })
            .catch((err) => console.log(err));
        });
    }
  }

  useEffect(() => {
    const getExpenses = async () => {
      client
        .fetch('*[_type == "expense"  && references(' + budgetId + ') ]')
        .then((data) => {
          setExpenses(data);
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
