import { useState } from "react";
import "./App.css";
import { UserProvider } from "./context/context";
import Login from "./Login";
import Home from "./Home";
import Mainpage from "./Pages/mainpage";
import Register from "./register";
import Reading from "./Pages/reading";
import Report from "./Pages/reports";
import Billing from "./Pages/billing";
import ViewReadings from "./Pages/viewreadings";
import ViewSubmitted from "./Pages/submittedreadings";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //  const [fsidval, setfsId] = useState('');
  //  console.log(fsidval);
  return (
    <BrowserRouter>
  <UserProvider>
    <div className="h-[100dvh] w-full">
      <Routes>
        <Route path="/dashboard" element={<Home />}>
          <Route index element={<Mainpage />} />
          <Route path="billing" element={<Billing />} />
          
          {/* Reading Route with nested routes inside */}
          <Route path="readings" element={<Reading />}>
            <Route path="closing-opening-readings" element={<ViewReadings />} />
            <Route path="submitted-readings" element={<ViewSubmitted />} />
          </Route>

          <Route path="reports" element={<Report />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </UserProvider>
</BrowserRouter>

  );
}

export default App;
