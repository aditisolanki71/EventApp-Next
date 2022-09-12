import { useRef, useContext } from "react";
import classes from './newsletter-registration.module.css';
import NotificationContext from "../../store/notification-context"
function NewsletterRegistration() {
  const emailInput = useRef();
  const notificaionCtx = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmailInput = emailInput.current.value;

    notificaionCtx.showNotification({
      title: "signing up...",
      message: "Registering for newsletter.",
      status: "pending"
    });

    console.log("entered email",enteredEmailInput);
    fetch('/api/newsletter',{
      method: 'POST',
      body: JSON.stringify({email: enteredEmailInput }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return res.json().then((data) => {
        throw new Error(data.message || 'something went wrong !!!');
      });
    })
    .then(data => {
      notificaionCtx.showNotification({
        title: "Success...",
        message: "Successfully registered for newsletter",
        status: "success"
      })
      console.log(data)
    })
    .catch(error => {
      notificaionCtx.showNotification({
        title: "Error...",
        message: error.message || " something went wrong!!!",
        status: "error"
      })
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailInput}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
