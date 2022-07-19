import React from "react";
import { nanoid } from "nanoid";

export const jenis = [
  {
    id: nanoid(20),
    jenis: "Makan",
    subjenis: ["Pagi", "Siang", "Sore"],
  },
  {
    id: nanoid(20),
    jenis: "Transport",
    subjenis: ["Bensin", "eToll", "Parkir"],
  },
  {
    id: nanoid(20),
    jenis: "Supplies",
    subjenis: ["Paket Data", "Token Listrik", "ATK"],
  },
];

export const subJenis = [
  {
    id: nanoid(20),
    item: "Pagi",
  },
  {
    id: nanoid(20),
    item: "Siang",
  },
  {
    id: nanoid(20),
    item: "Sore",
  },
  {
    id: nanoid(20),

    item: "Bensin",
  },
  {
    id: nanoid(20),

    item: "eToll",
  },
  {
    id: nanoid(20),

    item: "Parkir",
  },
  {
    id: nanoid(20),

    item: "Paket Data",
  },
  {
    id: nanoid(20),

    item: "Token Listrik",
  },
  {
    id: nanoid(20),

    item: "ATK",
  },
];
