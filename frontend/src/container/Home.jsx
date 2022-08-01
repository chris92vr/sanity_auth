import React, { useEffect, useState } from 'react';
import { client } from '../client';
import BudgetCard from '../component/BudgetCard';

const Home = () => {
  const user = localStorage.getItem('username').split('"')[1];
  const userid = localStorage.getItem('userid');

  console.log(user);
  const [Budgets, setBudgets] = useState([]);

  useEffect(() => {
    const getBudgets = async () => {
      client.fetch('*[_type == "budget"]').then((res) => {
        setBudgets(res);
      });
    };
    getBudgets();
  }, []);
  console.log(Budgets);
  return (
    <>
      <div>Home</div>
      <h1> Hi {user}!</h1>
      {Array.isArray(Budgets)
        ? Budgets.map((Budget) => (
            <>
              <BudgetCard
                key={Budget._id}
                name={Budget.title}
                amount={Budget.totalAmount}
                max={Budget.max}
              />
              <h1>Title: {Budget.title}</h1>
              <h1>Created by: {Budget.createdBy._ref}</h1>
            </>
          ))
        : null}
    </>
  );
};

export default Home;
