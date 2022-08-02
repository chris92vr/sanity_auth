import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { client } from '../client';
import BudgetCard from '../component/BudgetCard';
import CurrentDate from '../component/CurrentDate';
import AddBudgetButton from '../component/AddBudgetButton';

function Home() {
  const [showAddBudgetButton, setShowAddBudgetButton] = useState(false);

  const user = localStorage.getItem('username').split('"')[1];
  const userid = localStorage.getItem('userid');

  console.log(user);
  const [Budgets, setBudgets] = useState([]);

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
  console.log(Budgets);
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mt-4 mb-4">
          <h1 className=" me-auto">Budget Tracker © </h1>
          <CurrentDate />
        </Stack>

        <Stack direction="horizontal" className="mt-4 mb-4">
          <h1> Hi {user}!</h1>
        </Stack>
        <Stack direction="horizontal" gap="2" className="mt-4 mb-4">
          <Button
            variant="primary"
            onClick={() => setShowAddBudgetButton(true)}
          >
            Add Budget
          </Button>
        </Stack>
        <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />
        {Array.isArray(Budgets)
          ? Budgets.map((Budget) => (
              <>
                <BudgetCard
                  key={Budget._id}
                  name={Budget.title}
                  amount={Budget.totalAmount}
                  max={Budget.max}
                />
              </>
            ))
          : null}
      </Container>
    </>
  );
}

export default Home;
