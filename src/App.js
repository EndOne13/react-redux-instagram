import {Provider} from "react-redux";
import {store} from "./redux/store";
import RoutesComponent from "./components/RoutesComponents/RoutesComponent";

const App = () => {
    return (
        <Provider store={store}>
            <RoutesComponent />
        </Provider>
    )
}

export default App;