import InputField from "./InputField";

function PhoneField({ value, onChange, ...rest }) {
  const handlePhoneChange = (e) => {
    const val = e.target.value;

    if (/^\d*$/.test(val) && val.length <= 10) {
      onChange(e);
    }
  };

  return (
    <InputField
      label="Phone"
      value={value}
      onChange={handlePhoneChange}
      inputProps={{ maxLength: 10 }}
      {...rest}
    />
  );
}

export default PhoneField;