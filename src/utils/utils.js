export function searchItem (item, searchValue) {
  const result = item.name.toLowerCase()
    .includes(searchValue.toLowerCase().trim());

  return result;
}
