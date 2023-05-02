const diffDays = (dateString: string) => {
  const dateToCompare = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - dateToCompare.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export { diffDays };
