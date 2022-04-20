import { useEffect } from "react";

const Notification = ({ message, setMessage, type }) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage({ message: null, type: null }), 5000);
    }
  }, [message, setMessage]);

  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
