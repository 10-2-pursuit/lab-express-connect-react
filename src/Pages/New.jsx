import NewLogForm from "../components/NewLogForm";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const h2Style = {
  textDecoration: 'underline',
};

function Edit() {
  return (
    <div className="New Log" style={containerStyle}>
      <h2 style={h2Style}>New</h2>
      <NewLogForm />
    </div>
  );
}

export default Edit;
