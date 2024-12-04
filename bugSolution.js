The solution involves using `AbortController` to allow cancellation of the fetch request if the component unmounts before the response is received:

```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
      console.log('Cleanup function executed');
    };
  }, []);

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
};

export default MyComponent;
```

By using `AbortController`, we can cleanly abort the fetch request if the component unmounts, preventing potential issues and ensuring proper cleanup.