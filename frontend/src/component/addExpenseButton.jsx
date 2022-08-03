import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { client } from '../client';

export default function AddExpenseButton({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budget_id, setBudget_id] = useState('');
  const [budgets, setBudgets] = useState([]);
  const userid = localStorage.getItem('userid');

  const submit = (e) => {
    e.preventDefault();

    const doc = {
      _id: Math.random().toString(),
      title: description,
      amount: parseFloat(amount),
      _type: 'expense',
      createdAt: new Date(),
      budget_id: {
        _type: 'reference',
        _ref: budget_id,
      },
    };

    client.createIfNotExists(doc).then(() => {
      handleClose();
      console.log(`Created expense with id: ${doc._id}`);
    });
  };

  useEffect(() => {
    const getBudgets = async () => {
      client
        .fetch('*[_type == "budget" && references(' + userid + ') ]')
        .then((res) => {
          setBudgets(res);
        });
    };
    getBudgets();
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              onChange={(e) => setAmount(e.target.value)}
              type="int"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budget_id">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              defaultValue={defaultBudgetId}
              onChange={(e) => setBudget_id(e.target.value)}
              required
            >
              <option value="">Select a budget</option>
              {Array.isArray(budgets)
                ? budgets.map((budget) => (
                    <option key={budget._id} value={budget._id}>
                      {budget.title}
                    </option>
                  ))
                : null}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
