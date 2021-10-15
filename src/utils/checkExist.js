export const checkExist = async (fieldValue, model) => {
  const response = await model.findOne({ fieldValue });
  console.log(response);
  if (response) return true;
  else return false;
};
