
import PropTypes from 'prop-types';
import React from 'react';
import FicoRanking from './FicoRanking';

const keyVariables = {
  creditHistoryLength: {
    title: 'Credit History Length',
    threshold: 3,
    thresholdDirection: '<',
    impactPositive: 'Congrats, you have a long credit history. This certainly helps to raise your score.',
    impactNegative: 'Your FICO score will be lower if you don\'t have a long credit history.',
    suggestedActions: [
      'The longer you hold a line of credit and pay on a regular basis, the better. Keep your accounts open and up-to-date.',
    ],
  },
  creditAccounts: {
    title: 'Credit Accounts',
    threshold: 2,
    thresholdDirection: '<',
    impactPositive: 'Your multiple lines of credit shows that you are trusted by multiple institutions.',
    impactNegative: 'You don\'t have many lines of credit with wich to build your credit score.',
    suggestedActions: [
      'Take out a credit card or an additional line of credit now, so that future you will have multiple accounts with a long credit history. Having different types of credit will also help.',
    ],
  },
  newCreditAccounts: {
    title: 'New Credit Accounts',
    threshold: 0,
    thresholdDirection: '>',
    impactPositive: 'You don\'t have any new credit accounts. Opening a new line of credit will temporarily lower your credit score.',
    impactNegative: 'One of the factors that goes into your credit score calculation is the average length of your lines of credit. New credit accounts will lower that length of time.',
    suggestedActions: [
      'Your credit score will be lower temporarily when you\'ve recently opened up a new line of credit. Wait a little bit of time after opening a new line of credit for your FICO score to recover.',
    ],
  },
  latePayments: {
    title: 'Late Payments',
    threshold: 0,
    thresholdDirection: '>',
    impactPositive: 'Congrats, you don\'t have any late payments on file! Late payments have the biggest negative impact on your credit score.',
    impactNegative: 'Late payments have the biggest negative impact on your credit score.',
    suggestedActions: [
      'Did you know that if your bill is paid up, some companies will allow you to ask that a late payment be removed from their records? This depends on the policies of the individual creditor or utility who issued the bill, but it doesn\'t hurt to give them a call, explain your situation, explain the extenuating circumstances of your late payment, and ask if they can remove that incident from their records.',
      'If available, automatic payments (a.k.a. autopay) can be an easy way to make sure that bills get paid on time. Even if the company sending you a bill does not have that technical capability, inquire at your local bank! Many banks offer automatic payment services to transfer money or mail a check at regular intervals.',
    ],
  },
  creditUtilization: {
    title: 'Credit Utilization',
    threshold: 30,
    thresholdDirection: '>',
    impactPositive: 'You have a much higher available credit than your current debt.',
    impactNegative: '',
    suggestedActions: [
      'Avoid taking on additional debt if you can at this time',
      'As Credit Utilization Rate is calculated as a percentage, you may be able to lower your Credit Utilization Rate by applying for a higher credit limit on your credit card',
    ],
  },
};

class FicoSuggestions extends React.Component {
  render() {
    if (!this.props.data.ficoScores || !this.props.data.ficoScores.length) return null;
    const latestScore = this.props.data.ficoScores.slice(-1)[0];

    const ficoInfluencers = Object.keys(keyVariables).map((key) => {
      const copy = keyVariables[key];
      // grab user value, defaulting to 0
      let userValue = 0;
      if (this.props.data.ficoInfluencers[key]) {
        userValue = this.props.data.ficoInfluencers[key].value || 0;
      }
      let influence = 'positive';
      if (copy.thresholdDirection === '>') {
        if (userValue > copy.threshold) influence = 'negative';
      } else {
        if (userValue < copy.threshold) influence = 'negative';
      }
      const description = influence === 'positive' ? copy.impactPositive : copy.impactNegative;
      // if this factor negatively influenced your score, show suggested actions
      const suggestions = [];
      if (influence === 'negative') {
        copy.suggestedActions.forEach((suggestion, index) => {
          suggestions.push(<div key={index}><img src='/check.svg'/>{suggestion}</div>);
        });
      }
      return (
        <div key={key} className={`card ${influence}`}>
          <div className='title'>
            <img src={`/${influence}.svg`} />
            <span>{copy.title}</span>
          </div>
          <div className='description'>{description}</div>
          <div className='suggestions'>
            {suggestions}
          </div>
        </div>
      );
    });
    return (
      <div className='fico-suggestions'>
        <h1 className='score'>
          Your FICO Score is <b>{latestScore.value}</b>
        </h1>
        <div className='ranking'>This score is better than <b>{FicoRanking.getPercentage(latestScore.value)}%</b> of the population</div>
        <div className='influencers'>
          {ficoInfluencers}
        </div>
      </div>
    );
  }
}
FicoSuggestions.propTypes = {
  data: PropTypes.object.isRequired,
};

module.exports = FicoSuggestions;
