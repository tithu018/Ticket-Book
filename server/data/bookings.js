import movies from "./movies.js";

const bookings = [
  {
    _id: "68396334fb83252d82e17295",
    user: { name: "GreatStack" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: movies[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59,
    },
    amount: 98,
    bookedSeats: ["D1", "D2"],
    isPaid: false,
  },
  {
    _id: "68396334fb83252d82e17296",
    user: { name: "GreatStack" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: movies[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59,
    },
    amount: 49,
    bookedSeats: ["A1"],
    isPaid: true,
  },
  {
    _id: "68396334fb83252d82e17297",
    user: { name: "GreatStack" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: movies[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59,
    },
    amount: 147,
    bookedSeats: ["A1", "A2", "A3"],
    isPaid: true,
  },
];

export default bookings;
