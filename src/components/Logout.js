import React from 'react';

class Logout extends React.Component {
  async componentDidMount() {
    const { history } = this.props;

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    localStorage.removeItem('doggytoken');
    this.props.onLoginChange();
    history.replace('/');
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

export default Logout;