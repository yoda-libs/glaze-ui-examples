import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

const Root = props => {
  const { glaze, name } = props;

  const [count, setCount] = useState(0);
  useEffect(() => {
    // subscribe to messages from glaze framework
    var sub = glaze.subscribe(msg => {
      console.log(`[${name} recv]`, msg);
      if (msg.app === 'todo')
        setCount(msg.todos.length);
    });
    console.log(`[${name}] subscribed to glaze`);

    return function unsubscribe() {
        // unsubscribe when not needed anymore
        sub.unsubscribe();
        console.log(`[${name}] unsubscribed from glaze`);
    }

  });
  return (
    <Container>
      <h1>Glaze UI React Example</h1>
      <h3>({count}) Todos</h3>
    </Container>
  );
}


export default Root;