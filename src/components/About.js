import React from "react";

class About extends React.Component {
  render() {
    return (
      <div className="about-card-container">
        <div className="about-card">
          <div className="about-card-content">
            <h1>About</h1>
            <p>Hello, thank you so much for coming by!</p>
            <p>
              You are probably wondering why we came up with this app Doggy,
              don’t you?
            </p>
            <p>
              Have you ever felt lonely and have no one to socialize with? We
              guarantee you that we all have felt that during the shutdowns
              under the pandemic. Some of us have been lucky to have a cute
              friend that said “woof” translated as “it is okey my friend, you
              can get through this!” As of today, the shutdown is over, we have
              shaken hands, given each other a warm hug and have the pleasure of
              being social again. This is great news for us, but during the
              pandemic some dogs have developed a form of separation anxiety,
              with this app Doggy we want to help our beloved friends as they
              have always helped us with bringing joy and love. Let your dog
              meet other single dogs!{" "}
              <span role="img" aria-label="dog">
                🐕
              </span>
            </p>
            <p>
              From Dream Team <br></br> - Anders, Cathrin, Amanda and Ahmed!
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
