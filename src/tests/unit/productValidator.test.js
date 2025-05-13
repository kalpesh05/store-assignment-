const productValidator = require('../../api/validators/productValidators');

describe('Product Validator', () => {
  it('should validate a valid product payload', () => {
    const payload = {
      name: 'iPhone 15',
      description: 'Latest Apple iPhone',
      price: 999.99,
      stock: 20,
      category_id: 'cat123',
      image_url: 'http://example.com/iphone.jpg'
    };

    const { error } = productValidator.create.validate(payload);
    expect(error).toBeUndefined();
  });

  it('should fail if price is negative', () => {
    const payload = {
      name: 'Phone',
      price: -10,
      stock: 5,
      category_id: 'cat123'
    };

    const { error } = productValidator.create.validate(payload);
    expect(error).toBeDefined();
    expect(error.message).toBe('Price must be a positive number.');
  });

  it('should fail if name is too short', () => {
    const payload = {
      name: 'P',
      price: 50,
      stock: 10,
      category_id: 'cat123'
    };

    const { error } = productValidator.create.validate(payload);
    expect(error).toBeDefined();
    expect(error.message).toBe('Product name must be between 2 to 50 characters.');
  });

  it('should allow optional fields to be missing', () => {
    const payload = {
      name: 'Phone',
      price: 50,
      stock: 10,
      category_id: 'cat123'
    };

    const { error } = productValidator.create.validate(payload);
    expect(error).toBeUndefined();
  });
});
