function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default Input;