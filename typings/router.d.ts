/** @format */

import { MiddlewareObj, Middleware, MiddlewareFn } from './composer'
import { RegrafContext } from './context'

type TRoute = string
type MaybePromise<T> = T | Promise<T>

export type RouteFn<TContext extends RegrafContext> = (
  ctx: TContext
) => MaybePromise<{
  route?: TRoute
} | null>

type HandlersMap<TContext extends RegrafContext> = Map<
  TRoute,
  Middleware<TContext>
>

declare class Router<TContext extends RegrafContext>
  implements MiddlewareObj<TContext> {
  routeFn: RouteFn<TContext>
  handlers: HandlersMap<TContext>
  otherwiseHandler: Middleware<TContext>

  constructor(routeFn: RouteFn<TContext>, handlers?: HandlersMap<TContext>)

  on(
    route: TRoute,
    fn: Middleware<TContext>,
    ...fns: Middleware<TContext>[]
  ): this

  otherwise(fn: Middleware<TContext>, ...fns: Middleware<TContext>[]): this

  middleware(): MiddlewareFn<TContext>
}
