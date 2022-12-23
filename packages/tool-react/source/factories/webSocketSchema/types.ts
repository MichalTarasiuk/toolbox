import type {Any, Custom} from '@tool/typescript';

type AnyStates = Any.AnyObject<Any.AnyObject>;
type AnySteps = Any.AnyObject<Array<keyof AnyStates>, keyof AnyStates>;

export type AnyWebSocketSchema = InferWebSocketSchema<AnyStates, AnySteps>;

export type InferWebSocketSchema<
  States extends Any.AnyObject<Any.AnyObject>,
  Steps extends Any.AnyObject<Array<keyof Steps>, keyof Steps>,
> = {
  states: States;
  allKeys: keyof Steps;
};

export type Get<WebSocketSchema extends AnyWebSocketSchema> = () => InferStateUnion<WebSocketSchema>;

export type Transition<
  WebSocketSchema extends AnyWebSocketSchema,
  State = Omit<InferStateUnion<WebSocketSchema>, 'kind'>,
> = (kind: WebSocketSchema['allKeys'], nextKind: WebSocketSchema['allKeys'], nextState: State) => State;

export type SelectWebSocketState<
  WebSocketSchema extends AnyWebSocketSchema,
  Kind extends WebSocketSchema['allKeys'],
> = WebSocketSchema['states'][Kind] & {kind: Kind};

export type InferStateUnion<WebSocketSchema extends AnyWebSocketSchema> = Custom.Debug<
  Custom.ValueOf<{
    [Key in keyof WebSocketSchema['states']]: WebSocketSchema['states'][Key] & {kind: Key};
  }>
>;
