// "use client"
// import Image from 'next/image'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { useState } from 'react'


// export default function Home() {
//   const [todo,setTodo]= useState([{nam:"", amount:23}])

//   const [nam, setInputvale]=useState("")
// const [amount, setId]=useState(0)



// const deleteitems=(amount:any)=>{
//   let newarry=todo.filter(items=>items.amount!==amount)

// setTodo([...newarry])

// }

// const additems=()=>{
//   let obj:any=todo.find(items=>items.amount==amount)
//   if(obj){
// let newarry=todo.filter(items=>items.amount!==obj.amount)

// setTodo([...newarry,{ nam:nam,amount:amount }])
// setInputvale("")
//   setId(0)
//   return
//   }


// setTodo([...todo,{ nam:nam,amount:amount }])
// setInputvale("")
//   setId(0)
// }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-betweenS">
//       <h1 className='text-4xl mt-8 underline font-semibold'>Expense Tracker</h1>


//       <div className='flex gap-48 mt-8'>

//  <h1 className='text-3xl mt-8 underline font-semibold'> Expense  :$-322.00  </h1>


// <h1 className='text-3xl mt-8 underline font-semibold'> Income  :$3668.00  </h1>




//       </div>


//       <h1 className='text-3xl mt-10 underline font-semibold'> Balance:$0.00 </h1>

// <div className='bg-blue-800 rounded-xl w-28 h-12 mt-10'>
//       <button onClick={additems} className='text-xl text-white mt-2 ml-8 '>Add</button>

      

//       </div>

//       <div className='bg-black w-80 mt-10 h-1'></div>

//       <div className='grid grid-cols-1'>

// <input type="text" value={nam}  onChange={(e)=>setInputvale(e.target.value)}   className='p-2 mt-10 h-10 border w-64' placeholder='Enter amount ' />
// <input type="text"  value={amount}  onChange={(e:any)=>setId(e.target.value)}   className='p-2 mt-10 h-10 border w-64' placeholder='Enter description ' />

// <div>



  
// </div>




// <div className='flex gap-8 mt-10'>
//       <label>

//       Incom
//         <input
//           type="radio"
//           value="option1"
//           className='ml-4'
//           // checked={selectedOption === 'option1'}
//           // onChange={handleOptionChange}
//         />
        
//       </label>

//       <label className=''>

//     Expense
//         <input
//           type="radio"
//           value="option2"
//           className='ml-4'
//           // checked={selectedOption === 'option2'}
//           // onChange={handleOptionChange}
//         />
        
//       </label>

     
//     </div>
//       </div>

//       <div className='bg-black w-7/12 mt-10 h-1'></div>


//       <div className='bg-white mt-10 w-80 mb-20'>

//       <div className='flex gap-16 mt-10 ml-8'>
//         <span>name</span>  <span>amount</span>
       
        
//       </div>
//       {
// todo.map((items:any,i:any)=>{
//   return(
//       <div className='flex gap-16 mt-10  mb-8 ml-8 shadow-xl'>
//         <span>{items.nam}</span> <span>{items.amount}</span> <button className='bg-green-100 rounded-3xl w-36'>delete</button>

//        </div>

//   )})
// }
  

       

//        </div>

    
          
//     </main>
//   )
// }










"use client"



import React, { useState } from 'react';

interface TodoItem {
  name: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState<'income' | 'expense'>('expense');

  const deleteItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (name && amount) {
      const newItem: TodoItem = {
        name,
        amount: parseFloat(amount),
        type: selectedOption,
      };
      setTodos([...todos, newItem]);
      setName('');
      setAmount('');
    }
  };

  const calculateTotal = () => {
    let expenseTotal = 0;
    let incomeTotal = 0;

    todos.forEach((item) => {
      if (item.type === 'expense') {
        expenseTotal += item.amount;
      } else {
        incomeTotal += item.amount;
      }
    });

    return {
      expenseTotal,
      incomeTotal,
      balance: incomeTotal - expenseTotal,
    };
  };

  const { expenseTotal, incomeTotal, balance } = calculateTotal();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-4xl mt-8 underline font-semibold">Expense Tracker</h1>

      <div className="flex gap-48 mt-8">
        <h1 className="text-3xl mt-8 underline font-semibold">
          Expense: ${expenseTotal.toFixed(2)}
        </h1>
        <h1 className="text-3xl mt-8 underline font-semibold">
          Income: ${incomeTotal.toFixed(2)}
        </h1>
      </div>

      <h1 className="text-3xl mt-10 underline font-semibold">
        Balance: ${balance.toFixed(2)}
      </h1>

      <div className="bg-blue-800 rounded-xl w-28 h-12 mt-10">
        <button onClick={addTodo} className="text-xl text-white mt-2 ml-8">
          Add
        </button>
      </div>

      <div className="bg-black w-80 mt-10 h-1"></div>

      <div className="grid grid-cols-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mt-10 h-10 border w-64"
          placeholder="Enter description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 mt-10 h-10 border w-64"
          placeholder="Enter amount"
        />

        <div className="flex gap-8 mt-10">
          <label>
            Income
            <input
              type="radio"
              value="income"
              className="ml-4"
              checked={selectedOption === 'income'}
              onChange={() => setSelectedOption('income')}
            />
          </label>

          <label>
            Expense
            <input
              type="radio"
              value="expense"
              className="ml-4"
              checked={selectedOption === 'expense'}
              onChange={() => setSelectedOption('expense')}
            />
          </label>
        </div>
      </div>

      <div className="bg-black w-7/12 mt-10 h-1"></div>

      <div className="bg-white mt-10 w-80 mb-20">
        <div className="flex gap-16 mt-10 ml-8">
          <span>Name</span> <span>Amount</span>
        </div>
        {todos.map((item, index) => (
          <div className="flex gap-16 mt-10 mb-8 ml-8 shadow-xl" key={index}>
            <span>{item.name}</span> <span>${item.amount.toFixed(2)}</span>
            <button
              className="bg-green-100 rounded-3xl w-36"
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
