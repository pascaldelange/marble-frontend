import {
  type MarbleSession,
  type ToastMessage,
  toastMessageScema,
} from '@app-builder/models';
import { getClientEnv } from '@app-builder/utils/environment.client';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function setToastMessage(
  session: MarbleSession,
  toastMessage: ToastMessage
) {
  session.flash('toastMessage', toastMessage);
}

export function getToastMessage(session: MarbleSession) {
  try {
    return toastMessageScema.parse(session.get('toastMessage'));
  } catch (err) {}
}

export function MarbleToaster({
  toastMessage,
}: {
  toastMessage?: ToastMessage;
}) {
  const { t } = useTranslation(['common']);

  useEffect(() => {
    const type = toastMessage?.type;
    const message = toastMessage?.messageKey
      ? t(toastMessage.messageKey)
      : undefined;

    if (!type || !message) {
      return;
    }
    toast[type](getMessage(message));
  }, [t, toastMessage]);

  return <Toaster position="bottom-center" />;
}

function getMessage(message: string) {
  if (getClientEnv('ENV') !== 'development') {
    return message;
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-s text-grey-100">{message}</p>
      <p className="text-grey-50 text-xs">
        In dev, toast may be displayed twice due to strict mode
      </p>
    </div>
  );
}