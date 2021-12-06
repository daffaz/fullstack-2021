const Notification = ({ message }) => {
  // const notifStyle = {};
  return (
    <div
      style={{
        backgroundColor: 'greenyellow',
        border: '2px green solid',
        fontSize: '1.3em',
        marginBottom: 30,
        transition: 'all 0.3s ease-in',
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
