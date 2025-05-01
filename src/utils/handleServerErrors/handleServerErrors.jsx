export const handleServerErrors = (
  error,
  notify,
  options = {}
) => {
  const {
    defaultMessage = 'Произошла ошибка. Попробуйте снова.',
    fieldNames = {}, // Перевод названий полей, например, { email: 'Email' }
  } = options;

  // Проверяем, есть ли данные об ошибке
  if (!error) {
    notify(defaultMessage, 'error');
    return false;
  }

  let hasErrors = false;

  // Обрабатываем ошибки по полям (например, { email: [], username: [] })
  for (const [field, messages] of Object.entries(error)) {
    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        const fieldName = fieldNames[field] || field; // Используем перевод или само поле
        notify(`${fieldName}: ${message}`, 'error');
        hasErrors = true;
      });
    }
  }

  // Обрабатываем общие ошибки (например, { detail: "Ошибка" })
  if (error.detail && typeof error.detail === 'string') {
    notify(error.detail, 'error');
    hasErrors = true;
  }

  // Если нет специфичных ошибок, показываем общее сообщение
  if (!hasErrors) {
    notify(defaultMessage, 'error');
  }

  return hasErrors;
};