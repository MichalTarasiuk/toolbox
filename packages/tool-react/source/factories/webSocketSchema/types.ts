import type {Any, Custom} from '@tool/typescript';

type AnyStates = Any.AnyObject<Any.AnyObject>;
type AnySteps = Any.AnyObject<Array<keyof AnyStates>, keyof AnyStates>;

export type AnyWebSocketSchema = InferWebSocketSchema<AnyStates, AnySteps>;

export type Transition<WebSocketSchema extends AnyWebSocketSchema> = <
  Kind extends WebSocketSchema['allKeys'],
  NextKind extends InferNextKind<WebSocketSchema, Kind>,
  NextState extends InferNextState<WebSocketSchema, NextKind>,
>(
  kind: Kind,
  nextKind: NextKind,
  nextState: NextState,
) => Custom.Debug<NextState & {kind: NextKind}>;

export type InferNextKind<
  WebSocketSchema extends AnyWebSocketSchema,
  Kind extends WebSocketSchema['allKeys'],
> = WebSocketSchema['steps'][Kind][number];

export type InferNextState<
  WebSocketSchema extends AnyWebSocketSchema,
  NextKind extends WebSocketSchema['allKeys'],
> = WebSocketSchema['states'][NextKind];

export type InferWebSocketSchema<
  States extends Any.AnyObject<Any.AnyObject>,
  Steps extends Any.AnyObject<Array<keyof Steps>, keyof Steps>,
> = {
  states: States;
  steps: Steps;
  allKeys: keyof Steps;
};

export type SelectWebSocketState<
  WebSocketSchema extends AnyWebSocketSchema,
  Kind extends WebSocketSchema['allKeys'],
> = Custom.Debug<WebSocketSchema['states'][Kind] & {kind: Kind}>;

export type InferStateUnion<WebSocketSchema extends AnyWebSocketSchema> = Custom.Debug<
  Custom.ValueOf<{
    [Key in keyof WebSocketSchema['states']]: WebSocketSchema['states'][Key] & {kind: Key};
  }>
>;
