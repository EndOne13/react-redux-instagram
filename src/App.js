import {Provider} from "react-redux";
import {store} from "./redux/store";
import RoutesComponent from "./components/RoutesComponents/RoutesComponent";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Provider store={store}>
            <RoutesComponent />
            <ToastContainer position='top-center' />
        </Provider>
    )
}

export default App;