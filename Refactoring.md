# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Two reasons for the refactoring:
1. The original fuction had too may if statements, some were nested. This makes it hard to read quickly as reader would need to keep track of the logic. Usually long functions are a potential room for refactoring.
2. Testing coverage percentage was too low. It did not cover all possible edge-cases. That was due to the compact code. Separating the code into different callables (functions) made it easy to provide comprehensive unit testing.
3. I decided not to modify the code in a way that matches modern coding standards. I would discuss the below with peers:
> 1. Replacing double quotes with single quotes for strings
> 2. Use ES module instead of commonJs