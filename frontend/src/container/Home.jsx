import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { client } from '../client';
import BudgetCard from '../component/BudgetCard';
import CurrentDate from '../component/CurrentDate';
import AddBudgetButton from '../component/AddBudgetButton';
import AddExpenseButton from '../component/addExpenseButton';
import ViewExpenses from '../component/ViewExpenses';
import logo from '../assets/logowhite.png';

function Home() {
  const [showAddBudgetButton, setShowAddBudgetButton] = useState(false);
  const [showAddExpenseButton, setShowAddExpenseButton] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const [total_max, setTotalMax] = useState('');
  const [total_amount, setTotalAmount] = useState('');

  const [user, setUser] = useState('');
  const userid = localStorage.getItem('userid');

  console.log(user);
  console.log('userid:', userid);
  const [Budgets, setBudgets] = useState([]);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseButton(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  useEffect(() => {
    const getUser = async () => {
      client
        .fetch('*[_type == "user" && _id == ' + userid + ']')
        .then((res) => {
          setTotalMax(res[0].totalMax);
          setTotalAmount(res[0].totalAmount);
          setUser(res[0].userName);
          console.log('user:', res);
        });
    };
    getUser();
  }, []);

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

  if (!Budgets.length) {
    return (
      <div>
        <Container className="my-4">
          <Stack direction="center" className="mt-4 mb-4">
            <img src={logo} alt="logo" className="logo" />
          </Stack>
          <Stack className="mt-4 mb-4">
            <h1>Welcome {user}!</h1>
            <h1 className="mt-4 mb-4">
              You have no budgets yet. <br />
              <Button
                variant="primary"
                className="Button mt-3"
                onClick={() => setShowAddBudgetButton(true)}
              >
                Add Budget
              </Button>
            </h1>
          </Stack>
        </Container>
        <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />
      </div>
    );
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mt-4 mb-4">
          <img src={logo} alt="logo" className="logo" />
        </Stack>

        <Stack direction="horizontal" className="mt-4 mb-4">
          <h1> Hi {user}!</h1>
          <CurrentDate />
        </Stack>
        <Stack direction="horizontal" gap="2" className="mt-4 mb-4">
          <Button
            variant="primary"
            className="Button"
            onClick={() => setShowAddBudgetButton(true)}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />
        <AddExpenseButton
          show={showAddExpenseButton}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseButton(false)}
        />
        <ViewExpenses
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.isArray(Budgets)
            ? Budgets.map((Budget) => (
                <>
                  <BudgetCard
                    key={Budget._id}
                    name={Budget.title}
                    amount={Budget.totalAmount}
                    max={Budget.max}
                    onAddExpenseClick={() => setShowAddExpenseButton(true)}
                    onViewExpensesClick={() =>
                      setViewExpensesModalBudgetId(Budget._id)
                    }
                  />
                </>
              ))
            : null}
          {Budgets === undefined ? <h1>No Budgets</h1> : undefined}
          {Budgets !== null ? (
            <>
              <BudgetCard
                amount={total_amount}
                name="Total"
                gray
                max={total_max}
                hideButtons
              />
            </>
          ) : null}
        </div>
      </Container>
    </>
  );
}

export default Home;
