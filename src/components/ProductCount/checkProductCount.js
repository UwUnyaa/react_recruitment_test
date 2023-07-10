import debounce from '../../util/debounce';

// Check if product count is valid, call handleError with error JSON if
// appropriate
const checkProductCount = debounce((pid, quantity, handleError) => {
  return fetch('/api/product/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({pid, quantity}),
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      const { isError } = json;
      
      // Since the API uses status codes properly, it would make more sense to
      // look at these with result.ok, and only using the body to display
      // error messages if appropriate, but I've implemented it here as such
      // for brevity.
      if (isError) {
        handleError(json);
      }
    });
});

export default checkProductCount;
