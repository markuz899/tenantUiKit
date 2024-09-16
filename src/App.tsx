import { useTheme } from "styled-components";
import {
  Accordion,
  Badge,
  Banner,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Loader,
  Modal,
  Popover,
  QuantitySelect,
  Radio,
  RadioButton,
  RangeSlider,
  Rating,
  Select,
  SliderTabs,
  Textarea,
  Toggle,
  Tooltip,
  WordChanger,
} from "../lib";
import styled from "styled-components";
import theme from "../theme";
import icons from "../lib/components/Icon/icons";
import { useState } from "react";
import { Content } from "../theme/styled";

function App() {
  const theme = useTheme();

  let allIcon = Object.keys(icons);
  const [loaderActive, setLoaderActive] = useState<any>(false);
  const [loaderType, setLoaderType] = useState<any>("spin");
  const words = ["testo", "forma", "colore"];

  const renderTarget = ({ show, close, visible }: any) => {
    const handleShow = () => {
      if (visible) return close();
      if (!visible) return show();
    };
    return (
      <Button kind={visible ? "primary" : "action"} onClick={handleShow}>
        Action
      </Button>
    );
  };

  const renderDropdown = () => {
    // const handleShow = () => {
    //   if (visible) return close();
    //   if (!visible) return show();
    // };
    return (
      <RenderDrop>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
        <p style={{ color: "#000" }}>Lorem ipsum</p>
      </RenderDrop>
    );
  };

  return (
    <Content>
      <div id="root-modal"></div>
      <div id="root-tooltip"></div>

      <Section title="Changed">
        <WordChanger options={words} label="Componente cambia" />
      </Section>
      <Section title="Accordion">
        <Accordion
          multipleOpen={false}
          inline={false}
          options={[
            {
              question: "Lorem Ipsum is simply dummy text?",
              answer:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
            },
            {
              question: "Lorem Ipsum is simply dummy text?",
              answer:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
            },
          ]}
        />
      </Section>
      <Section title="Badge">
        <Badge
          label={"Badge no close"}
          iconClose={false}
          kind="ghost"
          onClick={() => {}}
        />
        <Badge
          label={"Badge standard"}
          kind="ghost"
          onClick={() => alert("Close click")}
        />
        <Badge
          label={"Badge success"}
          kind="success"
          onClick={() => alert("Close click")}
        />
        <Badge
          label={"Badge warning"}
          kind="warning"
          onClick={() => alert("Close click")}
        />
        <Badge label={"Badge error"} kind="error" onClick={() => alert("Close click")} />
        <Badge label={"Badge info"} kind="info" onClick={() => alert("Close click")} />
      </Section>
      <Section title="Banner">
        <Banner active={true} kind={"info"} title={"Info banner"} />
        <Banner active={true} kind={"success"} title={"Success banner"} />
        <Banner active={true} kind={"warning"} title={"Warning banner"} />
        <Banner active={true} kind={"error"} title={"Error banner"} />
      </Section>
      <Section title="Buttons">
        <div className="flex flex-col gap-3">
          <div className="text-left">
            <Button round className="mr-3" size="sm" kind="primary">
              SM round
            </Button>
            <Button className="mr-3" size="sm" kind="primary">
              SM
            </Button>
            <Button className="mr-3" kind="primary">
              Default
            </Button>
            <Button className="mr-3" size="lg" kind="primary">
              LG
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button kind="primary" icon="search" label="Default" />
            <Button kind="primary">Default</Button>
            <Button kind="success">Success</Button>
            <Button kind="error">Error</Button>
            <Button kind="warning">Warning</Button>
            <Button kind="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button kind="inverse-primary" icon="search" label="Default" />
            <Button kind="inverse-primary">Inverse</Button>
            <Button kind="inverse-success">Success</Button>
            <Button kind="inverse-error">Error</Button>
            <Button kind="inverse-warning">Warning</Button>
            <Button kind="inverse-primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button kind="minimal">Minimal</Button>
            <Button kind="minimal-success">Success</Button>
            <Button kind="minimal-error">Error</Button>
            <Button kind="minimal-warning">Warning</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button kind="ghost">Ghost</Button>
            <Button kind="action">Action</Button>
          </div>
        </div>
      </Section>
      <Section title="Icon">
        <div className="flex gap-5 flex-wrap icon-wrap">
          {allIcon.map((el) => (
            <Tooltip key={el} content={el}>
              <Icon name={el} size={theme.spaces.space5} color={theme.colors.primary} />
            </Tooltip>
          ))}
        </div>
      </Section>
      <Section title="Input">
        <Input
          type="search"
          className="mb-6"
          placeholder="Tipologia possesso"
          name="name"
        />
        <Input className="mb-6" icon="search" placeholder="Input example" name="name" />
        <Input
          className="mb-6"
          iconBefore="search"
          defaultValue="Ciccio"
          topPlaceholder="Ricerca"
          placeholder="Input example"
          name="name"
        />
        <Input
          className="mb-6"
          placeholder="Input example"
          name="name"
          isError={true}
          message="Field error"
        />
        <Input className="mb-6" placeholder="Input example" name="name" />
        <Input
          className="mb-6"
          topPlaceholder="Address"
          placeholder="Input example"
          name="name"
        />
      </Section>
      <Section title="New Datepicker">
        <DatePicker
          className="mt-6"
          onChange={(d: any) => console.log("new picker", d)}
        />
        <DatePicker
          className="mt-6"
          mode="multiple"
          onChange={(d: any) => console.log("new picker", d)}
        />
        <DatePicker
          className="mt-6"
          mode="range"
          onChange={(d: any) => console.log("new picker", d)}
        />
      </Section>
      <Section title="Modal">
        <Modal
          onClickOther
          title="Test modal"
          render={() => <div style={{ color: theme.colors.dark }}>Modal test</div>}
        >
          <Icon name="grid" size="45" color={theme.colors.primary} />
        </Modal>
      </Section>
      <Section title="Checkbox">
        <Checkbox label="Test label checkbox" />
      </Section>
      <Section title="Checkbox button">
        <Checkbox className="mr-3" buttonMode label="Test 1" />
        <Checkbox className="mr-3" buttonMode label="Test 2" />
        <Checkbox buttonMode label="Test 3" />
      </Section>
      <Section title="Radio">
        <Radio
          name={""}
          inline
          options={[
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 },
          ]}
          onChange={() => {}}
        />
      </Section>
      <Section title="Radio button">
        <RadioButton
          name={""}
          inline
          options={[
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 },
          ]}
          onChange={(d) => {
            console.log(d);
          }}
        />
        <RadioButton
          name={""}
          inline
          disabled
          options={[
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 },
          ]}
          onChange={(d) => {
            console.log(d);
          }}
        />
      </Section>
      <Section title="Radio slider">
        <SliderTabs
          onChange={(data: any) => console.log(data)}
          options={[
            { label: "Cloud", value: 3, icon: "cloud" },
            {
              label: "moon",
              value: 4,
              icon: "moon",
              iconColor: theme.colors.warning,
            },
            {
              label: "Sun",
              value: 5,
              icon: "sun",
              iconColor: theme.colors.warning,
            },
          ]}
        />
      </Section>
      <Section title="Textarea">
        <Textarea
          maxLength={300}
          placeholder="Testo di test"
          topPlaceholder="Note"
        ></Textarea>
      </Section>
      <Section title="Tooltip">
        <Tooltip content="Lorem ipsum">TOOLTIP</Tooltip>
      </Section>
      <Section title="Popover">
        <Popover
          renderTarget={({ visible }: any) => {
            return <Button kind={visible ? "primary" : "action"}>Action</Button>;
          }}
          renderContent={({ close }: any) => {
            return (
              <div>
                <div className="flex mb-2">Sicuro di voler accettare?</div>
                <div className="flex align-middle justify-center gap-2">
                  <Button size="sm" kind="error" onClick={close}>
                    NO
                  </Button>
                  <Button size="sm">SI</Button>
                </div>
              </div>
            );
          }}
        />
      </Section>
      <Section title="Toogle">
        <Toggle name="theme" />
      </Section>
      <Section title="Dropdown">
        <Dropdown
          fullWidth={false}
          includeTarget={true}
          showArrow={false}
          renderTarget={renderTarget}
          renderDropdown={renderDropdown}
        />
      </Section>
      <Section title="Select">
        <Select
          name="city"
          onChange={() => {}}
          iconBefore="search"
          topPlaceholder="Seleziona città"
          placeholder="Città"
          options={[
            { label: "Roma", value: "1" },
            { label: "Ancona", value: "2" },
            { label: "Milano", value: "3" },
            { label: "Napoli", value: "4" },
            { label: "Torino", value: "5" },
            { label: "Firenze", value: "6" },
            { label: "Bologna", value: "7" },
            { label: "Venezia", value: "8" },
            { label: "Palermo", value: "9" },
            { label: "Cagliari", value: "10" },
          ]}
        />
        <Select
          name="city"
          onChange={() => {}}
          iconBefore="search"
          placeholder="Città"
          defaultValues={"1"}
          options={[
            { label: "Roma", value: "1" },
            { label: "Ancona", value: "2" },
            { label: "Milano", value: "3" },
            { label: "Napoli", value: "4" },
            { label: "Torino", value: "5" },
            { label: "Firenze", value: "6" },
            { label: "Bologna", value: "7" },
            { label: "Venezia", value: "8" },
            { label: "Palermo", value: "9" },
            { label: "Cagliari", value: "10" },
          ]}
        />
      </Section>
      <Section title="Select - multiselect">
        <Select
          name="city"
          multiselect
          onChange={() => {}}
          topPlaceholder="Seleziona città"
          placeholder="Città"
          options={[
            { label: "Roma", value: "1" },
            { label: "Ancona", value: "2" },
            { label: "Milano", value: "3" },
            { label: "Napoli", value: "4" },
            { label: "Torino", value: "5" },
            { label: "Firenze", value: "6" },
            { label: "Bologna", value: "7" },
            { label: "Venezia", value: "8" },
            { label: "Palermo", value: "9" },
            { label: "Cagliari", value: "10" },
          ]}
        />
        <Select
          name="city"
          multiselect
          onChange={() => {}}
          placeholder="Città"
          defaultValues={["2"]}
          options={[
            { label: "Roma", value: "1" },
            { label: "Ancona", value: "2" },
            { label: "Milano", value: "3" },
            { label: "Napoli", value: "4" },
            { label: "Torino", value: "5" },
            { label: "Firenze", value: "6" },
            { label: "Bologna", value: "7" },
            { label: "Venezia", value: "8" },
            { label: "Palermo", value: "9" },
            { label: "Cagliari", value: "10" },
          ]}
        />
      </Section>
      <Section title="Rating">
        <Rating onChange={(data: number) => alert(`Select: ${data} star`)} />
      </Section>
      <Section title="Quantity select">
        <QuantitySelect value={5} />
      </Section>
      <Section title="Range slider">
        <RangeSlider min={1} max={100} />
      </Section>
      <Section title="Loader">
        <Checkbox
          label="Attivare loader"
          checked={loaderActive}
          onChange={() => {
            setLoaderActive(!loaderActive);
          }}
        />
        {loaderActive && (
          <SliderTabs
            className="mb-5"
            onChange={(data: any) => setLoaderType(data.value)}
            options={[
              { label: "Default", value: "spin", checked: true },
              {
                label: "Glue",
                value: "glue",
              },
              {
                label: "Three point",
                value: "three",
              },
              {
                label: "Pin",
                value: "pin",
              },
              {
                label: "Qubik",
                value: "qubik",
              },
            ]}
          />
        )}
        <Loader isActive={loaderActive} type={loaderType} debug />
      </Section>
    </Content>
  );
}

export default App;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Compose>
      <hr />
      <h2>{title}</h2>
      {children}
    </Compose>
  );
};

const Compose = styled.div`
  margin: ${theme.spaces.space4} 0;
  .icon-wrap {
    svg {
      &:hover {
        transition: all 0.5s;
        transform: scale(2);
      }
    }
  }
`;

const RenderDrop = styled.div`
  padding: ${theme.spaces.space4};
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${theme.extra.radiusBig};
  background: ${theme.colors.white};
  p {
    margin-bottom: ${theme.spaces.space2};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
