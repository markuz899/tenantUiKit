import { useTheme } from "styled-components";
import {
  Button,
  Modal
} from "../lib";

function App() {

  const theme = useTheme();

  return (
    <div>
      <div id="root-modal"></div>
      <div id="root-tooltip"></div>
          <Modal
            onClickOther
            title="Test modal"
            render={({ close }) => <div>Modal test</div>}
          >
            test
          </Modal>
          <Button>button</Button>
    </div>
  );
}

export default App;