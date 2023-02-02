import { Trans, useTranslation } from 'react-i18next';
import { ruleI18n } from './rule-i18n';

interface ConsequenceProps {
  scoreIncrease: number;
}

export function Consequence({ scoreIncrease }: ConsequenceProps) {
  const { t, i18n } = useTranslation(ruleI18n);

  return (
    <div className="bg-purple-10 inline-flex h-8 w-fit items-center justify-center whitespace-pre rounded px-2 font-normal text-purple-100">
      <Trans
        t={t}
        i18nKey="rule:consequence.score_increase"
        components={{
          score: <span className="font-semibold" />,
        }}
        values={{
          score: Intl.NumberFormat(i18n.language, {
            signDisplay: 'always',
          }).format(scoreIncrease),
        }}
      />
    </div>
  );
}
