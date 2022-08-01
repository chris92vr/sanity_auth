import React from 'react';

export default function BudgetCard({ title, amount, max }) {
  return (
    <div class="flex justify-center">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
          {title}
        </h5>
        <div class="text-gray-700 text-base leading-tight"> {amount} </div>
        <div class="text-gray-700 text-base leading-tight"> {max} </div>
        <div class="w-full bg-gray-200 rounded-full">
          <div
            class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
            style={{ width: '25%' }}
          >
            {' '}
            {getRatio(amount, max)}
          </div>
        </div>
        <button
          type="button"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Button
        </button>
      </div>
    </div>
  );
}

function getRatio(amount, max) {
  return (amount / max) * 100;
}
