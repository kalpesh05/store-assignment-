const categoryValidator = require('../../api/validators/categoryValidators');

describe('Category Validator', () => {
  it('should validate a valid category payload', () => {
    const payload = {
      name: 'Electronics',
      description: 'Devices and gadgets'
    };

    const { error } = categoryValidator.create.validate(payload);
    expect(error).toBeUndefined();
  });

  it('should fail when name is missing', () => {
    const payload = {
      description: 'Missing name'
    };

    const { error } = categoryValidator.create.validate(payload);
    expect(error).toBeDefined();
    expect(error.message).toBe('Category name must be between 2 to 50 characters.');
  });

  it('should allow optional description to be empty', () => {
    const payload = {
      name: 'Books',
      description: ''
    };

    const { error } = categoryValidator.create.validate(payload);
    expect(error).toBeUndefined();
  });
});
