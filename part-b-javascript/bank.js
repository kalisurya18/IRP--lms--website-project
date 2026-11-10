"use strict";

// PART 1: Types & Coercion

function parseAmount(input) {
  // Check missing values before conversion because Number(null) and Number("") can become 0.
  if (input === null || input === undefined) {
    throw new Error("Amount is required.");
  }

  // Only text and numeric inputs are accepted from the user.
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid amount type. Enter a string or number.");
  }

  let value = input;

  if (typeof value === "string") {
    value = value.trim();

    // Number("") returns 0, so reject blank text before converting it.
    if (value === "") {
      throw new Error("Amount cannot be empty.");
    }
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    throw new Error("Invalid amount. Enter a valid numeric value.");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  return amount;
}

// The + operator concatenates when one operand is a string: "5" + 2 becomes "52".
// The - operator performs numeric subtraction, so "5" - 2 becomes 3.
console.log('"5" + 2 =', "5" + 2);
console.log('"5" - 2 =', "5" - 2);

// typeof null is "object" because of a historical JavaScript behavior; it does not mean null is an object.
console.log('typeof null === "object":', typeof null === "object");

console.log("\nPART 1: parseAmount tests");
const amountInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

for (const input of amountInputs) {
  try {
    const amount = parseAmount(input);
    console.log("Valid amount:", amount);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// PART 2: Scoping & Hoisting

// const is used because the bank name should never be reassigned.
// let is used because the transaction counter changes as transactions are completed.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

transactionCounter += 1;
console.log("\nBank:", BANK_NAME);
console.log("Transaction counter:", transactionCounter);

// HOISTING DEMO

// JavaScript creates the execution context first, then executes statements.
// During creation, var declarations are hoisted and initialized to undefined;
// let/const declarations are hoisted but stay in the Temporal Dead Zone until initialized.
console.log("\nvar before declaration:", hoistedVar);
var hoistedVar = "I am declared with var";

try {
  console.log("let before declaration:", hoistedLet);
  let hoistedLet = "I am declared with let";
} catch (error) {
  console.log("Caught let error:", error.name + ": " + error.message);
}

// Function declarations are available before their definition because they are hoisted.
announce();

function announce() {
  console.log("Function declaration: Welcome to " + BANK_NAME + "!");
}

try {
  notify();
} catch (error) {
  // The var name is hoisted as undefined, but its function value is assigned later.
  console.log("Caught function expression error:", error.name + ": " + error.message);
}

var notify = function () {
  console.log("Function expression: Notification sent.");
};

// ASYNCHRONOUS LOOP BUG

// var has one shared function/global-scoped binding, so callbacks see the final value (3).
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 0);
}

// let creates a fresh lexical binding for each iteration, so each callback keeps its own value.
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 0);
}
