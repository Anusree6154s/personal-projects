const { catchAsync } = require("../../../src/utils/catchAsync.util");

describe('catchAsync', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call the provided function with req, res, and next', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const fn = jest.fn().mockResolvedValue();

    const wrappedFunction = catchAsync(fn);
    await wrappedFunction(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled(); 
  });

  test('should pass errors to next if an async function throws', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const error = new Error('Test error');
    const fn = jest.fn().mockRejectedValue(error);

    const wrappedFunction = catchAsync(fn);
    await wrappedFunction(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test('should pass errors to next if a sync function throws', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const error = new Error('Test error');
    const fn = jest.fn().mockImplementation(async () => {
      throw error
    })

    const wrappedFunction = catchAsync(fn);
    await wrappedFunction(req, res, next);
    expect(next).toHaveBeenCalledWith(error); 
  });

  test('should handle synchronous functions that don’t throw', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const fn = jest.fn(() => { /* No error thrown */ });

    const wrappedFunction = catchAsync(fn);
    await wrappedFunction(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled(); // Ensure no errors were passed to next
  });

  test('should handle asynchronous functions that resolve', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const fn = jest.fn().mockResolvedValue();

    const wrappedFunction = catchAsync(fn);
    await wrappedFunction(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled(); // Ensure no errors were passed to next
  });
});
