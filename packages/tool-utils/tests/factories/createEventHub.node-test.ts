import {createEventHub, noop} from '../../_api';

describe('node - utils:factories:createAutoPercentage', () => {
  it('should subscribe', () => {
    const eventHub = createEventHub();

    const listener = eventHub.on('message', noop);

    expect(listener).toBeDefined();
  });

  it('listen on event', () => {
    const spy = jest.fn();
    const value = 'Hello World!';

    const eventHub = createEventHub();

    eventHub.on('message', spy);
    eventHub.emit('message', value);

    expect(spy).toHaveBeenCalledWith(value);
  });

  it('should unsubscribe', () => {
    const spy = jest.fn();
    const value = 'Hello World!';

    const eventHub = createEventHub();

    const listener = eventHub.on('message', spy);
    listener.off();

    eventHub.emit('message', value);

    expect(spy).not.toHaveBeenCalled();
  });
});
