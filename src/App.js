import "./App.css";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();

  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to google  provider with supabse");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
  }

  return (
    <div className="App">
      <div
        className="container mt-5 p-4 border rounded shadow"
        style={{ maxWidth: "400px" }}
      >
        {session ? (
          <>
            <h4 className="text-center mb-4">
              Hey there, {session.user.email}
            </h4>
            <div className="mb-3">
              <label className="form-label">Start of your event</label>
              <DateTimePicker
                onChange={setStart}
                value={start}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">End of your event</label>
              <DateTimePicker
                onChange={setEnd}
                value={end}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event name"
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Event description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event description"
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            <hr />
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => createCalendarEvent()}
            >
              Create Calendar Event
            </button>
            <button
              className="btn btn-outline-danger w-100"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className="btn btn-success w-100"
            onClick={() => googleSignIn()}
          >
            Sign In With Google
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
