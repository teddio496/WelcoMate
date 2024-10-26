import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Snackbar } from '@mui/material';

const AdminPage = () => {
  const [guests, setGuests] = useState([]);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const adminAccessToken = document.cookie.split("; ").find(cookie => cookie.startsWith("adminAccessToken=")).split("=")[1];
        console.log(adminAccessToken);
        const response = await fetch("/api/admin/get-all-guests", {
          method: "GET",
          headers: {
            authorization: `Bearer ${adminAccessToken}`,
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch guests");
        }

        const data = await response.json();
        console.log("ALL GUESTS: ", data);
        setGuests(data.allGuests);
      } catch (error) {
        console.error(error);
        // router.push("/"); // go back to admin login
      }
    };

    const getUsernameFromCookie = () => {
      try {
        const adminAccessToken = document.cookie.split("; ").find(cookie => cookie.startsWith("adminAccessToken=")).split("=")[1];
        // Decode the JWT to get the username (you may want to implement this function)
        const payload = JSON.parse(atob(adminAccessToken.split('.')[1]));
        setUsername(payload.username);
      }
      catch (e) {
        console.log("no admin access token exists", e);
      }
    };

    fetchGuests();
    getUsernameFromCookie();
  }, []);

  const handleLogout = async () => {
    const response = await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Logout failed");
    }
  };

  const handleCreateLogin = async (guest) => {
    try {
      const createLoginResponse = await fetch(`/api/admin/create-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: guest.email,
          checkinDate: guest.checkinDate.split("T")[0], // remove the T- part from Date type
          roomNumber: guest.roomNumber,
        }),
      });

      if (!createLoginResponse.ok) {
        throw new Error("Failed to create login for guest");
      }

      const { link } = await createLoginResponse.json();
      console.log("link to login to account with name " + guest.fullname +": " + link);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-xl">Admin: {username}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Sign Out
        </button>
      </header>
      <main className="flex-grow p-4">
        <h2 className="text-2xl mb-4">List of Guests</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Room Number</th>
              <th className="border border-gray-300 p-2">Check-in Date</th>
              <th className="border border-gray-300 p-2">Check-out Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td className="border border-gray-300 p-2">{guest.fullname}</td>
                <td className="border border-gray-300 p-2">{guest.email}</td>
                <td className="border border-gray-300 p-2">{guest.roomNumber}</td>
                <td className="border border-gray-300 p-2">{new Date(guest.checkinDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{new Date(guest.checkoutDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleCreateLogin(guest)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Login
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Snackbar
        open={open}
        autoHideDuration={1500} // Auto close after 3 seconds
        onClose={handleClose}
        message={"Successfully created hotel guest."}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Positioning
      />
    </div>
  );
};

export default AdminPage;
