import './App.css';
import Menu from './Menu';
import ListInvoces from './ListInvoces';
import AddInvoce from './AddInvoce';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Menu />
      <Switch>
        <Route path="/AddInvoce" component={AddInvoce} />
        <Route path="/ListInvoces" component={ListInvoces} />
      </Switch>
    </Router>
  );
}

export default App;
