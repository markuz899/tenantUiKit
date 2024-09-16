import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styled from "styled-components";
import { it } from "date-fns/locale";
import Dropdown from "../Dropdown";
import Input from "../Input";
import { format, parse, isValid, setHours, setMinutes } from "date-fns";
import Button from "../Button";
import { DatePickerProps } from "./interface";

const FORMAT_DATA = "dd/MM/yyyy";

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  disabled,
  mode = "single",
  excludeDisabled = true,
  min,
  max,
  readOnly = false,
  name = "datepicker",
  onChange,
  excludeDates,
  hidden,
  startMonth,
  endMonth,
  placeholder = "GG/MM/AAAA",
  topPlaceholder,
}) => {
  const [onlyRead, setOnlyRead] = useState(readOnly);
  const [selected, setSelected] = useState<Date>();
  const [multiSelected, setMultiSelected] = useState<any>([]);
  const [rangeSelected, setRangeSelected] = useState<any>();
  const [inputValue, setInputValue] = useState<any>("");
  const [month, setMonth] = useState<any>();
  const [timeValue, setTimeValue] = useState<string>();
  const timeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode == "multiple" || mode == "range") {
      setOnlyRead(true);
    }
  }, []);

  // range handler
  const handleRangeSelection = useCallback((date: { from: Date; to?: Date }) => {
    setRangeSelected(date);
    if (!date) {
      setInputValue(null);
      onChange && onChange({ name, value: null });
      return;
    }
    onChange &&
      onChange({
        name,
        value: {
          start: date.from ? format(date.from, FORMAT_DATA) : null,
          end: date.to ? format(date.to, FORMAT_DATA) : null,
        },
      });
  }, []);

  // multiple handler
  const handleMultiSelection = useCallback((date: Date[]) => {
    setMultiSelected(date);
    if (!date.length) {
      setInputValue(null);
    }
    if (onChange) {
      onChange({
        name,
        value: date.map((el: Date) => format(el, FORMAT_DATA)),
      });
    }
  }, []);

  // single handler
  // const handleDayPickerSelection = useCallback((date: Date, close?: any) => {
  //   if (!date) {
  //     setSelected(undefined);
  //     setInputValue(null);
  //   } else {
  //     setSelected(date);
  //     setMonth(date);
  //     setInputValue(format(date, FORMAT_DATA));
  //   }
  //   close && close();
  // }, []);

  const handleDayPickerSelection = (date: Date, close?: any) => {
    const time = timeRef?.current?.defaultValue;
    if (!date) {
      setSelected(date);
      setInputValue(null);
      onChange && onChange({ name, value: null });
      return;
    }
    if (!time) {
      setSelected(date);
      setInputValue(format(date, FORMAT_DATA));
      onChange && onChange({ name, value: format(date, FORMAT_DATA) });
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(date, minutes), hours);

    setSelected(newSelectedDate);
    setMonth(newSelectedDate);
    setInputValue(format(newSelectedDate, FORMAT_DATA));
    onChange &&
      onChange({
        name,
        value: format(newSelectedDate, `${FORMAT_DATA} HH:mm`),
      });
    close && close();
  };

  // input handler only single mode
  const handleInputChange = useCallback((data: any) => {
    const { value } = data;
    setInputValue(value);

    if (value) {
      const parsedDate = parse(value, FORMAT_DATA, new Date());
      if (isValid(parsedDate)) {
        setSelected(parsedDate);
        setMonth(parsedDate);
        onChange && onChange({ name, value });
      }
    } else {
      setSelected(undefined);
      onChange && onChange({ name, value: null });
    }
  }, []);

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setInputValue(format(newSelectedDate, FORMAT_DATA));
    setTimeValue(time);
    onChange &&
      onChange({
        name,
        value: format(newSelectedDate, `${FORMAT_DATA} HH:mm`),
      });
  };

  // traffic gateway
  const handling = useCallback(
    (date: any, close?: () => void) => {
      switch (mode) {
        case "single":
          handleDayPickerSelection(date, close);
          break;
        case "multiple":
          handleMultiSelection(date);
          break;
        case "range":
          handleRangeSelection(date);
          break;
        default:
          break;
      }
    },
    [mode],
  );

  const renderLabel = useMemo(() => {
    if (mode === "range" && rangeSelected?.from) {
      return `${format(rangeSelected.from, FORMAT_DATA)} - ${
        rangeSelected.to ? format(rangeSelected.to, FORMAT_DATA) : ""
      }`;
    }
    if (mode === "multiple" && multiSelected.length) {
      return multiSelected.length > 1
        ? `${format(multiSelected[0], FORMAT_DATA)} +${multiSelected.length - 1}`
        : format(multiSelected[0], FORMAT_DATA);
    }
    return inputValue;
  }, [mode, selected, rangeSelected, multiSelected, inputValue]);

  const RenderFooter = () => {
    const handleClick = () => {
      handleDayPickerSelection(new Date(), null);
    };
    return (
      <Button size="sm" onClick={handleClick}>
        Oggi
      </Button>
    );
  };

  const renderTarget = ({ show }: { show: () => void; close?: () => void }) => (
    <Target className={className} onClick={show}>
      <Input
        clearable
        readOnly={onlyRead}
        type="text"
        autoComplete="off"
        icon={"calendar"}
        disabled={disabled}
        placeholder={placeholder}
        topPlaceholder={topPlaceholder}
        defaultValue={renderLabel}
        onChange={handleInputChange}
      />
    </Target>
  );

  const renderDropdown = useCallback(
    ({ close }: { close: () => void }) => (
      <ContentPicker>
        {mode === "single" && (
          <label>
            Orario:{" "}
            <input
              ref={timeRef}
              type="time"
              defaultValue={timeValue}
              onChange={handleTimeChange}
            />
          </label>
        )}
        <PickerStyle
          locale={it}
          mode={mode}
          disabled={excludeDates}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          excludeDisabled={excludeDisabled}
          min={min}
          max={max}
          hidden={hidden}
          startMonth={startMonth}
          endMonth={endMonth}
          onSelect={(date: any) => handling(date, close)}
          selected={
            mode === "single"
              ? selected
              : mode === "multiple"
                ? multiSelected
                : rangeSelected
          }
          footer={mode === "single" && <RenderFooter />}
        />
      </ContentPicker>
    ),
    [
      mode,
      disabled,
      selected,
      multiSelected,
      rangeSelected,
      timeValue,
      excludeDisabled,
      min,
      max,
    ],
  );

  return (
    <>
      <Dropdown
        renderTarget={renderTarget}
        renderDropdown={renderDropdown}
        showArrow={false}
        includeTarget
        leftPosition={0}
      />
    </>
  );
};

export default DatePicker;

const Target = styled.div`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
`;

const ContentPicker = styled.div`
  padding: ${({ theme }) => theme.spaces.space2};
`;

const PickerStyle = styled(DayPicker)`
  .rdp-range_middle.rdp-selected {
    background-color: ${({ theme }) => theme.colors.primaryLight}40;
  }
  .rdp-range_start.rdp-selected {
    background: ${`linear-gradient(90deg, transparent 50%, ${({ theme }: any) => theme.colors.primaryLight}40 50%)`};
  }
  .rdp-range_end.rdp-selected {
    background: ${`linear-gradient(90deg, ${({ theme }: any) => theme.colors.primaryLight}40 50%, transparent 50%)`};
  }
  .rdp-range_start.rdp-selected,
  .rdp-range_end.rdp-selected {
    button {
      border-color: ${({ theme }) => theme.colors.primaryLight};
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .rdp-selected {
    button {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .rdp-today {
    color: ${({ theme }) => theme.colors.primary};
  }
  .rdp-caption_label {
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  .rdp-nav {
    button {
      svg {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
