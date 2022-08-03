import { Form, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { client } from '../client';

export default function AddBudgetButton({ show, handleClose }) {
  const [name, setName] = useState('');
  const [max, setMax] = useState('');
  console.log(localStorage.getItem('userid'));
  const userid = localStorage.getItem('userid').split('"')[1];
  const submit = (e) => {
    e.preventDefault();
    const doc = {
      _id: Math.random().toString(),
      title: name,
      max: parseInt(max),
      totalAmount: 0,
      _type: 'budget',
      createdBy: {
        _type: 'reference',
        _ref: userid,
      },
    };
    client.createIfNotExists(doc).then(() => {
      handleClose();
      console.log(`Created budget with id: ${doc._id}`);
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              onChange={(e) => setMax(e.target.value)}
              type="number"
              required
              min={0}
              step={0.01}
            />
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