import { Button, Radio } from "../lib";

function App() {
  return (
    <div>
      <Button>Button</Button>
      <Radio
        inline
        name="radio"
        onChange={(d) => console.log(d)}
        options={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
        ]}
      />
    </div>
  );
}

export default App;
