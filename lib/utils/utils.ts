export const colorBasedOnBg = (backgroundColor: string) => {
  backgroundColor = backgroundColor.substring(1);
  const r = parseInt(backgroundColor.substring(0, 2), 16); // 0 ~ 255
  const g = parseInt(backgroundColor.substring(2, 4), 16);
  const b = parseInt(backgroundColor.substring(4, 6), 16);

  const srgb = [r / 255, g / 255, b / 255];
  const x = srgb.map((i) => {
    if (i <= 0.04045) {
      return i / 12.92;
    } else {
      return Math.pow((i + 0.055) / 1.055, 2.4);
    }
  });

  const L = 0.2126 * x[0] + 0.7152 * x[1] + 0.0722 * x[2];
  return L > 0.179 ? "#000" : "#fff";
};

export const percentageOff = (price: any, percentageValue: any) => {
  return price * (1 - percentageValue / 100);
};

export const formatEur = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export function get2D(num: number) {
  if (num.toString().length < 2) return `0${num}`;
  return num.toString();
}

export const formatDate = (
  date: any,
  withMonthName: boolean = false,
  withTime: boolean = false,
) => {
  const d = new Date(date);
  if (!Number.isNaN(d.getTime())) {
    const day = get2D(d.getDate());
    const month = withMonthName
      ? monthNames[d.getMonth()]
      : get2D(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = d.getHours();
    let minutes: any = d.getMinutes();

    let date = withMonthName
      ? `${day} ${month} ${year}`
      : `${day}/${month}/${year}`;

    if (withTime) {
      if (minutes == 0) {
        minutes = `00`;
      }
      date += ` ${hours}:${minutes}`;
    }
    return date;
  }
  return "";
};

export function currentFormatDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}

export function formatElapsedTime(startDate: string) {
  const now: any = new Date();
  const start: any = new Date(startDate);
  const diffInMilliseconds = now - start;

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );

  let formattedElapsedTime = "";

  if (days > 0) {
    formattedElapsedTime += `${days}d `;
  }

  if (hours > 0 || (days === 0 && hours === 0)) {
    formattedElapsedTime += `${hours}h `;
  }

  formattedElapsedTime += `${minutes}m`;

  return formattedElapsedTime;
}

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function isValidDate(dateString: string) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) {
    throw new Error("Formato data non valido. Utilizzare MM/GG/AAAA");
  }

  const parts = dateString.split("/");
  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[0], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    throw new Error("Data non valida.");
  }

  return date;
}

export function calculateDateDifference(futureDate: any) {
  const futureDateObj: any = new Date(futureDate);
  const currentDate: any = new Date();
  const timeDifferenceInMilliseconds = currentDate - futureDateObj;

  const months = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30),
  );
  const days = Math.floor(
    (timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)) % 30,
  );
  const hours = Math.floor(
    (timeDifferenceInMilliseconds / (1000 * 60 * 60)) % 24,
  );
  const minutes = Math.floor((timeDifferenceInMilliseconds / (1000 * 60)) % 60);

  // Build the resulting string
  let result = "";

  if (months > 0) {
    result += months + "m ";
  }

  if (days > 0) {
    result += days + "d ";
  }

  if (hours > 0) {
    result += hours + "h ";
  }

  if (minutes > 0) {
    result += minutes + "m";
  }

  // Remove trailing space if present
  result = result.trim();

  return result;
}

export const parseDateString = (dateString: string): any => {
  if (typeof dateString == "string") {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${month}/${day}/${year}`);
    if (year?.length > 4) {
      return false;
    }
    return isNaN(date.getTime()) ? null : date;
  }
};

export const getFirstLetter = (str: string) => {
  if (str && str.length > 0) {
    return str[0];
  } else {
    return "";
  }
};
