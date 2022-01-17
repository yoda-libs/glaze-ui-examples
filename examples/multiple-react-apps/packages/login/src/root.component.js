import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';

const Root = props => {
  const { glaze, name } = props;
  useEffect(() => {
    // subscribe to messages from glaze framework
    var sub = glaze.subscribe(msg => {
      console.log(`[${name} recv]`, msg);
    });
    console.log(`[${name}] subscribed to glaze`);

    return function unsubscribe() {
        // unsubscribe when not needed anymore
        sub.unsubscribe();
        console.log(`[${name}] unsubscribed from glaze`);
    }

  });
  return (
    <form>

        <h3>Log in</h3>
        <h4>Use any user/pass combination</h4>

        <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <div className="form-group">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block wide" onClick={() => glaze.router.navigate('/auth', {token: 12345})}>Sign in</button>
    </form>
  );
}


export default Root;