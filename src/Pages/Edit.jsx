import UpdateLogForm from "../components/UpdateLogForm";

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
    <div className="New Edit" style={containerStyle}>
      <h2 style={h2Style}>Edit</h2>
      <UpdateLogForm />
    </div>
  );
}

export default Edit;
