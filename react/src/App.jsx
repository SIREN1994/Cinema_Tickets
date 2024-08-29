import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

export default function App() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelPassword, setCancelPassword] = useState(''); // State to store the password

  useEffect(() => {
    axios.get('http://localhost:8000/api/seats')
      .then(response => {
        setSeats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the seat data!', error);
      });
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.seat_state === 'free') {
      setSelectedSeat(seat);
      setIsCancelling(false);
    } else {
      setSelectedSeat(seat);
      setIsCancelling(true);
    }
  };

  const handleBuyNow = () => {
    if (selectedSeat) {
      axios.post(`http://localhost:8000/api/seats/${selectedSeat.seat_id}/purchase`)
        .then(response => {
          const updatedSeats = seats.map(seat =>
            seat.seat_id === selectedSeat.seat_id ? { ...seat, seat_state: 'occupied' } : seat
          );
          setSeats(updatedSeats);
          setSelectedSeat(null);
        })
        .catch(error => {
          console.error('There was an error purchasing the seat!', error);
        });
    }
  };

  const handleCancel = () => {
    if (selectedSeat && cancelPassword === 'cancel') {
      axios.post(`http://localhost:8000/api/seats/${selectedSeat.seat_id}/cancel`, { password: cancelPassword })
        .then(response => {
          const updatedSeats = seats.map(seat =>
            seat.seat_id === selectedSeat.seat_id ? { ...seat, seat_state: 'free' } : seat
          );
          setSeats(updatedSeats);
          setSelectedSeat(null);
          setIsCancelling(false);
          setCancelPassword(''); // Clear the password input
        })
        .catch(error => {
          console.error('There was an error cancelling the seat!', error);
        });
    }
  };

  return (
    <div className="cinema-container">
      <div className="screen">Screen</div>
      <div className="seats">
        {['A', 'B', 'C', 'D'].map(row => (
          <div className="row" key={row}>
            <div className="rowname">{row}</div>
            {seats.filter(seat => seat.seat_id.startsWith(row)).map(seat => (
              <div
                key={seat.seat_id}
                className={`seat ${seat.seat_state === 'free' ? '' : 'seattaken'}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.seat_id.slice(1)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {selectedSeat && (
        <div className="seat-form">
          <h3>Seat Details</h3>
          <p>Seat Number: {selectedSeat.seat_id}</p>
          <p>Price: ${selectedSeat.seat_price}</p>
          {isCancelling ? (
            <>
              <p>This seat is currently occupied. Type in "cancel" to cancel: </p>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={cancelPassword}
                onChange={(e) => setCancelPassword(e.target.value)} 
              />
              <button onClick={handleCancel}>Cancel Seat</button> {/* Cancel button */}
            </>
          ) : (
            <>
              <p>Are you sure you want to buy this seat?</p>
              <button onClick={handleBuyNow}>Buy Now</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
