// A helper function to create random mock data
const generateOrder = (index) => {
  const id = (index + 1).toString().padStart(3, '0');
  const required = Math.floor(Math.random() * 100 + 50) * 10; // 500-1500
  const actual = Math.floor(Math.random() * required); // 0 - required
  return {
    id: `JO-${id}`,
    name: `Order ${id}`,
    actualOutput: actual,
    requiredOutput: required,
  };
};

// Create an array of 32 mock orders
export const allJobOrders = Array.from({ length: 32 }, (_, i) =>
  generateOrder(i)
);

/*
// This is what the data looks like:
[
  { id: 'JO-001', name: 'Order 001', actualOutput: 320, requiredOutput: 1000 },
  { id: 'JO-002', name: 'Order 002', actualOutput: 800, requiredOutput: 900 },
  ... 30 more ...
]
*/