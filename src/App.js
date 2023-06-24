import "./scss/main.css";
import MainScreen from "./components/MainScreen/MainScreen";
import Game from "./components/Game/Game";
import Preparation from "./components/Preparation/Preparation";
import { useSelector } from "react-redux";

function App() {
  const prepaire = useSelector((state) => state.toolkit.Prepair);
  return (
    <div className="App">
      <div className="wrapper">
        <div className="quizeBord">
          {prepaire === 0 && <MainScreen />}
          {prepaire === 1 && <Preparation />}
          {prepaire === 2 && <Game />}
        </div>
      </div>
    </div>
  );
}

export default App;
