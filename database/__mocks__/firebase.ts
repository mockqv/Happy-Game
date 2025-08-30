export const db = {
  collection: jest.fn(),
};

export const auth = {};
export const googleProvider = {};

// Mock for firestore functions
export const collection = jest.fn();
export const getDocs = jest.fn(() => Promise.resolve({
  docs: [
    { data: () => ({ count: 10 }) },
    { data: () => ({ count: 5 }) },
  ],
  size: 2,
}));
export const query = jest.fn();
export const where = jest.fn();
export const serverTimestamp = jest.fn();
export const addDoc = jest.fn();
