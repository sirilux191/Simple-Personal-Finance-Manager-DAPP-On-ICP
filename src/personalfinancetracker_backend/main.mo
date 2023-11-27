// Import necessary libraries
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

// Define the actor
actor {
  // TYPES
  // Define data types for Income and Expense
  type Income = {
    amount : Nat;
    description : Text;
    source : Text;
  };

  type Expense = {
    amount : Nat;
    description : Text;
    category : Text;
  };
  // TYPES

  // HASHMAP TO STORE VALUES
  // Create HashMaps to store financial data
  let balanceValueHashMap = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
  let incomeHashMap = HashMap.HashMap<Principal, [Income]>(0, Principal.equal, Principal.hash);
  let expenseValueHashMap = HashMap.HashMap<Principal, Nat>(0, Principal.equal, Principal.hash);
  let expensesHashMap = HashMap.HashMap<Principal, [Expense]>(0, Principal.equal, Principal.hash);
  // HASHMAP TO STORE VALUES

  // Function to add income
  public shared ({ caller }) func addIncome(amount : Nat, inputInfo : Text, source : Text) : async Result.Result<Text, Text> {
    // Check if the caller is anonymous
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous persons can't register, please login with wallet or internet identity");
    };

    // Check if the user has existing income
    switch (incomeHashMap.get(caller)) {
      case (?array) {
        // If the user has previous income data, add the new income to the array
        let newIncome : Income = {
          amount = amount;
          description = inputInfo;
          source = source;
        };
        let tempBuffer = Buffer.fromArray<Income>(array);
        tempBuffer.add(newIncome);
        incomeHashMap.put(caller, Buffer.toArray(tempBuffer));

        // Update the user's balance
        switch (balanceValueHashMap.get(caller)) {
          case (?value) { balanceValueHashMap.put(caller, amount + value) };
          case (null) {};
        };
        #ok("Successfully added your income");
      };
      case (null) {
        // If the user doesn't have previous income data, create a new array
        let newIncome : Income = {
          amount = amount;
          description = inputInfo;
          source = source;
        };
        let tempBuffer = Buffer.Buffer<Income>(0);
        tempBuffer.add(newIncome);
        incomeHashMap.put(caller, Buffer.toArray(tempBuffer));
        balanceValueHashMap.put(caller, amount);
        #ok("Successfully added your income details");
      };
    };
  };

  // Function to add an expense
  public shared ({ caller }) func addExpense(cost : Nat, purchaseInfo : Text, category : Text) : async Result.Result<Text, Text> {
    // Check if the caller is anonymous
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous persons can't register, please login with wallet or internet identity");
    };

    // Check if the user's expenses exceed their balance
    switch (balanceValueHashMap.get(caller)) {
      case (?balance) {
        // Check if the user has existing expenses
        switch (expenseValueHashMap.get(caller)) {
          case (?expense) {
            if (expense + cost > balance) {
              return #err("Your expenses are more than your balance");
            };
          };
          case (null) {
            if (cost > balance) {
              return #err("Your expenses are more than your balance");
            };
          };
        };
      };
      case (null) {
        return #err("You don't have any kind of Income");
      };
    };

    // Add the expense to the user's expense list
    switch (expensesHashMap.get(caller)) {
      case (?array) {
        // If the user has previous expenses, add the new expense to the array
        let newExpense : Expense = {
          amount = cost;
          description = purchaseInfo;
          category = category;
        };
        let tempBuffer = Buffer.fromArray<Expense>(array);
        tempBuffer.add(newExpense);
        expensesHashMap.put(caller, Buffer.toArray(tempBuffer));

        // Update the user's total expenses
        switch (expenseValueHashMap.get(caller)) {
          case (?value) { expenseValueHashMap.put(caller, cost + value) };
          case (null) {};
        };
        #ok("Successfully added your expense");
      };
      case (null) {
        // If the user doesn't have previous expenses, create a new array
        let newExpense : Expense = {
          amount = cost;
          description = purchaseInfo;
          category = category;
        };
        let tempBuffer = Buffer.Buffer<Expense>(0);
        tempBuffer.add(newExpense);
        expensesHashMap.put(caller, Buffer.toArray(tempBuffer));
        expenseValueHashMap.put(caller, cost);
        #ok("Successfully added your expense");
      };
    };
  };

  // Function to get the user's balance
  public shared ({ caller }) func getBalance() : async Result.Result<Nat, Text> {
    // Check if the user has a balance
    switch (balanceValueHashMap.get(caller)) {
      case (?value) {
        #ok(value);
      };
      case (null) { #err("Sorry you are not registered") };
    };
  };

  // Function to get the total user expenses
  public shared ({ caller }) func getExpense() : async Result.Result<Nat, Text> {
    // Check if the user has expenses
    switch (expenseValueHashMap.get(caller)) {
      case (?value) {
        #ok(value);
      };
      case (null) { #err("Sorry you are not registered") };
    };
  };

  // Function to get the list of incomes
  public shared ({ caller }) func getListOfIncomes() : async Result.Result<[Income], Text> {
    // Check if the user has income data
    switch (incomeHashMap.get(caller)) {
      case (?value) {
        #ok(value);
      };
      case (null) { #err("Sorry you don't have Income :(") };
    };
  };

  // Function to get the list of expenses
  public shared ({ caller }) func getListOfExpenses() : async Result.Result<[Expense], Text> {
    // Check if the user has expense data
    switch (expensesHashMap.get(caller)) {
      case (?value) {
        #ok(value);
      };
      case (null) {
        #err("Sorry you don't have any Expenses");
      };
    };
  };
};
