import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {Toaster} from 'react-hot-toast'
import Footer from "./components/Footer";
import Layout from "./pages/admin/Layout";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBooking from "./pages/admin/ListBooking";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/movies/:id' element={<MovieDetails/>} />
          <Route path='/movies/:id/:date' element={<SeatLayout/>} />
          <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/favorite' element={<Favorite/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />

          <Route path='/admin/*' element={<Layout/>} >
            <Route index element={ <Dashboard/>} />
            <Route path='list-shows' element={<ListShows/>} />
            <Route path='list-bookings' element={<ListBooking/>} />
            <Route path='add-shows' element={<AddShows/>} />

          </Route>
      </Routes>
      {!isAdminRoute && <Footer />}

    </>
  )
}

export default App;
