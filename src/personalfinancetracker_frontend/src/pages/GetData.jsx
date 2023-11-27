// Import necessary libraries
import React from "react";
//DIFFERENCE 1
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState, useCallback } from "react";
//DIFFERENCE 1
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./GetData.css";
//DIFFERENCE 2
// Connect2ic: Import Connect2ic library to interact with the backend canister
import { useCanister } from "@connect2ic/react";
//
//DIFFERENCE 2

const GetData = () => {
  //DIFFERENCE 3
  // Connect2ic: Use the "personalfinancetracker_backend" canister
  const [personalfinancetracker_backend] = useCanister(
    "personalfinancetracker_backend"
  );
  //
  //DIFFERENCE 3

  //DIFFERENCE 4

  // Define state variables
  const [displayBool, setDisplayBool] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  //DIFFERENCE 4

  //DIFFERENCE 5

  // Define columns for the Income and Expense tables
  const columnsIncomes = [
    {
      header: "Income Amount",
      accessorKey: "amount",
    },
    {
      header: "Income Description",
      accessorKey: "description",
    },
    {
      header: "Income Source",
      accessorKey: "source",
    },
  ];

  const columnsExpenses = [
    {
      header: "Expense Amount",
      accessorKey: "amount",
    },
    {
      header: "Expense Description",
      accessorKey: "description",
    },
    {
      header: "Expense Category",
      accessorKey: "category",
    },
  ];

  //DIFFERENCE 5

  //DIFFERENCE 6

  // Create a table using React Table library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
  });

  //DIFFERENCE 6

  // Initialize navigation hook for routing
  const navigate = useNavigate();

  // Define callback functions for navigation
  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButton1Click = useCallback(() => {
    navigate("/add-entry");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/getdata");
  }, [navigate]);

  //DIFFERENCE 7
  // Function to fetch and display the list of incomes
  const getIncomesList = async () => {
    const value = await personalfinancetracker_backend.getListOfIncomes();
    Object.keys(value).forEach((key) => {
      if (key === "ok") {
        const tempDataList = value[key].map((income) => {
          return {
            amount: Number(income.amount),
            description: income.description,
            source: income.source,
          };
        });
        setData(tempDataList);
        setColumns(columnsIncomes);
        setDisplayBool(true);
      } else {
        alert(value[key]);
      }
    });
  };

  // Function to fetch and display the list of expenses
  const getExpensesList = async () => {
    const value = await personalfinancetracker_backend.getListOfExpenses();
    Object.keys(value).forEach((key) => {
      if (key === "ok") {
        const tempDataList = value[key].map((expense) => {
          return {
            amount: Number(expense.amount),
            description: expense.description,
            category: expense.category,
          };
        });
        setData(tempDataList);
        setColumns(columnsExpenses);
        setDisplayBool(true);
      } else {
        alert(value[key]);
      }
    });
  };

  // Function to fetch and update the user's balance and total expenses
  const getBalanceAndExpense = async () => {
    const balance = await personalfinancetracker_backend.getBalance();
    Object.keys(balance).forEach((key) => {
      if (key === "ok") {
        setTotalBalance(Number(balance[key]));
      } else {
        setTotalBalance(0);
      }
    });
    const expense = await personalfinancetracker_backend.getExpense();
    Object.keys(expense).forEach((key) => {
      if (key === "ok") {
        setTotalExpense(Number(expense[key]));
      } else {
        setTotalExpense(0);
      }
    });
  };

  // Use useEffect to fetch the balance and total expenses when the component mounts
  useEffect(() => {
    getBalanceAndExpense();
  }, []);

  ////DIFFERENCE 7
  // Render the component
  return (
    <div className="get-data1">
      <Header
        headerAlignSelf="stretch"
        onButtonClick={onButtonClick}
        onButton1Click={onButton1Click}
        onButton2Click={onButton2Click}
      />
      <div className="frame">
        {/* DIFFERENCE 8 */}
        <div className="information-text">
          <p>Your Total Balance is: {totalBalance}</p>
          <p>Your Total Expense is: {totalExpense}</p>
        </div>
        <div className="buttonframe">
          <button
            onClick={getIncomesList}
            className="button8"
          >
            <div className="button9">Get List of Income</div>
          </button>
          <button
            onClick={getExpensesList}
            className="button8"
          >
            <div className="button9">Get List of Expenses</div>
          </button>
          {/* DIFFERENCE 8 */}
        </div>
        {/* DIFFERENCE 9 */}
        {displayBool ? (
          <div>
            <input
              type="text"
              value={filtering}
              onChange={(e) => {
                setFiltering(e.target.value);
              }}
            ></input>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          {
                            asc: "⬆",
                            desc: "⬇",
                          }[header.column.getIsSorted() ?? null]
                        }
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        data-column={flexRender(
                          cell.column.columnDef.header,
                          cell.getContext()
                        )}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={() => table.setPageIndex(0)}>First Page</button>
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous Page
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next Page
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Last Page
              </button>
            </div>
          </div>
        ) : (
          <div className="information-text">
            Choose to view past Incomes List or Expenses List by using above
            buttons
          </div>
        )}
        {/* DIFFERENCE 9 */}
      </div>
    </div>
  );
};

export default GetData;
