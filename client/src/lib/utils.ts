import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: any, chars = 4) {
  // Vérifie si l'adresse est valide
  if (!address) return "";
  const start = address.substring(0, chars + 2);
  const end = address.substring(address.length - chars);
  return `${start}...${end}`;
}

export function formatDateTime(dateTimeString: any) {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
}
