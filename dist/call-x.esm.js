import bind from 'simple-bind-x';
import isPrimitive from 'is-primitive-x';
import splitIfBoxedBug from 'split-if-boxed-bug-x';
var $TypeError = TypeError;
var nativeApply = bind.apply,
    nativeCall = bind.call;
var $apply = bind(nativeCall, nativeApply);
var toStringTag = bind(nativeApply, {}.toString);
var ERROR_MESSAGE = ' is not a function';
var funcType = '[object Function]';

var assertIsFunction = function assertIsFunction(value) {
  if (typeof value !== 'function' && toStringTag(value) !== funcType) {
    throw new $TypeError(value + ERROR_MESSAGE);
  }

  return value;
};

var pushAll = function pushAll(arrayLike) {
  var target = [];

  if (typeof arrayLike !== 'string' && isPrimitive(arrayLike)) {
    return target;
  }

  var iterable = splitIfBoxedBug(arrayLike);
  var len = iterable.length;

  for (var i = 0; i < len; i += 1) {
    target[target.length] = iterable[i];
  }

  return target;
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The abstract operation Call is used to call the [[Call]] internal method of a function object.
 *
 * @function call
 * @param {Function} F - The target function.
 * @param {*} [V] - The context.
 * @param {Array} [args] - Argument to call the function with.
 * @throws {TypeError} If target is not a function.
 * @returns {*} The the result of invoking the function.
 * @see https://www.ecma-international.org/ecma-262/6.0/#sec-call
 */
// eslint-enable jsdoc/check-param-names


var call = function call(F, V) {
  /* eslint-disable-next-line prefer-rest-params */
  return $apply(assertIsFunction(F), V, pushAll(arguments[2]));
};

export default call;

//# sourceMappingURL=call-x.esm.js.map