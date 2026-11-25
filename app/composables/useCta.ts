// The main button: what it does is a setting, and where it goes follows from the contact details, so
// the two cannot disagree. Without somewhere to go there is no button.
export const useCta = () => {
  const settings = useSettings();
  return computed(() => {
    const data = settings.value?.data;
    if (!data?.cta_label) return null;
    const call = data.phone && `tel:${data.phone}`;
    const message = data.email && `mailto:${data.email}`;
    const visit = data.address && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;
    const book = data.cta_link && "url" in data.cta_link ? data.cta_link.url : undefined;
    const wanted = { Call: call, Message: message, Visit: visit, Book: book }[data.cta_action ?? "Book"];
    const href = wanted || book || call || message;
    return href ? { href, label: data.cta_label } : null;
  });
};
