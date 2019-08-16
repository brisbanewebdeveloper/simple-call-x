import call from '../src/call-x';

describe('testSubject', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof call).toBe('function');
  });

  it('should throw when target not a function', function() {
    expect.assertions(6);
    expect(function() {
      call();
    }).toThrowErrorMatchingSnapshot();
    expect(function() {
      call(undefined);
    }).toThrowErrorMatchingSnapshot();
    expect(function() {
      call(null);
    }).toThrowErrorMatchingSnapshot();
    expect(function() {
      call(1);
    }).toThrowErrorMatchingSnapshot();
    expect(function() {
      call(true);
    }).toThrowErrorMatchingSnapshot();
    expect(function() {
      call('');
    }).toThrowErrorMatchingSnapshot();
  });

  it('context', function() {
    expect.assertions(1);
    const context = {};
    expect(
      call(function() {
        /* eslint-disable-next-line babel/no-invalid-this */
        return this;
      }, context),
    ).toBe(context);
  });

  it('args', function() {
    expect.assertions(1);
    const context = {};
    expect(
      call(
        function(a, b, c) {
          /* eslint-disable-next-line babel/no-invalid-this */
          return {context: this, a, b, c};
        },
        context,
        [1, 2, 3],
      ),
    ).toMatchSnapshot();
  });

  it('args string', function() {
    expect.assertions(1);
    const context = {};
    expect(
      call(
        function(a, b, c) {
          /* eslint-disable-next-line babel/no-invalid-this */
          return {context: this, a, b, c};
        },
        context,
        '123',
      ),
    ).toMatchSnapshot();
  });

  it('args other', function() {
    expect.assertions(1);
    const context = {};
    expect(
      call(
        function(a, b, c) {
          /* eslint-disable-next-line babel/no-invalid-this */
          return {context: this, a, b, c};
        },
        context,
        true,
      ),
    ).toMatchSnapshot();
  });
});
