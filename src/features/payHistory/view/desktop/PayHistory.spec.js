import React from 'react';
import { shallow, mount } from 'enzyme';
import block from 'bem-cn';

import { PayHistory } from './PayHistory';

describe('PayHistory tests', () => {
  const b = block('pay-props.history');
  const props = {
    locale: {
      success: 'success test',
      payHistory: 'payHistory test',
      date: 'date test',
      operationType: 'operationType test',
      amount: 'amount test',
      status: 'status test',
      withdrawalStatuses: { 0: 'Created', 1: 'During', 2: 'Paid out', 3: 'Blocked', 4: 'Canceled' },
      paymentTypes: { 1: 'Refill balance', 6: 'Bet win', 10: 'Withdrawal', 16: 'Payment with FREEKASSA', 114: 'Payment with cashier' },
    },
    history: [
      { date: '05.08.2019 09:15', id: 1751, status: 6, amount: 60, type: 'payment' },
      { date: '24.07.2019 02:14', id: 480, status: 6, amount: 25, type: 'payment' },
      { date: '18.07.2019 21:43', id: 10, paymentMode: 'Card', purse: null, status: 1, amount: 50, type: 'withdrawal' },
      { date: '11.07.2019 18:33', id: 7, paymentMode: 'Card', purse: '50505050', status: 1, amount: 50, type: 'withdrawal' },
    ],
    currency: 'RUB',
    actionProcessing: false,
    getPayHistory: jest.fn(),
  };

  describe('PayHistory with props', () => {
    const payHistory = shallow(<PayHistory {...props} />);
    const { locale, currency } = props;

    it('render properly', () => {
      expect(payHistory).toMatchSnapshot();
    });

    it('render title', () => {
      expect(payHistory.find('.pay-history__title').text()).toEqual(locale.payHistory);
    });

    describe('render table header text', () => {
      it('render table header date', () => {
        expect(payHistory.find('.pay-history__table-cell_type_date').at(0).text())
          .toEqual(locale.date);
      });

      it('render table header type', () => {
        expect(payHistory.find('.pay-history__table-cell_type_type').at(0).text())
          .toEqual(locale.operationType);
      });

      it('render table header amount', () => {
        expect(payHistory.find('.pay-history__table-cell_type_amount').at(0).text())
          .toEqual(`${locale.amount} ${currency}`);
      });

      it('render table header status', () => {
        expect(payHistory.find('.pay-history__table-cell_type_status').at(0).text())
          .toEqual(locale.status);
      });
    });

    describe('render table cells text', () => {
      ['date', 'amount'].forEach(type => {
        it(`render table cell ${type}`, () => {
          props.history.forEach((key, i) => {
            expect(payHistory.find(`.pay-history__table-cell_type_${type}`).at(i + 1).text())
              .toEqual(type === 'amount' ? `${props.history[i][type]} ${currency}` : props.history[i][type]);
          });
        });
      });

      it('render table cell type', () => {
        props.history.forEach((key, i) => {
          expect(payHistory.find('.pay-history__table-cell_type_type').at(i + 1).text())
            .toEqual(key.type === 'payment' ? locale.paymentTypes[key.status] : `${key.paymentMode}: ${key.purse}`);
        });
      });

      it('render table cell status', () => {
        props.history.forEach((key, i) => {
          expect(payHistory.find('.pay-history__table-cell_type_status').at(i + 1).text())
            .toEqual(key.type === 'payment' ? locale.success : locale.withdrawalStatuses[key.status]);
        });
      });
    });

    describe('table rows count', () => {
      ['date', 'amount', 'type', 'status'].forEach(type => {
        it(`render table cells ${type} count`, () => {
          expect(payHistory.find(`.pay-history__table-cell_type_${type}`)).toHaveLength(props.history.length + 1);
        });
      });
    });

    it('render Spinner', () => {
      const nextProps = { ...props, actionProcessing: true };
      const component = shallow(<PayHistory {...nextProps} />);

      expect(component.find('Spinner')).toHaveLength(1);
    });

    it('should call componentDidMount once', () => {
      const componentDidMountSpy = jest.spyOn(PayHistory.prototype, 'componentDidMount');
      mount(<PayHistory {...props} />);
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getPayHistory in componentDidMount', () => {
      mount(<PayHistory {...props} />);
      expect(props.getPayHistory).toHaveBeenCalledTimes(1);
    });
  });
});