import classNames from 'classnames';

export const RECENT = 'RECENT';
export const OLDEST = 'OLDEST';
export const RISING = 'RISING';
export const POPULAR = 'POPULAR';
export const ORDERS = [RECENT, OLDEST, RISING, POPULAR];

const IdeaOrder = ({ currentOrder, onOrderClick }) => {
  return (
    <div className='field has-addons has-addons-centered'>
      <p className='control'>
        <button
          onClick={() => onOrderClick(POPULAR)}
          className={classNames('button is-rounded', {
            'is-primary': currentOrder === POPULAR,
          })}
          type='button'
        >
          Popular
        </button>
      </p>
      <p className='control'>
        <button
          onClick={() => onOrderClick(RISING)}
          className={classNames('button is-rounded', {
            'is-primary': currentOrder === RISING,
          })}
          type='button'
        >
          Rising
        </button>
      </p>
      <p className='control'>
        <button
          onClick={() => onOrderClick(RECENT)}
          className={classNames('button is-rounded', {
            'is-primary': currentOrder === RECENT,
          })}
          type='button'
        >
          Recent
        </button>
      </p>
      <p className='control'>
        <button
          onClick={() => onOrderClick(OLDEST)}
          className={classNames('button is-rounded', {
            'is-primary': currentOrder === OLDEST,
          })}
          type='button'
        >
          Oldest
        </button>
      </p>
    </div>
  );
};

export default IdeaOrder;
