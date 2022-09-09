import { useRef } from "react";
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInput = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const enteredEmailInput = emailInput.current.value;
    console.log("entered email",enteredEmailInput);
    fetch('/api/newsletter',{
      method: 'POST',
      body: JSON.stringify({email: enteredEmailInput }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data));
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
