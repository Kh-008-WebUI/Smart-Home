export function booleanValidator(value) {
  console.log('validation fired on ', value);
  return (value === true || value === 'true' || value === false || value === 'false');
};

export function stringValidator(value) {
  console.log('string validation fired on', value);
  return (typeof value === 'string' && isNaN(value)) ;
}

export function dateValidator(value) {
  console.log('date validation fired on', value);
  return (value <= Date.now());
}
