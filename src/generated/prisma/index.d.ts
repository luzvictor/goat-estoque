
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Produto
 * 
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>
/**
 * Model EntradaEstoque
 * 
 */
export type EntradaEstoque = $Result.DefaultSelection<Prisma.$EntradaEstoquePayload>
/**
 * Model Pedido
 * 
 */
export type Pedido = $Result.DefaultSelection<Prisma.$PedidoPayload>
/**
 * Model PedidoProduto
 * 
 */
export type PedidoProduto = $Result.DefaultSelection<Prisma.$PedidoProdutoPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Notificacao
 * 
 */
export type Notificacao = $Result.DefaultSelection<Prisma.$NotificacaoPayload>
/**
 * Model NotificacaoUsuario
 * 
 */
export type NotificacaoUsuario = $Result.DefaultSelection<Prisma.$NotificacaoUsuarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Produtos
 * const produtos = await prisma.produto.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Produtos
   * const produtos = await prisma.produto.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entradaEstoque`: Exposes CRUD operations for the **EntradaEstoque** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntradaEstoques
    * const entradaEstoques = await prisma.entradaEstoque.findMany()
    * ```
    */
  get entradaEstoque(): Prisma.EntradaEstoqueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedido`: Exposes CRUD operations for the **Pedido** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pedidos
    * const pedidos = await prisma.pedido.findMany()
    * ```
    */
  get pedido(): Prisma.PedidoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pedidoProduto`: Exposes CRUD operations for the **PedidoProduto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PedidoProdutos
    * const pedidoProdutos = await prisma.pedidoProduto.findMany()
    * ```
    */
  get pedidoProduto(): Prisma.PedidoProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificacao`: Exposes CRUD operations for the **Notificacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notificacaos
    * const notificacaos = await prisma.notificacao.findMany()
    * ```
    */
  get notificacao(): Prisma.NotificacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificacaoUsuario`: Exposes CRUD operations for the **NotificacaoUsuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificacaoUsuarios
    * const notificacaoUsuarios = await prisma.notificacaoUsuario.findMany()
    * ```
    */
  get notificacaoUsuario(): Prisma.NotificacaoUsuarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Produto: 'Produto',
    EntradaEstoque: 'EntradaEstoque',
    Pedido: 'Pedido',
    PedidoProduto: 'PedidoProduto',
    Usuario: 'Usuario',
    Notificacao: 'Notificacao',
    NotificacaoUsuario: 'NotificacaoUsuario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "produto" | "entradaEstoque" | "pedido" | "pedidoProduto" | "usuario" | "notificacao" | "notificacaoUsuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>
        fields: Prisma.ProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProdutoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProdutoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduto>
          }
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number
          }
        }
      }
      EntradaEstoque: {
        payload: Prisma.$EntradaEstoquePayload<ExtArgs>
        fields: Prisma.EntradaEstoqueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntradaEstoqueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntradaEstoqueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          findFirst: {
            args: Prisma.EntradaEstoqueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntradaEstoqueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          findMany: {
            args: Prisma.EntradaEstoqueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>[]
          }
          create: {
            args: Prisma.EntradaEstoqueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          createMany: {
            args: Prisma.EntradaEstoqueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntradaEstoqueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>[]
          }
          delete: {
            args: Prisma.EntradaEstoqueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          update: {
            args: Prisma.EntradaEstoqueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          deleteMany: {
            args: Prisma.EntradaEstoqueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntradaEstoqueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntradaEstoqueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>[]
          }
          upsert: {
            args: Prisma.EntradaEstoqueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntradaEstoquePayload>
          }
          aggregate: {
            args: Prisma.EntradaEstoqueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntradaEstoque>
          }
          groupBy: {
            args: Prisma.EntradaEstoqueGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntradaEstoqueGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntradaEstoqueCountArgs<ExtArgs>
            result: $Utils.Optional<EntradaEstoqueCountAggregateOutputType> | number
          }
        }
      }
      Pedido: {
        payload: Prisma.$PedidoPayload<ExtArgs>
        fields: Prisma.PedidoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findFirst: {
            args: Prisma.PedidoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          findMany: {
            args: Prisma.PedidoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          create: {
            args: Prisma.PedidoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          createMany: {
            args: Prisma.PedidoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          delete: {
            args: Prisma.PedidoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          update: {
            args: Prisma.PedidoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>[]
          }
          upsert: {
            args: Prisma.PedidoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoPayload>
          }
          aggregate: {
            args: Prisma.PedidoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedido>
          }
          groupBy: {
            args: Prisma.PedidoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoCountAggregateOutputType> | number
          }
        }
      }
      PedidoProduto: {
        payload: Prisma.$PedidoProdutoPayload<ExtArgs>
        fields: Prisma.PedidoProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PedidoProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PedidoProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          findFirst: {
            args: Prisma.PedidoProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PedidoProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          findMany: {
            args: Prisma.PedidoProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>[]
          }
          create: {
            args: Prisma.PedidoProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          createMany: {
            args: Prisma.PedidoProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PedidoProdutoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>[]
          }
          delete: {
            args: Prisma.PedidoProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          update: {
            args: Prisma.PedidoProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          deleteMany: {
            args: Prisma.PedidoProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PedidoProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PedidoProdutoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>[]
          }
          upsert: {
            args: Prisma.PedidoProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PedidoProdutoPayload>
          }
          aggregate: {
            args: Prisma.PedidoProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePedidoProduto>
          }
          groupBy: {
            args: Prisma.PedidoProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PedidoProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PedidoProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<PedidoProdutoCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Notificacao: {
        payload: Prisma.$NotificacaoPayload<ExtArgs>
        fields: Prisma.NotificacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          findFirst: {
            args: Prisma.NotificacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          findMany: {
            args: Prisma.NotificacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>[]
          }
          create: {
            args: Prisma.NotificacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          createMany: {
            args: Prisma.NotificacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>[]
          }
          delete: {
            args: Prisma.NotificacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          update: {
            args: Prisma.NotificacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          deleteMany: {
            args: Prisma.NotificacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>[]
          }
          upsert: {
            args: Prisma.NotificacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoPayload>
          }
          aggregate: {
            args: Prisma.NotificacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificacao>
          }
          groupBy: {
            args: Prisma.NotificacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificacaoCountArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoCountAggregateOutputType> | number
          }
        }
      }
      NotificacaoUsuario: {
        payload: Prisma.$NotificacaoUsuarioPayload<ExtArgs>
        fields: Prisma.NotificacaoUsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificacaoUsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificacaoUsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          findFirst: {
            args: Prisma.NotificacaoUsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificacaoUsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          findMany: {
            args: Prisma.NotificacaoUsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>[]
          }
          create: {
            args: Prisma.NotificacaoUsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          createMany: {
            args: Prisma.NotificacaoUsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificacaoUsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>[]
          }
          delete: {
            args: Prisma.NotificacaoUsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          update: {
            args: Prisma.NotificacaoUsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          deleteMany: {
            args: Prisma.NotificacaoUsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificacaoUsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificacaoUsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>[]
          }
          upsert: {
            args: Prisma.NotificacaoUsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificacaoUsuarioPayload>
          }
          aggregate: {
            args: Prisma.NotificacaoUsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificacaoUsuario>
          }
          groupBy: {
            args: Prisma.NotificacaoUsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoUsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificacaoUsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<NotificacaoUsuarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    produto?: ProdutoOmit
    entradaEstoque?: EntradaEstoqueOmit
    pedido?: PedidoOmit
    pedidoProduto?: PedidoProdutoOmit
    usuario?: UsuarioOmit
    notificacao?: NotificacaoOmit
    notificacaoUsuario?: NotificacaoUsuarioOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    entradas: number
    pedidos: number
  }

  export type ProdutoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entradas?: boolean | ProdutoCountOutputTypeCountEntradasArgs
    pedidos?: boolean | ProdutoCountOutputTypeCountPedidosArgs
  }

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountEntradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaEstoqueWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoProdutoWhereInput
  }


  /**
   * Count Type PedidoCountOutputType
   */

  export type PedidoCountOutputType = {
    produtos: number
  }

  export type PedidoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produtos?: boolean | PedidoCountOutputTypeCountProdutosArgs
  }

  // Custom InputTypes
  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoCountOutputType
     */
    select?: PedidoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PedidoCountOutputType without action
   */
  export type PedidoCountOutputTypeCountProdutosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoProdutoWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    pedidos: number
    notificacoes: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | UsuarioCountOutputTypeCountPedidosArgs
    notificacoes?: boolean | UsuarioCountOutputTypeCountNotificacoesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountPedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountNotificacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacaoUsuarioWhereInput
  }


  /**
   * Count Type NotificacaoCountOutputType
   */

  export type NotificacaoCountOutputType = {
    usuarios: number
  }

  export type NotificacaoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | NotificacaoCountOutputTypeCountUsuariosArgs
  }

  // Custom InputTypes
  /**
   * NotificacaoCountOutputType without action
   */
  export type NotificacaoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoCountOutputType
     */
    select?: NotificacaoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NotificacaoCountOutputType without action
   */
  export type NotificacaoCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacaoUsuarioWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoAvgAggregateOutputType = {
    quantidade: number | null
    valorCusto: number | null
    valorVenda: number | null
    estoqueMin: number | null
  }

  export type ProdutoSumAggregateOutputType = {
    quantidade: number | null
    valorCusto: number | null
    valorVenda: number | null
    estoqueMin: number | null
  }

  export type ProdutoMinAggregateOutputType = {
    id_produto: string | null
    nome: string | null
    categoria: string | null
    marca: string | null
    cor: string | null
    quantidade: number | null
    valorCusto: number | null
    valorVenda: number | null
    estoqueMin: number | null
  }

  export type ProdutoMaxAggregateOutputType = {
    id_produto: string | null
    nome: string | null
    categoria: string | null
    marca: string | null
    cor: string | null
    quantidade: number | null
    valorCusto: number | null
    valorVenda: number | null
    estoqueMin: number | null
  }

  export type ProdutoCountAggregateOutputType = {
    id_produto: number
    nome: number
    categoria: number
    marca: number
    cor: number
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    _all: number
  }


  export type ProdutoAvgAggregateInputType = {
    quantidade?: true
    valorCusto?: true
    valorVenda?: true
    estoqueMin?: true
  }

  export type ProdutoSumAggregateInputType = {
    quantidade?: true
    valorCusto?: true
    valorVenda?: true
    estoqueMin?: true
  }

  export type ProdutoMinAggregateInputType = {
    id_produto?: true
    nome?: true
    categoria?: true
    marca?: true
    cor?: true
    quantidade?: true
    valorCusto?: true
    valorVenda?: true
    estoqueMin?: true
  }

  export type ProdutoMaxAggregateInputType = {
    id_produto?: true
    nome?: true
    categoria?: true
    marca?: true
    cor?: true
    quantidade?: true
    valorCusto?: true
    valorVenda?: true
    estoqueMin?: true
  }

  export type ProdutoCountAggregateInputType = {
    id_produto?: true
    nome?: true
    categoria?: true
    marca?: true
    cor?: true
    quantidade?: true
    valorCusto?: true
    valorVenda?: true
    estoqueMin?: true
    _all?: true
  }

  export type ProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[]
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _avg?: ProdutoAvgAggregateInputType
    _sum?: ProdutoSumAggregateInputType
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }

  export type ProdutoGroupByOutputType = {
    id_produto: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_produto?: boolean
    nome?: boolean
    categoria?: boolean
    marca?: boolean
    cor?: boolean
    quantidade?: boolean
    valorCusto?: boolean
    valorVenda?: boolean
    estoqueMin?: boolean
    entradas?: boolean | Produto$entradasArgs<ExtArgs>
    pedidos?: boolean | Produto$pedidosArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_produto?: boolean
    nome?: boolean
    categoria?: boolean
    marca?: boolean
    cor?: boolean
    quantidade?: boolean
    valorCusto?: boolean
    valorVenda?: boolean
    estoqueMin?: boolean
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_produto?: boolean
    nome?: boolean
    categoria?: boolean
    marca?: boolean
    cor?: boolean
    quantidade?: boolean
    valorCusto?: boolean
    valorVenda?: boolean
    estoqueMin?: boolean
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectScalar = {
    id_produto?: boolean
    nome?: boolean
    categoria?: boolean
    marca?: boolean
    cor?: boolean
    quantidade?: boolean
    valorCusto?: boolean
    valorVenda?: boolean
    estoqueMin?: boolean
  }

  export type ProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_produto" | "nome" | "categoria" | "marca" | "cor" | "quantidade" | "valorCusto" | "valorVenda" | "estoqueMin", ExtArgs["result"]["produto"]>
  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entradas?: boolean | Produto$entradasArgs<ExtArgs>
    pedidos?: boolean | Produto$pedidosArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProdutoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produto"
    objects: {
      entradas: Prisma.$EntradaEstoquePayload<ExtArgs>[]
      pedidos: Prisma.$PedidoProdutoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_produto: string
      nome: string
      categoria: string
      marca: string
      cor: string
      quantidade: number
      valorCusto: number
      valorVenda: number
      estoqueMin: number
    }, ExtArgs["result"]["produto"]>
    composites: {}
  }

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> = $Result.GetResult<Prisma.$ProdutoPayload, S>

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutoCountAggregateInputType | true
    }

  export interface ProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto'], meta: { name: 'Produto' } }
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `id_produto`
     * const produtoWithId_produtoOnly = await prisma.produto.findMany({ select: { id_produto: true } })
     * 
     */
    findMany<T extends ProdutoFindManyArgs>(args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
     */
    create<T extends ProdutoCreateArgs>(args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutoCreateManyArgs>(args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutoCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `id_produto`
     * const produtoWithId_produtoOnly = await prisma.produto.createManyAndReturn({
     *   select: { id_produto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProdutoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProdutoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
     */
    delete<T extends ProdutoDeleteArgs>(args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutoUpdateArgs>(args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutoUpdateManyArgs>(args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {ProdutoUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `id_produto`
     * const produtoWithId_produtoOnly = await prisma.produto.updateManyAndReturn({
     *   select: { id_produto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProdutoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProdutoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): Prisma.PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produto model
   */
  readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entradas<T extends Produto$entradasArgs<ExtArgs> = {}>(args?: Subset<T, Produto$entradasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pedidos<T extends Produto$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Produto$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly id_produto: FieldRef<"Produto", 'String'>
    readonly nome: FieldRef<"Produto", 'String'>
    readonly categoria: FieldRef<"Produto", 'String'>
    readonly marca: FieldRef<"Produto", 'String'>
    readonly cor: FieldRef<"Produto", 'String'>
    readonly quantidade: FieldRef<"Produto", 'Int'>
    readonly valorCusto: FieldRef<"Produto", 'Float'>
    readonly valorVenda: FieldRef<"Produto", 'Float'>
    readonly estoqueMin: FieldRef<"Produto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produto createManyAndReturn
   */
  export type ProdutoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto updateManyAndReturn
   */
  export type ProdutoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produto.entradas
   */
  export type Produto$entradasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    where?: EntradaEstoqueWhereInput
    orderBy?: EntradaEstoqueOrderByWithRelationInput | EntradaEstoqueOrderByWithRelationInput[]
    cursor?: EntradaEstoqueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntradaEstoqueScalarFieldEnum | EntradaEstoqueScalarFieldEnum[]
  }

  /**
   * Produto.pedidos
   */
  export type Produto$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    where?: PedidoProdutoWhereInput
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    cursor?: PedidoProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoProdutoScalarFieldEnum | PedidoProdutoScalarFieldEnum[]
  }

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
  }


  /**
   * Model EntradaEstoque
   */

  export type AggregateEntradaEstoque = {
    _count: EntradaEstoqueCountAggregateOutputType | null
    _avg: EntradaEstoqueAvgAggregateOutputType | null
    _sum: EntradaEstoqueSumAggregateOutputType | null
    _min: EntradaEstoqueMinAggregateOutputType | null
    _max: EntradaEstoqueMaxAggregateOutputType | null
  }

  export type EntradaEstoqueAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type EntradaEstoqueSumAggregateOutputType = {
    quantidade: number | null
  }

  export type EntradaEstoqueMinAggregateOutputType = {
    id_entrada: string | null
    data: Date | null
    quantidade: number | null
    produtoId: string | null
  }

  export type EntradaEstoqueMaxAggregateOutputType = {
    id_entrada: string | null
    data: Date | null
    quantidade: number | null
    produtoId: string | null
  }

  export type EntradaEstoqueCountAggregateOutputType = {
    id_entrada: number
    data: number
    quantidade: number
    produtoId: number
    _all: number
  }


  export type EntradaEstoqueAvgAggregateInputType = {
    quantidade?: true
  }

  export type EntradaEstoqueSumAggregateInputType = {
    quantidade?: true
  }

  export type EntradaEstoqueMinAggregateInputType = {
    id_entrada?: true
    data?: true
    quantidade?: true
    produtoId?: true
  }

  export type EntradaEstoqueMaxAggregateInputType = {
    id_entrada?: true
    data?: true
    quantidade?: true
    produtoId?: true
  }

  export type EntradaEstoqueCountAggregateInputType = {
    id_entrada?: true
    data?: true
    quantidade?: true
    produtoId?: true
    _all?: true
  }

  export type EntradaEstoqueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntradaEstoque to aggregate.
     */
    where?: EntradaEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaEstoques to fetch.
     */
    orderBy?: EntradaEstoqueOrderByWithRelationInput | EntradaEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntradaEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntradaEstoques
    **/
    _count?: true | EntradaEstoqueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntradaEstoqueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntradaEstoqueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntradaEstoqueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntradaEstoqueMaxAggregateInputType
  }

  export type GetEntradaEstoqueAggregateType<T extends EntradaEstoqueAggregateArgs> = {
        [P in keyof T & keyof AggregateEntradaEstoque]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntradaEstoque[P]>
      : GetScalarType<T[P], AggregateEntradaEstoque[P]>
  }




  export type EntradaEstoqueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntradaEstoqueWhereInput
    orderBy?: EntradaEstoqueOrderByWithAggregationInput | EntradaEstoqueOrderByWithAggregationInput[]
    by: EntradaEstoqueScalarFieldEnum[] | EntradaEstoqueScalarFieldEnum
    having?: EntradaEstoqueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntradaEstoqueCountAggregateInputType | true
    _avg?: EntradaEstoqueAvgAggregateInputType
    _sum?: EntradaEstoqueSumAggregateInputType
    _min?: EntradaEstoqueMinAggregateInputType
    _max?: EntradaEstoqueMaxAggregateInputType
  }

  export type EntradaEstoqueGroupByOutputType = {
    id_entrada: string
    data: Date
    quantidade: number
    produtoId: string
    _count: EntradaEstoqueCountAggregateOutputType | null
    _avg: EntradaEstoqueAvgAggregateOutputType | null
    _sum: EntradaEstoqueSumAggregateOutputType | null
    _min: EntradaEstoqueMinAggregateOutputType | null
    _max: EntradaEstoqueMaxAggregateOutputType | null
  }

  type GetEntradaEstoqueGroupByPayload<T extends EntradaEstoqueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntradaEstoqueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntradaEstoqueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntradaEstoqueGroupByOutputType[P]>
            : GetScalarType<T[P], EntradaEstoqueGroupByOutputType[P]>
        }
      >
    >


  export type EntradaEstoqueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_entrada?: boolean
    data?: boolean
    quantidade?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaEstoque"]>

  export type EntradaEstoqueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_entrada?: boolean
    data?: boolean
    quantidade?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaEstoque"]>

  export type EntradaEstoqueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_entrada?: boolean
    data?: boolean
    quantidade?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entradaEstoque"]>

  export type EntradaEstoqueSelectScalar = {
    id_entrada?: boolean
    data?: boolean
    quantidade?: boolean
    produtoId?: boolean
  }

  export type EntradaEstoqueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_entrada" | "data" | "quantidade" | "produtoId", ExtArgs["result"]["entradaEstoque"]>
  export type EntradaEstoqueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type EntradaEstoqueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type EntradaEstoqueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $EntradaEstoquePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntradaEstoque"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_entrada: string
      data: Date
      quantidade: number
      produtoId: string
    }, ExtArgs["result"]["entradaEstoque"]>
    composites: {}
  }

  type EntradaEstoqueGetPayload<S extends boolean | null | undefined | EntradaEstoqueDefaultArgs> = $Result.GetResult<Prisma.$EntradaEstoquePayload, S>

  type EntradaEstoqueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntradaEstoqueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntradaEstoqueCountAggregateInputType | true
    }

  export interface EntradaEstoqueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntradaEstoque'], meta: { name: 'EntradaEstoque' } }
    /**
     * Find zero or one EntradaEstoque that matches the filter.
     * @param {EntradaEstoqueFindUniqueArgs} args - Arguments to find a EntradaEstoque
     * @example
     * // Get one EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntradaEstoqueFindUniqueArgs>(args: SelectSubset<T, EntradaEstoqueFindUniqueArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EntradaEstoque that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntradaEstoqueFindUniqueOrThrowArgs} args - Arguments to find a EntradaEstoque
     * @example
     * // Get one EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntradaEstoqueFindUniqueOrThrowArgs>(args: SelectSubset<T, EntradaEstoqueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntradaEstoque that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueFindFirstArgs} args - Arguments to find a EntradaEstoque
     * @example
     * // Get one EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntradaEstoqueFindFirstArgs>(args?: SelectSubset<T, EntradaEstoqueFindFirstArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntradaEstoque that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueFindFirstOrThrowArgs} args - Arguments to find a EntradaEstoque
     * @example
     * // Get one EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntradaEstoqueFindFirstOrThrowArgs>(args?: SelectSubset<T, EntradaEstoqueFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EntradaEstoques that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntradaEstoques
     * const entradaEstoques = await prisma.entradaEstoque.findMany()
     * 
     * // Get first 10 EntradaEstoques
     * const entradaEstoques = await prisma.entradaEstoque.findMany({ take: 10 })
     * 
     * // Only select the `id_entrada`
     * const entradaEstoqueWithId_entradaOnly = await prisma.entradaEstoque.findMany({ select: { id_entrada: true } })
     * 
     */
    findMany<T extends EntradaEstoqueFindManyArgs>(args?: SelectSubset<T, EntradaEstoqueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EntradaEstoque.
     * @param {EntradaEstoqueCreateArgs} args - Arguments to create a EntradaEstoque.
     * @example
     * // Create one EntradaEstoque
     * const EntradaEstoque = await prisma.entradaEstoque.create({
     *   data: {
     *     // ... data to create a EntradaEstoque
     *   }
     * })
     * 
     */
    create<T extends EntradaEstoqueCreateArgs>(args: SelectSubset<T, EntradaEstoqueCreateArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EntradaEstoques.
     * @param {EntradaEstoqueCreateManyArgs} args - Arguments to create many EntradaEstoques.
     * @example
     * // Create many EntradaEstoques
     * const entradaEstoque = await prisma.entradaEstoque.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntradaEstoqueCreateManyArgs>(args?: SelectSubset<T, EntradaEstoqueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntradaEstoques and returns the data saved in the database.
     * @param {EntradaEstoqueCreateManyAndReturnArgs} args - Arguments to create many EntradaEstoques.
     * @example
     * // Create many EntradaEstoques
     * const entradaEstoque = await prisma.entradaEstoque.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntradaEstoques and only return the `id_entrada`
     * const entradaEstoqueWithId_entradaOnly = await prisma.entradaEstoque.createManyAndReturn({
     *   select: { id_entrada: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntradaEstoqueCreateManyAndReturnArgs>(args?: SelectSubset<T, EntradaEstoqueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EntradaEstoque.
     * @param {EntradaEstoqueDeleteArgs} args - Arguments to delete one EntradaEstoque.
     * @example
     * // Delete one EntradaEstoque
     * const EntradaEstoque = await prisma.entradaEstoque.delete({
     *   where: {
     *     // ... filter to delete one EntradaEstoque
     *   }
     * })
     * 
     */
    delete<T extends EntradaEstoqueDeleteArgs>(args: SelectSubset<T, EntradaEstoqueDeleteArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EntradaEstoque.
     * @param {EntradaEstoqueUpdateArgs} args - Arguments to update one EntradaEstoque.
     * @example
     * // Update one EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntradaEstoqueUpdateArgs>(args: SelectSubset<T, EntradaEstoqueUpdateArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EntradaEstoques.
     * @param {EntradaEstoqueDeleteManyArgs} args - Arguments to filter EntradaEstoques to delete.
     * @example
     * // Delete a few EntradaEstoques
     * const { count } = await prisma.entradaEstoque.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntradaEstoqueDeleteManyArgs>(args?: SelectSubset<T, EntradaEstoqueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntradaEstoques.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntradaEstoques
     * const entradaEstoque = await prisma.entradaEstoque.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntradaEstoqueUpdateManyArgs>(args: SelectSubset<T, EntradaEstoqueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntradaEstoques and returns the data updated in the database.
     * @param {EntradaEstoqueUpdateManyAndReturnArgs} args - Arguments to update many EntradaEstoques.
     * @example
     * // Update many EntradaEstoques
     * const entradaEstoque = await prisma.entradaEstoque.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EntradaEstoques and only return the `id_entrada`
     * const entradaEstoqueWithId_entradaOnly = await prisma.entradaEstoque.updateManyAndReturn({
     *   select: { id_entrada: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntradaEstoqueUpdateManyAndReturnArgs>(args: SelectSubset<T, EntradaEstoqueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EntradaEstoque.
     * @param {EntradaEstoqueUpsertArgs} args - Arguments to update or create a EntradaEstoque.
     * @example
     * // Update or create a EntradaEstoque
     * const entradaEstoque = await prisma.entradaEstoque.upsert({
     *   create: {
     *     // ... data to create a EntradaEstoque
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntradaEstoque we want to update
     *   }
     * })
     */
    upsert<T extends EntradaEstoqueUpsertArgs>(args: SelectSubset<T, EntradaEstoqueUpsertArgs<ExtArgs>>): Prisma__EntradaEstoqueClient<$Result.GetResult<Prisma.$EntradaEstoquePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EntradaEstoques.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueCountArgs} args - Arguments to filter EntradaEstoques to count.
     * @example
     * // Count the number of EntradaEstoques
     * const count = await prisma.entradaEstoque.count({
     *   where: {
     *     // ... the filter for the EntradaEstoques we want to count
     *   }
     * })
    **/
    count<T extends EntradaEstoqueCountArgs>(
      args?: Subset<T, EntradaEstoqueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntradaEstoqueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntradaEstoque.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntradaEstoqueAggregateArgs>(args: Subset<T, EntradaEstoqueAggregateArgs>): Prisma.PrismaPromise<GetEntradaEstoqueAggregateType<T>>

    /**
     * Group by EntradaEstoque.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntradaEstoqueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntradaEstoqueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntradaEstoqueGroupByArgs['orderBy'] }
        : { orderBy?: EntradaEstoqueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntradaEstoqueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntradaEstoqueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntradaEstoque model
   */
  readonly fields: EntradaEstoqueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntradaEstoque.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntradaEstoqueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EntradaEstoque model
   */
  interface EntradaEstoqueFieldRefs {
    readonly id_entrada: FieldRef<"EntradaEstoque", 'String'>
    readonly data: FieldRef<"EntradaEstoque", 'DateTime'>
    readonly quantidade: FieldRef<"EntradaEstoque", 'Int'>
    readonly produtoId: FieldRef<"EntradaEstoque", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EntradaEstoque findUnique
   */
  export type EntradaEstoqueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which EntradaEstoque to fetch.
     */
    where: EntradaEstoqueWhereUniqueInput
  }

  /**
   * EntradaEstoque findUniqueOrThrow
   */
  export type EntradaEstoqueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which EntradaEstoque to fetch.
     */
    where: EntradaEstoqueWhereUniqueInput
  }

  /**
   * EntradaEstoque findFirst
   */
  export type EntradaEstoqueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which EntradaEstoque to fetch.
     */
    where?: EntradaEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaEstoques to fetch.
     */
    orderBy?: EntradaEstoqueOrderByWithRelationInput | EntradaEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntradaEstoques.
     */
    cursor?: EntradaEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntradaEstoques.
     */
    distinct?: EntradaEstoqueScalarFieldEnum | EntradaEstoqueScalarFieldEnum[]
  }

  /**
   * EntradaEstoque findFirstOrThrow
   */
  export type EntradaEstoqueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which EntradaEstoque to fetch.
     */
    where?: EntradaEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaEstoques to fetch.
     */
    orderBy?: EntradaEstoqueOrderByWithRelationInput | EntradaEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntradaEstoques.
     */
    cursor?: EntradaEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaEstoques.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntradaEstoques.
     */
    distinct?: EntradaEstoqueScalarFieldEnum | EntradaEstoqueScalarFieldEnum[]
  }

  /**
   * EntradaEstoque findMany
   */
  export type EntradaEstoqueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter, which EntradaEstoques to fetch.
     */
    where?: EntradaEstoqueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntradaEstoques to fetch.
     */
    orderBy?: EntradaEstoqueOrderByWithRelationInput | EntradaEstoqueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntradaEstoques.
     */
    cursor?: EntradaEstoqueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntradaEstoques from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntradaEstoques.
     */
    skip?: number
    distinct?: EntradaEstoqueScalarFieldEnum | EntradaEstoqueScalarFieldEnum[]
  }

  /**
   * EntradaEstoque create
   */
  export type EntradaEstoqueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * The data needed to create a EntradaEstoque.
     */
    data: XOR<EntradaEstoqueCreateInput, EntradaEstoqueUncheckedCreateInput>
  }

  /**
   * EntradaEstoque createMany
   */
  export type EntradaEstoqueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntradaEstoques.
     */
    data: EntradaEstoqueCreateManyInput | EntradaEstoqueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntradaEstoque createManyAndReturn
   */
  export type EntradaEstoqueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * The data used to create many EntradaEstoques.
     */
    data: EntradaEstoqueCreateManyInput | EntradaEstoqueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntradaEstoque update
   */
  export type EntradaEstoqueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * The data needed to update a EntradaEstoque.
     */
    data: XOR<EntradaEstoqueUpdateInput, EntradaEstoqueUncheckedUpdateInput>
    /**
     * Choose, which EntradaEstoque to update.
     */
    where: EntradaEstoqueWhereUniqueInput
  }

  /**
   * EntradaEstoque updateMany
   */
  export type EntradaEstoqueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntradaEstoques.
     */
    data: XOR<EntradaEstoqueUpdateManyMutationInput, EntradaEstoqueUncheckedUpdateManyInput>
    /**
     * Filter which EntradaEstoques to update
     */
    where?: EntradaEstoqueWhereInput
    /**
     * Limit how many EntradaEstoques to update.
     */
    limit?: number
  }

  /**
   * EntradaEstoque updateManyAndReturn
   */
  export type EntradaEstoqueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * The data used to update EntradaEstoques.
     */
    data: XOR<EntradaEstoqueUpdateManyMutationInput, EntradaEstoqueUncheckedUpdateManyInput>
    /**
     * Filter which EntradaEstoques to update
     */
    where?: EntradaEstoqueWhereInput
    /**
     * Limit how many EntradaEstoques to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntradaEstoque upsert
   */
  export type EntradaEstoqueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * The filter to search for the EntradaEstoque to update in case it exists.
     */
    where: EntradaEstoqueWhereUniqueInput
    /**
     * In case the EntradaEstoque found by the `where` argument doesn't exist, create a new EntradaEstoque with this data.
     */
    create: XOR<EntradaEstoqueCreateInput, EntradaEstoqueUncheckedCreateInput>
    /**
     * In case the EntradaEstoque was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntradaEstoqueUpdateInput, EntradaEstoqueUncheckedUpdateInput>
  }

  /**
   * EntradaEstoque delete
   */
  export type EntradaEstoqueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
    /**
     * Filter which EntradaEstoque to delete.
     */
    where: EntradaEstoqueWhereUniqueInput
  }

  /**
   * EntradaEstoque deleteMany
   */
  export type EntradaEstoqueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntradaEstoques to delete
     */
    where?: EntradaEstoqueWhereInput
    /**
     * Limit how many EntradaEstoques to delete.
     */
    limit?: number
  }

  /**
   * EntradaEstoque without action
   */
  export type EntradaEstoqueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntradaEstoque
     */
    select?: EntradaEstoqueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntradaEstoque
     */
    omit?: EntradaEstoqueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntradaEstoqueInclude<ExtArgs> | null
  }


  /**
   * Model Pedido
   */

  export type AggregatePedido = {
    _count: PedidoCountAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  export type PedidoMinAggregateOutputType = {
    id_pedido: string | null
    data: Date | null
    status: string | null
    usuarioId: string | null
  }

  export type PedidoMaxAggregateOutputType = {
    id_pedido: string | null
    data: Date | null
    status: string | null
    usuarioId: string | null
  }

  export type PedidoCountAggregateOutputType = {
    id_pedido: number
    data: number
    status: number
    usuarioId: number
    _all: number
  }


  export type PedidoMinAggregateInputType = {
    id_pedido?: true
    data?: true
    status?: true
    usuarioId?: true
  }

  export type PedidoMaxAggregateInputType = {
    id_pedido?: true
    data?: true
    status?: true
    usuarioId?: true
  }

  export type PedidoCountAggregateInputType = {
    id_pedido?: true
    data?: true
    status?: true
    usuarioId?: true
    _all?: true
  }

  export type PedidoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedido to aggregate.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pedidos
    **/
    _count?: true | PedidoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoMaxAggregateInputType
  }

  export type GetPedidoAggregateType<T extends PedidoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedido]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedido[P]>
      : GetScalarType<T[P], AggregatePedido[P]>
  }




  export type PedidoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithAggregationInput | PedidoOrderByWithAggregationInput[]
    by: PedidoScalarFieldEnum[] | PedidoScalarFieldEnum
    having?: PedidoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoCountAggregateInputType | true
    _min?: PedidoMinAggregateInputType
    _max?: PedidoMaxAggregateInputType
  }

  export type PedidoGroupByOutputType = {
    id_pedido: string
    data: Date
    status: string
    usuarioId: string
    _count: PedidoCountAggregateOutputType | null
    _min: PedidoMinAggregateOutputType | null
    _max: PedidoMaxAggregateOutputType | null
  }

  type GetPedidoGroupByPayload<T extends PedidoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pedido?: boolean
    data?: boolean
    status?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    produtos?: boolean | Pedido$produtosArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pedido?: boolean
    data?: boolean
    status?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_pedido?: boolean
    data?: boolean
    status?: boolean
    usuarioId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedido"]>

  export type PedidoSelectScalar = {
    id_pedido?: boolean
    data?: boolean
    status?: boolean
    usuarioId?: boolean
  }

  export type PedidoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_pedido" | "data" | "status" | "usuarioId", ExtArgs["result"]["pedido"]>
  export type PedidoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    produtos?: boolean | Pedido$produtosArgs<ExtArgs>
    _count?: boolean | PedidoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type PedidoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $PedidoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pedido"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      produtos: Prisma.$PedidoProdutoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_pedido: string
      data: Date
      status: string
      usuarioId: string
    }, ExtArgs["result"]["pedido"]>
    composites: {}
  }

  type PedidoGetPayload<S extends boolean | null | undefined | PedidoDefaultArgs> = $Result.GetResult<Prisma.$PedidoPayload, S>

  type PedidoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoCountAggregateInputType | true
    }

  export interface PedidoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pedido'], meta: { name: 'Pedido' } }
    /**
     * Find zero or one Pedido that matches the filter.
     * @param {PedidoFindUniqueArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoFindUniqueArgs>(args: SelectSubset<T, PedidoFindUniqueArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pedido that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoFindUniqueOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoFindFirstArgs>(args?: SelectSubset<T, PedidoFindFirstArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pedido that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindFirstOrThrowArgs} args - Arguments to find a Pedido
     * @example
     * // Get one Pedido
     * const pedido = await prisma.pedido.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pedidos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pedidos
     * const pedidos = await prisma.pedido.findMany()
     * 
     * // Get first 10 Pedidos
     * const pedidos = await prisma.pedido.findMany({ take: 10 })
     * 
     * // Only select the `id_pedido`
     * const pedidoWithId_pedidoOnly = await prisma.pedido.findMany({ select: { id_pedido: true } })
     * 
     */
    findMany<T extends PedidoFindManyArgs>(args?: SelectSubset<T, PedidoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pedido.
     * @param {PedidoCreateArgs} args - Arguments to create a Pedido.
     * @example
     * // Create one Pedido
     * const Pedido = await prisma.pedido.create({
     *   data: {
     *     // ... data to create a Pedido
     *   }
     * })
     * 
     */
    create<T extends PedidoCreateArgs>(args: SelectSubset<T, PedidoCreateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pedidos.
     * @param {PedidoCreateManyArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoCreateManyArgs>(args?: SelectSubset<T, PedidoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pedidos and returns the data saved in the database.
     * @param {PedidoCreateManyAndReturnArgs} args - Arguments to create many Pedidos.
     * @example
     * // Create many Pedidos
     * const pedido = await prisma.pedido.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pedidos and only return the `id_pedido`
     * const pedidoWithId_pedidoOnly = await prisma.pedido.createManyAndReturn({
     *   select: { id_pedido: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pedido.
     * @param {PedidoDeleteArgs} args - Arguments to delete one Pedido.
     * @example
     * // Delete one Pedido
     * const Pedido = await prisma.pedido.delete({
     *   where: {
     *     // ... filter to delete one Pedido
     *   }
     * })
     * 
     */
    delete<T extends PedidoDeleteArgs>(args: SelectSubset<T, PedidoDeleteArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pedido.
     * @param {PedidoUpdateArgs} args - Arguments to update one Pedido.
     * @example
     * // Update one Pedido
     * const pedido = await prisma.pedido.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoUpdateArgs>(args: SelectSubset<T, PedidoUpdateArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pedidos.
     * @param {PedidoDeleteManyArgs} args - Arguments to filter Pedidos to delete.
     * @example
     * // Delete a few Pedidos
     * const { count } = await prisma.pedido.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoDeleteManyArgs>(args?: SelectSubset<T, PedidoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoUpdateManyArgs>(args: SelectSubset<T, PedidoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pedidos and returns the data updated in the database.
     * @param {PedidoUpdateManyAndReturnArgs} args - Arguments to update many Pedidos.
     * @example
     * // Update many Pedidos
     * const pedido = await prisma.pedido.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pedidos and only return the `id_pedido`
     * const pedidoWithId_pedidoOnly = await prisma.pedido.updateManyAndReturn({
     *   select: { id_pedido: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pedido.
     * @param {PedidoUpsertArgs} args - Arguments to update or create a Pedido.
     * @example
     * // Update or create a Pedido
     * const pedido = await prisma.pedido.upsert({
     *   create: {
     *     // ... data to create a Pedido
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pedido we want to update
     *   }
     * })
     */
    upsert<T extends PedidoUpsertArgs>(args: SelectSubset<T, PedidoUpsertArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pedidos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoCountArgs} args - Arguments to filter Pedidos to count.
     * @example
     * // Count the number of Pedidos
     * const count = await prisma.pedido.count({
     *   where: {
     *     // ... the filter for the Pedidos we want to count
     *   }
     * })
    **/
    count<T extends PedidoCountArgs>(
      args?: Subset<T, PedidoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoAggregateArgs>(args: Subset<T, PedidoAggregateArgs>): Prisma.PrismaPromise<GetPedidoAggregateType<T>>

    /**
     * Group by Pedido.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pedido model
   */
  readonly fields: PedidoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pedido.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produtos<T extends Pedido$produtosArgs<ExtArgs> = {}>(args?: Subset<T, Pedido$produtosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pedido model
   */
  interface PedidoFieldRefs {
    readonly id_pedido: FieldRef<"Pedido", 'String'>
    readonly data: FieldRef<"Pedido", 'DateTime'>
    readonly status: FieldRef<"Pedido", 'String'>
    readonly usuarioId: FieldRef<"Pedido", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pedido findUnique
   */
  export type PedidoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findUniqueOrThrow
   */
  export type PedidoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido findFirst
   */
  export type PedidoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findFirstOrThrow
   */
  export type PedidoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedido to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pedidos.
     */
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido findMany
   */
  export type PedidoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter, which Pedidos to fetch.
     */
    where?: PedidoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pedidos to fetch.
     */
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pedidos.
     */
    cursor?: PedidoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pedidos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pedidos.
     */
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Pedido create
   */
  export type PedidoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pedido.
     */
    data: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
  }

  /**
   * Pedido createMany
   */
  export type PedidoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pedido createManyAndReturn
   */
  export type PedidoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to create many Pedidos.
     */
    data: PedidoCreateManyInput | PedidoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedido update
   */
  export type PedidoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pedido.
     */
    data: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
    /**
     * Choose, which Pedido to update.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido updateMany
   */
  export type PedidoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
  }

  /**
   * Pedido updateManyAndReturn
   */
  export type PedidoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * The data used to update Pedidos.
     */
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyInput>
    /**
     * Filter which Pedidos to update
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pedido upsert
   */
  export type PedidoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pedido to update in case it exists.
     */
    where: PedidoWhereUniqueInput
    /**
     * In case the Pedido found by the `where` argument doesn't exist, create a new Pedido with this data.
     */
    create: XOR<PedidoCreateInput, PedidoUncheckedCreateInput>
    /**
     * In case the Pedido was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoUpdateInput, PedidoUncheckedUpdateInput>
  }

  /**
   * Pedido delete
   */
  export type PedidoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    /**
     * Filter which Pedido to delete.
     */
    where: PedidoWhereUniqueInput
  }

  /**
   * Pedido deleteMany
   */
  export type PedidoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pedidos to delete
     */
    where?: PedidoWhereInput
    /**
     * Limit how many Pedidos to delete.
     */
    limit?: number
  }

  /**
   * Pedido.produtos
   */
  export type Pedido$produtosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    where?: PedidoProdutoWhereInput
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    cursor?: PedidoProdutoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoProdutoScalarFieldEnum | PedidoProdutoScalarFieldEnum[]
  }

  /**
   * Pedido without action
   */
  export type PedidoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
  }


  /**
   * Model PedidoProduto
   */

  export type AggregatePedidoProduto = {
    _count: PedidoProdutoCountAggregateOutputType | null
    _avg: PedidoProdutoAvgAggregateOutputType | null
    _sum: PedidoProdutoSumAggregateOutputType | null
    _min: PedidoProdutoMinAggregateOutputType | null
    _max: PedidoProdutoMaxAggregateOutputType | null
  }

  export type PedidoProdutoAvgAggregateOutputType = {
    quantidade: number | null
  }

  export type PedidoProdutoSumAggregateOutputType = {
    quantidade: number | null
  }

  export type PedidoProdutoMinAggregateOutputType = {
    id: string | null
    quantidade: number | null
    produtoId: string | null
    pedidoId: string | null
  }

  export type PedidoProdutoMaxAggregateOutputType = {
    id: string | null
    quantidade: number | null
    produtoId: string | null
    pedidoId: string | null
  }

  export type PedidoProdutoCountAggregateOutputType = {
    id: number
    quantidade: number
    produtoId: number
    pedidoId: number
    _all: number
  }


  export type PedidoProdutoAvgAggregateInputType = {
    quantidade?: true
  }

  export type PedidoProdutoSumAggregateInputType = {
    quantidade?: true
  }

  export type PedidoProdutoMinAggregateInputType = {
    id?: true
    quantidade?: true
    produtoId?: true
    pedidoId?: true
  }

  export type PedidoProdutoMaxAggregateInputType = {
    id?: true
    quantidade?: true
    produtoId?: true
    pedidoId?: true
  }

  export type PedidoProdutoCountAggregateInputType = {
    id?: true
    quantidade?: true
    produtoId?: true
    pedidoId?: true
    _all?: true
  }

  export type PedidoProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoProduto to aggregate.
     */
    where?: PedidoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoProdutos to fetch.
     */
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PedidoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoProdutos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoProdutos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PedidoProdutos
    **/
    _count?: true | PedidoProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PedidoProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PedidoProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PedidoProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PedidoProdutoMaxAggregateInputType
  }

  export type GetPedidoProdutoAggregateType<T extends PedidoProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregatePedidoProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePedidoProduto[P]>
      : GetScalarType<T[P], AggregatePedidoProduto[P]>
  }




  export type PedidoProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PedidoProdutoWhereInput
    orderBy?: PedidoProdutoOrderByWithAggregationInput | PedidoProdutoOrderByWithAggregationInput[]
    by: PedidoProdutoScalarFieldEnum[] | PedidoProdutoScalarFieldEnum
    having?: PedidoProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PedidoProdutoCountAggregateInputType | true
    _avg?: PedidoProdutoAvgAggregateInputType
    _sum?: PedidoProdutoSumAggregateInputType
    _min?: PedidoProdutoMinAggregateInputType
    _max?: PedidoProdutoMaxAggregateInputType
  }

  export type PedidoProdutoGroupByOutputType = {
    id: string
    quantidade: number
    produtoId: string
    pedidoId: string
    _count: PedidoProdutoCountAggregateOutputType | null
    _avg: PedidoProdutoAvgAggregateOutputType | null
    _sum: PedidoProdutoSumAggregateOutputType | null
    _min: PedidoProdutoMinAggregateOutputType | null
    _max: PedidoProdutoMaxAggregateOutputType | null
  }

  type GetPedidoProdutoGroupByPayload<T extends PedidoProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PedidoProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PedidoProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PedidoProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], PedidoProdutoGroupByOutputType[P]>
        }
      >
    >


  export type PedidoProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    produtoId?: boolean
    pedidoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoProduto"]>

  export type PedidoProdutoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    produtoId?: boolean
    pedidoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoProduto"]>

  export type PedidoProdutoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    produtoId?: boolean
    pedidoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pedidoProduto"]>

  export type PedidoProdutoSelectScalar = {
    id?: boolean
    quantidade?: boolean
    produtoId?: boolean
    pedidoId?: boolean
  }

  export type PedidoProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantidade" | "produtoId" | "pedidoId", ExtArgs["result"]["pedidoProduto"]>
  export type PedidoProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoProdutoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }
  export type PedidoProdutoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    pedido?: boolean | PedidoDefaultArgs<ExtArgs>
  }

  export type $PedidoProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PedidoProduto"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
      pedido: Prisma.$PedidoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      quantidade: number
      produtoId: string
      pedidoId: string
    }, ExtArgs["result"]["pedidoProduto"]>
    composites: {}
  }

  type PedidoProdutoGetPayload<S extends boolean | null | undefined | PedidoProdutoDefaultArgs> = $Result.GetResult<Prisma.$PedidoProdutoPayload, S>

  type PedidoProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PedidoProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PedidoProdutoCountAggregateInputType | true
    }

  export interface PedidoProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PedidoProduto'], meta: { name: 'PedidoProduto' } }
    /**
     * Find zero or one PedidoProduto that matches the filter.
     * @param {PedidoProdutoFindUniqueArgs} args - Arguments to find a PedidoProduto
     * @example
     * // Get one PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PedidoProdutoFindUniqueArgs>(args: SelectSubset<T, PedidoProdutoFindUniqueArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PedidoProduto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PedidoProdutoFindUniqueOrThrowArgs} args - Arguments to find a PedidoProduto
     * @example
     * // Get one PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PedidoProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, PedidoProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoProduto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoFindFirstArgs} args - Arguments to find a PedidoProduto
     * @example
     * // Get one PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PedidoProdutoFindFirstArgs>(args?: SelectSubset<T, PedidoProdutoFindFirstArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PedidoProduto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoFindFirstOrThrowArgs} args - Arguments to find a PedidoProduto
     * @example
     * // Get one PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PedidoProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, PedidoProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PedidoProdutos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PedidoProdutos
     * const pedidoProdutos = await prisma.pedidoProduto.findMany()
     * 
     * // Get first 10 PedidoProdutos
     * const pedidoProdutos = await prisma.pedidoProduto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pedidoProdutoWithIdOnly = await prisma.pedidoProduto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PedidoProdutoFindManyArgs>(args?: SelectSubset<T, PedidoProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PedidoProduto.
     * @param {PedidoProdutoCreateArgs} args - Arguments to create a PedidoProduto.
     * @example
     * // Create one PedidoProduto
     * const PedidoProduto = await prisma.pedidoProduto.create({
     *   data: {
     *     // ... data to create a PedidoProduto
     *   }
     * })
     * 
     */
    create<T extends PedidoProdutoCreateArgs>(args: SelectSubset<T, PedidoProdutoCreateArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PedidoProdutos.
     * @param {PedidoProdutoCreateManyArgs} args - Arguments to create many PedidoProdutos.
     * @example
     * // Create many PedidoProdutos
     * const pedidoProduto = await prisma.pedidoProduto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PedidoProdutoCreateManyArgs>(args?: SelectSubset<T, PedidoProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PedidoProdutos and returns the data saved in the database.
     * @param {PedidoProdutoCreateManyAndReturnArgs} args - Arguments to create many PedidoProdutos.
     * @example
     * // Create many PedidoProdutos
     * const pedidoProduto = await prisma.pedidoProduto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PedidoProdutos and only return the `id`
     * const pedidoProdutoWithIdOnly = await prisma.pedidoProduto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PedidoProdutoCreateManyAndReturnArgs>(args?: SelectSubset<T, PedidoProdutoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PedidoProduto.
     * @param {PedidoProdutoDeleteArgs} args - Arguments to delete one PedidoProduto.
     * @example
     * // Delete one PedidoProduto
     * const PedidoProduto = await prisma.pedidoProduto.delete({
     *   where: {
     *     // ... filter to delete one PedidoProduto
     *   }
     * })
     * 
     */
    delete<T extends PedidoProdutoDeleteArgs>(args: SelectSubset<T, PedidoProdutoDeleteArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PedidoProduto.
     * @param {PedidoProdutoUpdateArgs} args - Arguments to update one PedidoProduto.
     * @example
     * // Update one PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PedidoProdutoUpdateArgs>(args: SelectSubset<T, PedidoProdutoUpdateArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PedidoProdutos.
     * @param {PedidoProdutoDeleteManyArgs} args - Arguments to filter PedidoProdutos to delete.
     * @example
     * // Delete a few PedidoProdutos
     * const { count } = await prisma.pedidoProduto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PedidoProdutoDeleteManyArgs>(args?: SelectSubset<T, PedidoProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PedidoProdutos
     * const pedidoProduto = await prisma.pedidoProduto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PedidoProdutoUpdateManyArgs>(args: SelectSubset<T, PedidoProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PedidoProdutos and returns the data updated in the database.
     * @param {PedidoProdutoUpdateManyAndReturnArgs} args - Arguments to update many PedidoProdutos.
     * @example
     * // Update many PedidoProdutos
     * const pedidoProduto = await prisma.pedidoProduto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PedidoProdutos and only return the `id`
     * const pedidoProdutoWithIdOnly = await prisma.pedidoProduto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PedidoProdutoUpdateManyAndReturnArgs>(args: SelectSubset<T, PedidoProdutoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PedidoProduto.
     * @param {PedidoProdutoUpsertArgs} args - Arguments to update or create a PedidoProduto.
     * @example
     * // Update or create a PedidoProduto
     * const pedidoProduto = await prisma.pedidoProduto.upsert({
     *   create: {
     *     // ... data to create a PedidoProduto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PedidoProduto we want to update
     *   }
     * })
     */
    upsert<T extends PedidoProdutoUpsertArgs>(args: SelectSubset<T, PedidoProdutoUpsertArgs<ExtArgs>>): Prisma__PedidoProdutoClient<$Result.GetResult<Prisma.$PedidoProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PedidoProdutos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoCountArgs} args - Arguments to filter PedidoProdutos to count.
     * @example
     * // Count the number of PedidoProdutos
     * const count = await prisma.pedidoProduto.count({
     *   where: {
     *     // ... the filter for the PedidoProdutos we want to count
     *   }
     * })
    **/
    count<T extends PedidoProdutoCountArgs>(
      args?: Subset<T, PedidoProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PedidoProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PedidoProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PedidoProdutoAggregateArgs>(args: Subset<T, PedidoProdutoAggregateArgs>): Prisma.PrismaPromise<GetPedidoProdutoAggregateType<T>>

    /**
     * Group by PedidoProduto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PedidoProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PedidoProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PedidoProdutoGroupByArgs['orderBy'] }
        : { orderBy?: PedidoProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PedidoProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPedidoProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PedidoProduto model
   */
  readonly fields: PedidoProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PedidoProduto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PedidoProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pedido<T extends PedidoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PedidoDefaultArgs<ExtArgs>>): Prisma__PedidoClient<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PedidoProduto model
   */
  interface PedidoProdutoFieldRefs {
    readonly id: FieldRef<"PedidoProduto", 'String'>
    readonly quantidade: FieldRef<"PedidoProduto", 'Int'>
    readonly produtoId: FieldRef<"PedidoProduto", 'String'>
    readonly pedidoId: FieldRef<"PedidoProduto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PedidoProduto findUnique
   */
  export type PedidoProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter, which PedidoProduto to fetch.
     */
    where: PedidoProdutoWhereUniqueInput
  }

  /**
   * PedidoProduto findUniqueOrThrow
   */
  export type PedidoProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter, which PedidoProduto to fetch.
     */
    where: PedidoProdutoWhereUniqueInput
  }

  /**
   * PedidoProduto findFirst
   */
  export type PedidoProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter, which PedidoProduto to fetch.
     */
    where?: PedidoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoProdutos to fetch.
     */
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoProdutos.
     */
    cursor?: PedidoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoProdutos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoProdutos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoProdutos.
     */
    distinct?: PedidoProdutoScalarFieldEnum | PedidoProdutoScalarFieldEnum[]
  }

  /**
   * PedidoProduto findFirstOrThrow
   */
  export type PedidoProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter, which PedidoProduto to fetch.
     */
    where?: PedidoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoProdutos to fetch.
     */
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PedidoProdutos.
     */
    cursor?: PedidoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoProdutos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoProdutos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PedidoProdutos.
     */
    distinct?: PedidoProdutoScalarFieldEnum | PedidoProdutoScalarFieldEnum[]
  }

  /**
   * PedidoProduto findMany
   */
  export type PedidoProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter, which PedidoProdutos to fetch.
     */
    where?: PedidoProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PedidoProdutos to fetch.
     */
    orderBy?: PedidoProdutoOrderByWithRelationInput | PedidoProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PedidoProdutos.
     */
    cursor?: PedidoProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PedidoProdutos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PedidoProdutos.
     */
    skip?: number
    distinct?: PedidoProdutoScalarFieldEnum | PedidoProdutoScalarFieldEnum[]
  }

  /**
   * PedidoProduto create
   */
  export type PedidoProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a PedidoProduto.
     */
    data: XOR<PedidoProdutoCreateInput, PedidoProdutoUncheckedCreateInput>
  }

  /**
   * PedidoProduto createMany
   */
  export type PedidoProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PedidoProdutos.
     */
    data: PedidoProdutoCreateManyInput | PedidoProdutoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PedidoProduto createManyAndReturn
   */
  export type PedidoProdutoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * The data used to create many PedidoProdutos.
     */
    data: PedidoProdutoCreateManyInput | PedidoProdutoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoProduto update
   */
  export type PedidoProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a PedidoProduto.
     */
    data: XOR<PedidoProdutoUpdateInput, PedidoProdutoUncheckedUpdateInput>
    /**
     * Choose, which PedidoProduto to update.
     */
    where: PedidoProdutoWhereUniqueInput
  }

  /**
   * PedidoProduto updateMany
   */
  export type PedidoProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PedidoProdutos.
     */
    data: XOR<PedidoProdutoUpdateManyMutationInput, PedidoProdutoUncheckedUpdateManyInput>
    /**
     * Filter which PedidoProdutos to update
     */
    where?: PedidoProdutoWhereInput
    /**
     * Limit how many PedidoProdutos to update.
     */
    limit?: number
  }

  /**
   * PedidoProduto updateManyAndReturn
   */
  export type PedidoProdutoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * The data used to update PedidoProdutos.
     */
    data: XOR<PedidoProdutoUpdateManyMutationInput, PedidoProdutoUncheckedUpdateManyInput>
    /**
     * Filter which PedidoProdutos to update
     */
    where?: PedidoProdutoWhereInput
    /**
     * Limit how many PedidoProdutos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PedidoProduto upsert
   */
  export type PedidoProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the PedidoProduto to update in case it exists.
     */
    where: PedidoProdutoWhereUniqueInput
    /**
     * In case the PedidoProduto found by the `where` argument doesn't exist, create a new PedidoProduto with this data.
     */
    create: XOR<PedidoProdutoCreateInput, PedidoProdutoUncheckedCreateInput>
    /**
     * In case the PedidoProduto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PedidoProdutoUpdateInput, PedidoProdutoUncheckedUpdateInput>
  }

  /**
   * PedidoProduto delete
   */
  export type PedidoProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
    /**
     * Filter which PedidoProduto to delete.
     */
    where: PedidoProdutoWhereUniqueInput
  }

  /**
   * PedidoProduto deleteMany
   */
  export type PedidoProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PedidoProdutos to delete
     */
    where?: PedidoProdutoWhereInput
    /**
     * Limit how many PedidoProdutos to delete.
     */
    limit?: number
  }

  /**
   * PedidoProduto without action
   */
  export type PedidoProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PedidoProduto
     */
    select?: PedidoProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PedidoProduto
     */
    omit?: PedidoProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoProdutoInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id_usuario: string | null
    nome: string | null
    email: string | null
    senha: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id_usuario: string | null
    nome: string | null
    email: string | null
    senha: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    id_usuario: number
    nome: number
    email: number
    senha: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
  }

  export type UsuarioCountAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id_usuario: string
    nome: string
    email: string
    senha: string
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>
    notificacoes?: boolean | Usuario$notificacoesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_usuario" | "nome" | "email" | "senha", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pedidos?: boolean | Usuario$pedidosArgs<ExtArgs>
    notificacoes?: boolean | Usuario$notificacoesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      pedidos: Prisma.$PedidoPayload<ExtArgs>[]
      notificacoes: Prisma.$NotificacaoUsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_usuario: string
      nome: string
      email: string
      senha: string
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.findMany({ select: { id_usuario: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id_usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id_usuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pedidos<T extends Usuario$pedidosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$pedidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PedidoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificacoes<T extends Usuario$notificacoesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$notificacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id_usuario: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.pedidos
   */
  export type Usuario$pedidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pedido
     */
    select?: PedidoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pedido
     */
    omit?: PedidoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PedidoInclude<ExtArgs> | null
    where?: PedidoWhereInput
    orderBy?: PedidoOrderByWithRelationInput | PedidoOrderByWithRelationInput[]
    cursor?: PedidoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PedidoScalarFieldEnum | PedidoScalarFieldEnum[]
  }

  /**
   * Usuario.notificacoes
   */
  export type Usuario$notificacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    where?: NotificacaoUsuarioWhereInput
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    cursor?: NotificacaoUsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacaoUsuarioScalarFieldEnum | NotificacaoUsuarioScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Notificacao
   */

  export type AggregateNotificacao = {
    _count: NotificacaoCountAggregateOutputType | null
    _min: NotificacaoMinAggregateOutputType | null
    _max: NotificacaoMaxAggregateOutputType | null
  }

  export type NotificacaoMinAggregateOutputType = {
    id_notificacao: string | null
    mensagem: string | null
    dataEnvio: Date | null
  }

  export type NotificacaoMaxAggregateOutputType = {
    id_notificacao: string | null
    mensagem: string | null
    dataEnvio: Date | null
  }

  export type NotificacaoCountAggregateOutputType = {
    id_notificacao: number
    mensagem: number
    dataEnvio: number
    _all: number
  }


  export type NotificacaoMinAggregateInputType = {
    id_notificacao?: true
    mensagem?: true
    dataEnvio?: true
  }

  export type NotificacaoMaxAggregateInputType = {
    id_notificacao?: true
    mensagem?: true
    dataEnvio?: true
  }

  export type NotificacaoCountAggregateInputType = {
    id_notificacao?: true
    mensagem?: true
    dataEnvio?: true
    _all?: true
  }

  export type NotificacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacao to aggregate.
     */
    where?: NotificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacaos to fetch.
     */
    orderBy?: NotificacaoOrderByWithRelationInput | NotificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notificacaos
    **/
    _count?: true | NotificacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificacaoMaxAggregateInputType
  }

  export type GetNotificacaoAggregateType<T extends NotificacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificacao[P]>
      : GetScalarType<T[P], AggregateNotificacao[P]>
  }




  export type NotificacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacaoWhereInput
    orderBy?: NotificacaoOrderByWithAggregationInput | NotificacaoOrderByWithAggregationInput[]
    by: NotificacaoScalarFieldEnum[] | NotificacaoScalarFieldEnum
    having?: NotificacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificacaoCountAggregateInputType | true
    _min?: NotificacaoMinAggregateInputType
    _max?: NotificacaoMaxAggregateInputType
  }

  export type NotificacaoGroupByOutputType = {
    id_notificacao: string
    mensagem: string
    dataEnvio: Date
    _count: NotificacaoCountAggregateOutputType | null
    _min: NotificacaoMinAggregateOutputType | null
    _max: NotificacaoMaxAggregateOutputType | null
  }

  type GetNotificacaoGroupByPayload<T extends NotificacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificacaoGroupByOutputType[P]>
            : GetScalarType<T[P], NotificacaoGroupByOutputType[P]>
        }
      >
    >


  export type NotificacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notificacao?: boolean
    mensagem?: boolean
    dataEnvio?: boolean
    usuarios?: boolean | Notificacao$usuariosArgs<ExtArgs>
    _count?: boolean | NotificacaoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacao"]>

  export type NotificacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notificacao?: boolean
    mensagem?: boolean
    dataEnvio?: boolean
  }, ExtArgs["result"]["notificacao"]>

  export type NotificacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_notificacao?: boolean
    mensagem?: boolean
    dataEnvio?: boolean
  }, ExtArgs["result"]["notificacao"]>

  export type NotificacaoSelectScalar = {
    id_notificacao?: boolean
    mensagem?: boolean
    dataEnvio?: boolean
  }

  export type NotificacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_notificacao" | "mensagem" | "dataEnvio", ExtArgs["result"]["notificacao"]>
  export type NotificacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | Notificacao$usuariosArgs<ExtArgs>
    _count?: boolean | NotificacaoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NotificacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NotificacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NotificacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notificacao"
    objects: {
      usuarios: Prisma.$NotificacaoUsuarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_notificacao: string
      mensagem: string
      dataEnvio: Date
    }, ExtArgs["result"]["notificacao"]>
    composites: {}
  }

  type NotificacaoGetPayload<S extends boolean | null | undefined | NotificacaoDefaultArgs> = $Result.GetResult<Prisma.$NotificacaoPayload, S>

  type NotificacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificacaoCountAggregateInputType | true
    }

  export interface NotificacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notificacao'], meta: { name: 'Notificacao' } }
    /**
     * Find zero or one Notificacao that matches the filter.
     * @param {NotificacaoFindUniqueArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificacaoFindUniqueArgs>(args: SelectSubset<T, NotificacaoFindUniqueArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notificacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificacaoFindUniqueOrThrowArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoFindFirstArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificacaoFindFirstArgs>(args?: SelectSubset<T, NotificacaoFindFirstArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notificacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoFindFirstOrThrowArgs} args - Arguments to find a Notificacao
     * @example
     * // Get one Notificacao
     * const notificacao = await prisma.notificacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notificacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notificacaos
     * const notificacaos = await prisma.notificacao.findMany()
     * 
     * // Get first 10 Notificacaos
     * const notificacaos = await prisma.notificacao.findMany({ take: 10 })
     * 
     * // Only select the `id_notificacao`
     * const notificacaoWithId_notificacaoOnly = await prisma.notificacao.findMany({ select: { id_notificacao: true } })
     * 
     */
    findMany<T extends NotificacaoFindManyArgs>(args?: SelectSubset<T, NotificacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notificacao.
     * @param {NotificacaoCreateArgs} args - Arguments to create a Notificacao.
     * @example
     * // Create one Notificacao
     * const Notificacao = await prisma.notificacao.create({
     *   data: {
     *     // ... data to create a Notificacao
     *   }
     * })
     * 
     */
    create<T extends NotificacaoCreateArgs>(args: SelectSubset<T, NotificacaoCreateArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notificacaos.
     * @param {NotificacaoCreateManyArgs} args - Arguments to create many Notificacaos.
     * @example
     * // Create many Notificacaos
     * const notificacao = await prisma.notificacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificacaoCreateManyArgs>(args?: SelectSubset<T, NotificacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notificacaos and returns the data saved in the database.
     * @param {NotificacaoCreateManyAndReturnArgs} args - Arguments to create many Notificacaos.
     * @example
     * // Create many Notificacaos
     * const notificacao = await prisma.notificacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notificacaos and only return the `id_notificacao`
     * const notificacaoWithId_notificacaoOnly = await prisma.notificacao.createManyAndReturn({
     *   select: { id_notificacao: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notificacao.
     * @param {NotificacaoDeleteArgs} args - Arguments to delete one Notificacao.
     * @example
     * // Delete one Notificacao
     * const Notificacao = await prisma.notificacao.delete({
     *   where: {
     *     // ... filter to delete one Notificacao
     *   }
     * })
     * 
     */
    delete<T extends NotificacaoDeleteArgs>(args: SelectSubset<T, NotificacaoDeleteArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notificacao.
     * @param {NotificacaoUpdateArgs} args - Arguments to update one Notificacao.
     * @example
     * // Update one Notificacao
     * const notificacao = await prisma.notificacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificacaoUpdateArgs>(args: SelectSubset<T, NotificacaoUpdateArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notificacaos.
     * @param {NotificacaoDeleteManyArgs} args - Arguments to filter Notificacaos to delete.
     * @example
     * // Delete a few Notificacaos
     * const { count } = await prisma.notificacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificacaoDeleteManyArgs>(args?: SelectSubset<T, NotificacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notificacaos
     * const notificacao = await prisma.notificacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificacaoUpdateManyArgs>(args: SelectSubset<T, NotificacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notificacaos and returns the data updated in the database.
     * @param {NotificacaoUpdateManyAndReturnArgs} args - Arguments to update many Notificacaos.
     * @example
     * // Update many Notificacaos
     * const notificacao = await prisma.notificacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notificacaos and only return the `id_notificacao`
     * const notificacaoWithId_notificacaoOnly = await prisma.notificacao.updateManyAndReturn({
     *   select: { id_notificacao: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notificacao.
     * @param {NotificacaoUpsertArgs} args - Arguments to update or create a Notificacao.
     * @example
     * // Update or create a Notificacao
     * const notificacao = await prisma.notificacao.upsert({
     *   create: {
     *     // ... data to create a Notificacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notificacao we want to update
     *   }
     * })
     */
    upsert<T extends NotificacaoUpsertArgs>(args: SelectSubset<T, NotificacaoUpsertArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notificacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoCountArgs} args - Arguments to filter Notificacaos to count.
     * @example
     * // Count the number of Notificacaos
     * const count = await prisma.notificacao.count({
     *   where: {
     *     // ... the filter for the Notificacaos we want to count
     *   }
     * })
    **/
    count<T extends NotificacaoCountArgs>(
      args?: Subset<T, NotificacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notificacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificacaoAggregateArgs>(args: Subset<T, NotificacaoAggregateArgs>): Prisma.PrismaPromise<GetNotificacaoAggregateType<T>>

    /**
     * Group by Notificacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificacaoGroupByArgs['orderBy'] }
        : { orderBy?: NotificacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notificacao model
   */
  readonly fields: NotificacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notificacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends Notificacao$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Notificacao$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notificacao model
   */
  interface NotificacaoFieldRefs {
    readonly id_notificacao: FieldRef<"Notificacao", 'String'>
    readonly mensagem: FieldRef<"Notificacao", 'String'>
    readonly dataEnvio: FieldRef<"Notificacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notificacao findUnique
   */
  export type NotificacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter, which Notificacao to fetch.
     */
    where: NotificacaoWhereUniqueInput
  }

  /**
   * Notificacao findUniqueOrThrow
   */
  export type NotificacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter, which Notificacao to fetch.
     */
    where: NotificacaoWhereUniqueInput
  }

  /**
   * Notificacao findFirst
   */
  export type NotificacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter, which Notificacao to fetch.
     */
    where?: NotificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacaos to fetch.
     */
    orderBy?: NotificacaoOrderByWithRelationInput | NotificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacaos.
     */
    cursor?: NotificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacaos.
     */
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * Notificacao findFirstOrThrow
   */
  export type NotificacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter, which Notificacao to fetch.
     */
    where?: NotificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacaos to fetch.
     */
    orderBy?: NotificacaoOrderByWithRelationInput | NotificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notificacaos.
     */
    cursor?: NotificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notificacaos.
     */
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * Notificacao findMany
   */
  export type NotificacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter, which Notificacaos to fetch.
     */
    where?: NotificacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notificacaos to fetch.
     */
    orderBy?: NotificacaoOrderByWithRelationInput | NotificacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notificacaos.
     */
    cursor?: NotificacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notificacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notificacaos.
     */
    skip?: number
    distinct?: NotificacaoScalarFieldEnum | NotificacaoScalarFieldEnum[]
  }

  /**
   * Notificacao create
   */
  export type NotificacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Notificacao.
     */
    data: XOR<NotificacaoCreateInput, NotificacaoUncheckedCreateInput>
  }

  /**
   * Notificacao createMany
   */
  export type NotificacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notificacaos.
     */
    data: NotificacaoCreateManyInput | NotificacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notificacao createManyAndReturn
   */
  export type NotificacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Notificacaos.
     */
    data: NotificacaoCreateManyInput | NotificacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notificacao update
   */
  export type NotificacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Notificacao.
     */
    data: XOR<NotificacaoUpdateInput, NotificacaoUncheckedUpdateInput>
    /**
     * Choose, which Notificacao to update.
     */
    where: NotificacaoWhereUniqueInput
  }

  /**
   * Notificacao updateMany
   */
  export type NotificacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notificacaos.
     */
    data: XOR<NotificacaoUpdateManyMutationInput, NotificacaoUncheckedUpdateManyInput>
    /**
     * Filter which Notificacaos to update
     */
    where?: NotificacaoWhereInput
    /**
     * Limit how many Notificacaos to update.
     */
    limit?: number
  }

  /**
   * Notificacao updateManyAndReturn
   */
  export type NotificacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * The data used to update Notificacaos.
     */
    data: XOR<NotificacaoUpdateManyMutationInput, NotificacaoUncheckedUpdateManyInput>
    /**
     * Filter which Notificacaos to update
     */
    where?: NotificacaoWhereInput
    /**
     * Limit how many Notificacaos to update.
     */
    limit?: number
  }

  /**
   * Notificacao upsert
   */
  export type NotificacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Notificacao to update in case it exists.
     */
    where: NotificacaoWhereUniqueInput
    /**
     * In case the Notificacao found by the `where` argument doesn't exist, create a new Notificacao with this data.
     */
    create: XOR<NotificacaoCreateInput, NotificacaoUncheckedCreateInput>
    /**
     * In case the Notificacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificacaoUpdateInput, NotificacaoUncheckedUpdateInput>
  }

  /**
   * Notificacao delete
   */
  export type NotificacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
    /**
     * Filter which Notificacao to delete.
     */
    where: NotificacaoWhereUniqueInput
  }

  /**
   * Notificacao deleteMany
   */
  export type NotificacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notificacaos to delete
     */
    where?: NotificacaoWhereInput
    /**
     * Limit how many Notificacaos to delete.
     */
    limit?: number
  }

  /**
   * Notificacao.usuarios
   */
  export type Notificacao$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    where?: NotificacaoUsuarioWhereInput
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    cursor?: NotificacaoUsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificacaoUsuarioScalarFieldEnum | NotificacaoUsuarioScalarFieldEnum[]
  }

  /**
   * Notificacao without action
   */
  export type NotificacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notificacao
     */
    select?: NotificacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notificacao
     */
    omit?: NotificacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoInclude<ExtArgs> | null
  }


  /**
   * Model NotificacaoUsuario
   */

  export type AggregateNotificacaoUsuario = {
    _count: NotificacaoUsuarioCountAggregateOutputType | null
    _min: NotificacaoUsuarioMinAggregateOutputType | null
    _max: NotificacaoUsuarioMaxAggregateOutputType | null
  }

  export type NotificacaoUsuarioMinAggregateOutputType = {
    id: string | null
    usuarioId: string | null
    notificacaoId: string | null
  }

  export type NotificacaoUsuarioMaxAggregateOutputType = {
    id: string | null
    usuarioId: string | null
    notificacaoId: string | null
  }

  export type NotificacaoUsuarioCountAggregateOutputType = {
    id: number
    usuarioId: number
    notificacaoId: number
    _all: number
  }


  export type NotificacaoUsuarioMinAggregateInputType = {
    id?: true
    usuarioId?: true
    notificacaoId?: true
  }

  export type NotificacaoUsuarioMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    notificacaoId?: true
  }

  export type NotificacaoUsuarioCountAggregateInputType = {
    id?: true
    usuarioId?: true
    notificacaoId?: true
    _all?: true
  }

  export type NotificacaoUsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificacaoUsuario to aggregate.
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificacaoUsuarios to fetch.
     */
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificacaoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificacaoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificacaoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificacaoUsuarios
    **/
    _count?: true | NotificacaoUsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificacaoUsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificacaoUsuarioMaxAggregateInputType
  }

  export type GetNotificacaoUsuarioAggregateType<T extends NotificacaoUsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificacaoUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificacaoUsuario[P]>
      : GetScalarType<T[P], AggregateNotificacaoUsuario[P]>
  }




  export type NotificacaoUsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificacaoUsuarioWhereInput
    orderBy?: NotificacaoUsuarioOrderByWithAggregationInput | NotificacaoUsuarioOrderByWithAggregationInput[]
    by: NotificacaoUsuarioScalarFieldEnum[] | NotificacaoUsuarioScalarFieldEnum
    having?: NotificacaoUsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificacaoUsuarioCountAggregateInputType | true
    _min?: NotificacaoUsuarioMinAggregateInputType
    _max?: NotificacaoUsuarioMaxAggregateInputType
  }

  export type NotificacaoUsuarioGroupByOutputType = {
    id: string
    usuarioId: string
    notificacaoId: string
    _count: NotificacaoUsuarioCountAggregateOutputType | null
    _min: NotificacaoUsuarioMinAggregateOutputType | null
    _max: NotificacaoUsuarioMaxAggregateOutputType | null
  }

  type GetNotificacaoUsuarioGroupByPayload<T extends NotificacaoUsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificacaoUsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificacaoUsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificacaoUsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], NotificacaoUsuarioGroupByOutputType[P]>
        }
      >
    >


  export type NotificacaoUsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    notificacaoId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacaoUsuario"]>

  export type NotificacaoUsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    notificacaoId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacaoUsuario"]>

  export type NotificacaoUsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    notificacaoId?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificacaoUsuario"]>

  export type NotificacaoUsuarioSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    notificacaoId?: boolean
  }

  export type NotificacaoUsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuarioId" | "notificacaoId", ExtArgs["result"]["notificacaoUsuario"]>
  export type NotificacaoUsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }
  export type NotificacaoUsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }
  export type NotificacaoUsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    notificacao?: boolean | NotificacaoDefaultArgs<ExtArgs>
  }

  export type $NotificacaoUsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificacaoUsuario"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      notificacao: Prisma.$NotificacaoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      usuarioId: string
      notificacaoId: string
    }, ExtArgs["result"]["notificacaoUsuario"]>
    composites: {}
  }

  type NotificacaoUsuarioGetPayload<S extends boolean | null | undefined | NotificacaoUsuarioDefaultArgs> = $Result.GetResult<Prisma.$NotificacaoUsuarioPayload, S>

  type NotificacaoUsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificacaoUsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificacaoUsuarioCountAggregateInputType | true
    }

  export interface NotificacaoUsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificacaoUsuario'], meta: { name: 'NotificacaoUsuario' } }
    /**
     * Find zero or one NotificacaoUsuario that matches the filter.
     * @param {NotificacaoUsuarioFindUniqueArgs} args - Arguments to find a NotificacaoUsuario
     * @example
     * // Get one NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificacaoUsuarioFindUniqueArgs>(args: SelectSubset<T, NotificacaoUsuarioFindUniqueArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificacaoUsuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificacaoUsuarioFindUniqueOrThrowArgs} args - Arguments to find a NotificacaoUsuario
     * @example
     * // Get one NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificacaoUsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificacaoUsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificacaoUsuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioFindFirstArgs} args - Arguments to find a NotificacaoUsuario
     * @example
     * // Get one NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificacaoUsuarioFindFirstArgs>(args?: SelectSubset<T, NotificacaoUsuarioFindFirstArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificacaoUsuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioFindFirstOrThrowArgs} args - Arguments to find a NotificacaoUsuario
     * @example
     * // Get one NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificacaoUsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificacaoUsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificacaoUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificacaoUsuarios
     * const notificacaoUsuarios = await prisma.notificacaoUsuario.findMany()
     * 
     * // Get first 10 NotificacaoUsuarios
     * const notificacaoUsuarios = await prisma.notificacaoUsuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificacaoUsuarioWithIdOnly = await prisma.notificacaoUsuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificacaoUsuarioFindManyArgs>(args?: SelectSubset<T, NotificacaoUsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificacaoUsuario.
     * @param {NotificacaoUsuarioCreateArgs} args - Arguments to create a NotificacaoUsuario.
     * @example
     * // Create one NotificacaoUsuario
     * const NotificacaoUsuario = await prisma.notificacaoUsuario.create({
     *   data: {
     *     // ... data to create a NotificacaoUsuario
     *   }
     * })
     * 
     */
    create<T extends NotificacaoUsuarioCreateArgs>(args: SelectSubset<T, NotificacaoUsuarioCreateArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificacaoUsuarios.
     * @param {NotificacaoUsuarioCreateManyArgs} args - Arguments to create many NotificacaoUsuarios.
     * @example
     * // Create many NotificacaoUsuarios
     * const notificacaoUsuario = await prisma.notificacaoUsuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificacaoUsuarioCreateManyArgs>(args?: SelectSubset<T, NotificacaoUsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificacaoUsuarios and returns the data saved in the database.
     * @param {NotificacaoUsuarioCreateManyAndReturnArgs} args - Arguments to create many NotificacaoUsuarios.
     * @example
     * // Create many NotificacaoUsuarios
     * const notificacaoUsuario = await prisma.notificacaoUsuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificacaoUsuarios and only return the `id`
     * const notificacaoUsuarioWithIdOnly = await prisma.notificacaoUsuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificacaoUsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificacaoUsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificacaoUsuario.
     * @param {NotificacaoUsuarioDeleteArgs} args - Arguments to delete one NotificacaoUsuario.
     * @example
     * // Delete one NotificacaoUsuario
     * const NotificacaoUsuario = await prisma.notificacaoUsuario.delete({
     *   where: {
     *     // ... filter to delete one NotificacaoUsuario
     *   }
     * })
     * 
     */
    delete<T extends NotificacaoUsuarioDeleteArgs>(args: SelectSubset<T, NotificacaoUsuarioDeleteArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificacaoUsuario.
     * @param {NotificacaoUsuarioUpdateArgs} args - Arguments to update one NotificacaoUsuario.
     * @example
     * // Update one NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificacaoUsuarioUpdateArgs>(args: SelectSubset<T, NotificacaoUsuarioUpdateArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificacaoUsuarios.
     * @param {NotificacaoUsuarioDeleteManyArgs} args - Arguments to filter NotificacaoUsuarios to delete.
     * @example
     * // Delete a few NotificacaoUsuarios
     * const { count } = await prisma.notificacaoUsuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificacaoUsuarioDeleteManyArgs>(args?: SelectSubset<T, NotificacaoUsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificacaoUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificacaoUsuarios
     * const notificacaoUsuario = await prisma.notificacaoUsuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificacaoUsuarioUpdateManyArgs>(args: SelectSubset<T, NotificacaoUsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificacaoUsuarios and returns the data updated in the database.
     * @param {NotificacaoUsuarioUpdateManyAndReturnArgs} args - Arguments to update many NotificacaoUsuarios.
     * @example
     * // Update many NotificacaoUsuarios
     * const notificacaoUsuario = await prisma.notificacaoUsuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificacaoUsuarios and only return the `id`
     * const notificacaoUsuarioWithIdOnly = await prisma.notificacaoUsuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificacaoUsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificacaoUsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificacaoUsuario.
     * @param {NotificacaoUsuarioUpsertArgs} args - Arguments to update or create a NotificacaoUsuario.
     * @example
     * // Update or create a NotificacaoUsuario
     * const notificacaoUsuario = await prisma.notificacaoUsuario.upsert({
     *   create: {
     *     // ... data to create a NotificacaoUsuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificacaoUsuario we want to update
     *   }
     * })
     */
    upsert<T extends NotificacaoUsuarioUpsertArgs>(args: SelectSubset<T, NotificacaoUsuarioUpsertArgs<ExtArgs>>): Prisma__NotificacaoUsuarioClient<$Result.GetResult<Prisma.$NotificacaoUsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificacaoUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioCountArgs} args - Arguments to filter NotificacaoUsuarios to count.
     * @example
     * // Count the number of NotificacaoUsuarios
     * const count = await prisma.notificacaoUsuario.count({
     *   where: {
     *     // ... the filter for the NotificacaoUsuarios we want to count
     *   }
     * })
    **/
    count<T extends NotificacaoUsuarioCountArgs>(
      args?: Subset<T, NotificacaoUsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificacaoUsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificacaoUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificacaoUsuarioAggregateArgs>(args: Subset<T, NotificacaoUsuarioAggregateArgs>): Prisma.PrismaPromise<GetNotificacaoUsuarioAggregateType<T>>

    /**
     * Group by NotificacaoUsuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificacaoUsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificacaoUsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificacaoUsuarioGroupByArgs['orderBy'] }
        : { orderBy?: NotificacaoUsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificacaoUsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificacaoUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificacaoUsuario model
   */
  readonly fields: NotificacaoUsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificacaoUsuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificacaoUsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notificacao<T extends NotificacaoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NotificacaoDefaultArgs<ExtArgs>>): Prisma__NotificacaoClient<$Result.GetResult<Prisma.$NotificacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificacaoUsuario model
   */
  interface NotificacaoUsuarioFieldRefs {
    readonly id: FieldRef<"NotificacaoUsuario", 'String'>
    readonly usuarioId: FieldRef<"NotificacaoUsuario", 'String'>
    readonly notificacaoId: FieldRef<"NotificacaoUsuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * NotificacaoUsuario findUnique
   */
  export type NotificacaoUsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which NotificacaoUsuario to fetch.
     */
    where: NotificacaoUsuarioWhereUniqueInput
  }

  /**
   * NotificacaoUsuario findUniqueOrThrow
   */
  export type NotificacaoUsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which NotificacaoUsuario to fetch.
     */
    where: NotificacaoUsuarioWhereUniqueInput
  }

  /**
   * NotificacaoUsuario findFirst
   */
  export type NotificacaoUsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which NotificacaoUsuario to fetch.
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificacaoUsuarios to fetch.
     */
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificacaoUsuarios.
     */
    cursor?: NotificacaoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificacaoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificacaoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificacaoUsuarios.
     */
    distinct?: NotificacaoUsuarioScalarFieldEnum | NotificacaoUsuarioScalarFieldEnum[]
  }

  /**
   * NotificacaoUsuario findFirstOrThrow
   */
  export type NotificacaoUsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which NotificacaoUsuario to fetch.
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificacaoUsuarios to fetch.
     */
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificacaoUsuarios.
     */
    cursor?: NotificacaoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificacaoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificacaoUsuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificacaoUsuarios.
     */
    distinct?: NotificacaoUsuarioScalarFieldEnum | NotificacaoUsuarioScalarFieldEnum[]
  }

  /**
   * NotificacaoUsuario findMany
   */
  export type NotificacaoUsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter, which NotificacaoUsuarios to fetch.
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificacaoUsuarios to fetch.
     */
    orderBy?: NotificacaoUsuarioOrderByWithRelationInput | NotificacaoUsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificacaoUsuarios.
     */
    cursor?: NotificacaoUsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificacaoUsuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificacaoUsuarios.
     */
    skip?: number
    distinct?: NotificacaoUsuarioScalarFieldEnum | NotificacaoUsuarioScalarFieldEnum[]
  }

  /**
   * NotificacaoUsuario create
   */
  export type NotificacaoUsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificacaoUsuario.
     */
    data: XOR<NotificacaoUsuarioCreateInput, NotificacaoUsuarioUncheckedCreateInput>
  }

  /**
   * NotificacaoUsuario createMany
   */
  export type NotificacaoUsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificacaoUsuarios.
     */
    data: NotificacaoUsuarioCreateManyInput | NotificacaoUsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificacaoUsuario createManyAndReturn
   */
  export type NotificacaoUsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many NotificacaoUsuarios.
     */
    data: NotificacaoUsuarioCreateManyInput | NotificacaoUsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificacaoUsuario update
   */
  export type NotificacaoUsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificacaoUsuario.
     */
    data: XOR<NotificacaoUsuarioUpdateInput, NotificacaoUsuarioUncheckedUpdateInput>
    /**
     * Choose, which NotificacaoUsuario to update.
     */
    where: NotificacaoUsuarioWhereUniqueInput
  }

  /**
   * NotificacaoUsuario updateMany
   */
  export type NotificacaoUsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificacaoUsuarios.
     */
    data: XOR<NotificacaoUsuarioUpdateManyMutationInput, NotificacaoUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which NotificacaoUsuarios to update
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * Limit how many NotificacaoUsuarios to update.
     */
    limit?: number
  }

  /**
   * NotificacaoUsuario updateManyAndReturn
   */
  export type NotificacaoUsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * The data used to update NotificacaoUsuarios.
     */
    data: XOR<NotificacaoUsuarioUpdateManyMutationInput, NotificacaoUsuarioUncheckedUpdateManyInput>
    /**
     * Filter which NotificacaoUsuarios to update
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * Limit how many NotificacaoUsuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificacaoUsuario upsert
   */
  export type NotificacaoUsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificacaoUsuario to update in case it exists.
     */
    where: NotificacaoUsuarioWhereUniqueInput
    /**
     * In case the NotificacaoUsuario found by the `where` argument doesn't exist, create a new NotificacaoUsuario with this data.
     */
    create: XOR<NotificacaoUsuarioCreateInput, NotificacaoUsuarioUncheckedCreateInput>
    /**
     * In case the NotificacaoUsuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificacaoUsuarioUpdateInput, NotificacaoUsuarioUncheckedUpdateInput>
  }

  /**
   * NotificacaoUsuario delete
   */
  export type NotificacaoUsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
    /**
     * Filter which NotificacaoUsuario to delete.
     */
    where: NotificacaoUsuarioWhereUniqueInput
  }

  /**
   * NotificacaoUsuario deleteMany
   */
  export type NotificacaoUsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificacaoUsuarios to delete
     */
    where?: NotificacaoUsuarioWhereInput
    /**
     * Limit how many NotificacaoUsuarios to delete.
     */
    limit?: number
  }

  /**
   * NotificacaoUsuario without action
   */
  export type NotificacaoUsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificacaoUsuario
     */
    select?: NotificacaoUsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificacaoUsuario
     */
    omit?: NotificacaoUsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificacaoUsuarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProdutoScalarFieldEnum: {
    id_produto: 'id_produto',
    nome: 'nome',
    categoria: 'categoria',
    marca: 'marca',
    cor: 'cor',
    quantidade: 'quantidade',
    valorCusto: 'valorCusto',
    valorVenda: 'valorVenda',
    estoqueMin: 'estoqueMin'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const EntradaEstoqueScalarFieldEnum: {
    id_entrada: 'id_entrada',
    data: 'data',
    quantidade: 'quantidade',
    produtoId: 'produtoId'
  };

  export type EntradaEstoqueScalarFieldEnum = (typeof EntradaEstoqueScalarFieldEnum)[keyof typeof EntradaEstoqueScalarFieldEnum]


  export const PedidoScalarFieldEnum: {
    id_pedido: 'id_pedido',
    data: 'data',
    status: 'status',
    usuarioId: 'usuarioId'
  };

  export type PedidoScalarFieldEnum = (typeof PedidoScalarFieldEnum)[keyof typeof PedidoScalarFieldEnum]


  export const PedidoProdutoScalarFieldEnum: {
    id: 'id',
    quantidade: 'quantidade',
    produtoId: 'produtoId',
    pedidoId: 'pedidoId'
  };

  export type PedidoProdutoScalarFieldEnum = (typeof PedidoProdutoScalarFieldEnum)[keyof typeof PedidoProdutoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id_usuario: 'id_usuario',
    nome: 'nome',
    email: 'email',
    senha: 'senha'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const NotificacaoScalarFieldEnum: {
    id_notificacao: 'id_notificacao',
    mensagem: 'mensagem',
    dataEnvio: 'dataEnvio'
  };

  export type NotificacaoScalarFieldEnum = (typeof NotificacaoScalarFieldEnum)[keyof typeof NotificacaoScalarFieldEnum]


  export const NotificacaoUsuarioScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    notificacaoId: 'notificacaoId'
  };

  export type NotificacaoUsuarioScalarFieldEnum = (typeof NotificacaoUsuarioScalarFieldEnum)[keyof typeof NotificacaoUsuarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    id_produto?: StringFilter<"Produto"> | string
    nome?: StringFilter<"Produto"> | string
    categoria?: StringFilter<"Produto"> | string
    marca?: StringFilter<"Produto"> | string
    cor?: StringFilter<"Produto"> | string
    quantidade?: IntFilter<"Produto"> | number
    valorCusto?: FloatFilter<"Produto"> | number
    valorVenda?: FloatFilter<"Produto"> | number
    estoqueMin?: IntFilter<"Produto"> | number
    entradas?: EntradaEstoqueListRelationFilter
    pedidos?: PedidoProdutoListRelationFilter
  }

  export type ProdutoOrderByWithRelationInput = {
    id_produto?: SortOrder
    nome?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    cor?: SortOrder
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
    entradas?: EntradaEstoqueOrderByRelationAggregateInput
    pedidos?: PedidoProdutoOrderByRelationAggregateInput
  }

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<{
    id_produto?: string
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    nome?: StringFilter<"Produto"> | string
    categoria?: StringFilter<"Produto"> | string
    marca?: StringFilter<"Produto"> | string
    cor?: StringFilter<"Produto"> | string
    quantidade?: IntFilter<"Produto"> | number
    valorCusto?: FloatFilter<"Produto"> | number
    valorVenda?: FloatFilter<"Produto"> | number
    estoqueMin?: IntFilter<"Produto"> | number
    entradas?: EntradaEstoqueListRelationFilter
    pedidos?: PedidoProdutoListRelationFilter
  }, "id_produto">

  export type ProdutoOrderByWithAggregationInput = {
    id_produto?: SortOrder
    nome?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    cor?: SortOrder
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _avg?: ProdutoAvgOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
    _sum?: ProdutoSumOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    OR?: ProdutoScalarWhereWithAggregatesInput[]
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    id_produto?: StringWithAggregatesFilter<"Produto"> | string
    nome?: StringWithAggregatesFilter<"Produto"> | string
    categoria?: StringWithAggregatesFilter<"Produto"> | string
    marca?: StringWithAggregatesFilter<"Produto"> | string
    cor?: StringWithAggregatesFilter<"Produto"> | string
    quantidade?: IntWithAggregatesFilter<"Produto"> | number
    valorCusto?: FloatWithAggregatesFilter<"Produto"> | number
    valorVenda?: FloatWithAggregatesFilter<"Produto"> | number
    estoqueMin?: IntWithAggregatesFilter<"Produto"> | number
  }

  export type EntradaEstoqueWhereInput = {
    AND?: EntradaEstoqueWhereInput | EntradaEstoqueWhereInput[]
    OR?: EntradaEstoqueWhereInput[]
    NOT?: EntradaEstoqueWhereInput | EntradaEstoqueWhereInput[]
    id_entrada?: StringFilter<"EntradaEstoque"> | string
    data?: DateTimeFilter<"EntradaEstoque"> | Date | string
    quantidade?: IntFilter<"EntradaEstoque"> | number
    produtoId?: StringFilter<"EntradaEstoque"> | string
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }

  export type EntradaEstoqueOrderByWithRelationInput = {
    id_entrada?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
  }

  export type EntradaEstoqueWhereUniqueInput = Prisma.AtLeast<{
    id_entrada?: string
    AND?: EntradaEstoqueWhereInput | EntradaEstoqueWhereInput[]
    OR?: EntradaEstoqueWhereInput[]
    NOT?: EntradaEstoqueWhereInput | EntradaEstoqueWhereInput[]
    data?: DateTimeFilter<"EntradaEstoque"> | Date | string
    quantidade?: IntFilter<"EntradaEstoque"> | number
    produtoId?: StringFilter<"EntradaEstoque"> | string
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }, "id_entrada">

  export type EntradaEstoqueOrderByWithAggregationInput = {
    id_entrada?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    _count?: EntradaEstoqueCountOrderByAggregateInput
    _avg?: EntradaEstoqueAvgOrderByAggregateInput
    _max?: EntradaEstoqueMaxOrderByAggregateInput
    _min?: EntradaEstoqueMinOrderByAggregateInput
    _sum?: EntradaEstoqueSumOrderByAggregateInput
  }

  export type EntradaEstoqueScalarWhereWithAggregatesInput = {
    AND?: EntradaEstoqueScalarWhereWithAggregatesInput | EntradaEstoqueScalarWhereWithAggregatesInput[]
    OR?: EntradaEstoqueScalarWhereWithAggregatesInput[]
    NOT?: EntradaEstoqueScalarWhereWithAggregatesInput | EntradaEstoqueScalarWhereWithAggregatesInput[]
    id_entrada?: StringWithAggregatesFilter<"EntradaEstoque"> | string
    data?: DateTimeWithAggregatesFilter<"EntradaEstoque"> | Date | string
    quantidade?: IntWithAggregatesFilter<"EntradaEstoque"> | number
    produtoId?: StringWithAggregatesFilter<"EntradaEstoque"> | string
  }

  export type PedidoWhereInput = {
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    id_pedido?: StringFilter<"Pedido"> | string
    data?: DateTimeFilter<"Pedido"> | Date | string
    status?: StringFilter<"Pedido"> | string
    usuarioId?: StringFilter<"Pedido"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    produtos?: PedidoProdutoListRelationFilter
  }

  export type PedidoOrderByWithRelationInput = {
    id_pedido?: SortOrder
    data?: SortOrder
    status?: SortOrder
    usuarioId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    produtos?: PedidoProdutoOrderByRelationAggregateInput
  }

  export type PedidoWhereUniqueInput = Prisma.AtLeast<{
    id_pedido?: string
    AND?: PedidoWhereInput | PedidoWhereInput[]
    OR?: PedidoWhereInput[]
    NOT?: PedidoWhereInput | PedidoWhereInput[]
    data?: DateTimeFilter<"Pedido"> | Date | string
    status?: StringFilter<"Pedido"> | string
    usuarioId?: StringFilter<"Pedido"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    produtos?: PedidoProdutoListRelationFilter
  }, "id_pedido">

  export type PedidoOrderByWithAggregationInput = {
    id_pedido?: SortOrder
    data?: SortOrder
    status?: SortOrder
    usuarioId?: SortOrder
    _count?: PedidoCountOrderByAggregateInput
    _max?: PedidoMaxOrderByAggregateInput
    _min?: PedidoMinOrderByAggregateInput
  }

  export type PedidoScalarWhereWithAggregatesInput = {
    AND?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    OR?: PedidoScalarWhereWithAggregatesInput[]
    NOT?: PedidoScalarWhereWithAggregatesInput | PedidoScalarWhereWithAggregatesInput[]
    id_pedido?: StringWithAggregatesFilter<"Pedido"> | string
    data?: DateTimeWithAggregatesFilter<"Pedido"> | Date | string
    status?: StringWithAggregatesFilter<"Pedido"> | string
    usuarioId?: StringWithAggregatesFilter<"Pedido"> | string
  }

  export type PedidoProdutoWhereInput = {
    AND?: PedidoProdutoWhereInput | PedidoProdutoWhereInput[]
    OR?: PedidoProdutoWhereInput[]
    NOT?: PedidoProdutoWhereInput | PedidoProdutoWhereInput[]
    id?: StringFilter<"PedidoProduto"> | string
    quantidade?: IntFilter<"PedidoProduto"> | number
    produtoId?: StringFilter<"PedidoProduto"> | string
    pedidoId?: StringFilter<"PedidoProduto"> | string
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }

  export type PedidoProdutoOrderByWithRelationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    pedidoId?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
    pedido?: PedidoOrderByWithRelationInput
  }

  export type PedidoProdutoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PedidoProdutoWhereInput | PedidoProdutoWhereInput[]
    OR?: PedidoProdutoWhereInput[]
    NOT?: PedidoProdutoWhereInput | PedidoProdutoWhereInput[]
    quantidade?: IntFilter<"PedidoProduto"> | number
    produtoId?: StringFilter<"PedidoProduto"> | string
    pedidoId?: StringFilter<"PedidoProduto"> | string
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    pedido?: XOR<PedidoScalarRelationFilter, PedidoWhereInput>
  }, "id">

  export type PedidoProdutoOrderByWithAggregationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    pedidoId?: SortOrder
    _count?: PedidoProdutoCountOrderByAggregateInput
    _avg?: PedidoProdutoAvgOrderByAggregateInput
    _max?: PedidoProdutoMaxOrderByAggregateInput
    _min?: PedidoProdutoMinOrderByAggregateInput
    _sum?: PedidoProdutoSumOrderByAggregateInput
  }

  export type PedidoProdutoScalarWhereWithAggregatesInput = {
    AND?: PedidoProdutoScalarWhereWithAggregatesInput | PedidoProdutoScalarWhereWithAggregatesInput[]
    OR?: PedidoProdutoScalarWhereWithAggregatesInput[]
    NOT?: PedidoProdutoScalarWhereWithAggregatesInput | PedidoProdutoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PedidoProduto"> | string
    quantidade?: IntWithAggregatesFilter<"PedidoProduto"> | number
    produtoId?: StringWithAggregatesFilter<"PedidoProduto"> | string
    pedidoId?: StringWithAggregatesFilter<"PedidoProduto"> | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id_usuario?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    pedidos?: PedidoListRelationFilter
    notificacoes?: NotificacaoUsuarioListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    pedidos?: PedidoOrderByRelationAggregateInput
    notificacoes?: NotificacaoUsuarioOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id_usuario?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    pedidos?: PedidoListRelationFilter
    notificacoes?: NotificacaoUsuarioListRelationFilter
  }, "id_usuario" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id_usuario?: StringWithAggregatesFilter<"Usuario"> | string
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senha?: StringWithAggregatesFilter<"Usuario"> | string
  }

  export type NotificacaoWhereInput = {
    AND?: NotificacaoWhereInput | NotificacaoWhereInput[]
    OR?: NotificacaoWhereInput[]
    NOT?: NotificacaoWhereInput | NotificacaoWhereInput[]
    id_notificacao?: StringFilter<"Notificacao"> | string
    mensagem?: StringFilter<"Notificacao"> | string
    dataEnvio?: DateTimeFilter<"Notificacao"> | Date | string
    usuarios?: NotificacaoUsuarioListRelationFilter
  }

  export type NotificacaoOrderByWithRelationInput = {
    id_notificacao?: SortOrder
    mensagem?: SortOrder
    dataEnvio?: SortOrder
    usuarios?: NotificacaoUsuarioOrderByRelationAggregateInput
  }

  export type NotificacaoWhereUniqueInput = Prisma.AtLeast<{
    id_notificacao?: string
    AND?: NotificacaoWhereInput | NotificacaoWhereInput[]
    OR?: NotificacaoWhereInput[]
    NOT?: NotificacaoWhereInput | NotificacaoWhereInput[]
    mensagem?: StringFilter<"Notificacao"> | string
    dataEnvio?: DateTimeFilter<"Notificacao"> | Date | string
    usuarios?: NotificacaoUsuarioListRelationFilter
  }, "id_notificacao">

  export type NotificacaoOrderByWithAggregationInput = {
    id_notificacao?: SortOrder
    mensagem?: SortOrder
    dataEnvio?: SortOrder
    _count?: NotificacaoCountOrderByAggregateInput
    _max?: NotificacaoMaxOrderByAggregateInput
    _min?: NotificacaoMinOrderByAggregateInput
  }

  export type NotificacaoScalarWhereWithAggregatesInput = {
    AND?: NotificacaoScalarWhereWithAggregatesInput | NotificacaoScalarWhereWithAggregatesInput[]
    OR?: NotificacaoScalarWhereWithAggregatesInput[]
    NOT?: NotificacaoScalarWhereWithAggregatesInput | NotificacaoScalarWhereWithAggregatesInput[]
    id_notificacao?: StringWithAggregatesFilter<"Notificacao"> | string
    mensagem?: StringWithAggregatesFilter<"Notificacao"> | string
    dataEnvio?: DateTimeWithAggregatesFilter<"Notificacao"> | Date | string
  }

  export type NotificacaoUsuarioWhereInput = {
    AND?: NotificacaoUsuarioWhereInput | NotificacaoUsuarioWhereInput[]
    OR?: NotificacaoUsuarioWhereInput[]
    NOT?: NotificacaoUsuarioWhereInput | NotificacaoUsuarioWhereInput[]
    id?: StringFilter<"NotificacaoUsuario"> | string
    usuarioId?: StringFilter<"NotificacaoUsuario"> | string
    notificacaoId?: StringFilter<"NotificacaoUsuario"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    notificacao?: XOR<NotificacaoScalarRelationFilter, NotificacaoWhereInput>
  }

  export type NotificacaoUsuarioOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    notificacaoId?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    notificacao?: NotificacaoOrderByWithRelationInput
  }

  export type NotificacaoUsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificacaoUsuarioWhereInput | NotificacaoUsuarioWhereInput[]
    OR?: NotificacaoUsuarioWhereInput[]
    NOT?: NotificacaoUsuarioWhereInput | NotificacaoUsuarioWhereInput[]
    usuarioId?: StringFilter<"NotificacaoUsuario"> | string
    notificacaoId?: StringFilter<"NotificacaoUsuario"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    notificacao?: XOR<NotificacaoScalarRelationFilter, NotificacaoWhereInput>
  }, "id">

  export type NotificacaoUsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    notificacaoId?: SortOrder
    _count?: NotificacaoUsuarioCountOrderByAggregateInput
    _max?: NotificacaoUsuarioMaxOrderByAggregateInput
    _min?: NotificacaoUsuarioMinOrderByAggregateInput
  }

  export type NotificacaoUsuarioScalarWhereWithAggregatesInput = {
    AND?: NotificacaoUsuarioScalarWhereWithAggregatesInput | NotificacaoUsuarioScalarWhereWithAggregatesInput[]
    OR?: NotificacaoUsuarioScalarWhereWithAggregatesInput[]
    NOT?: NotificacaoUsuarioScalarWhereWithAggregatesInput | NotificacaoUsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificacaoUsuario"> | string
    usuarioId?: StringWithAggregatesFilter<"NotificacaoUsuario"> | string
    notificacaoId?: StringWithAggregatesFilter<"NotificacaoUsuario"> | string
  }

  export type ProdutoCreateInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    entradas?: EntradaEstoqueCreateNestedManyWithoutProdutoInput
    pedidos?: PedidoProdutoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    entradas?: EntradaEstoqueUncheckedCreateNestedManyWithoutProdutoInput
    pedidos?: PedidoProdutoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    entradas?: EntradaEstoqueUpdateManyWithoutProdutoNestedInput
    pedidos?: PedidoProdutoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    entradas?: EntradaEstoqueUncheckedUpdateManyWithoutProdutoNestedInput
    pedidos?: PedidoProdutoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
  }

  export type ProdutoUpdateManyMutationInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
  }

  export type ProdutoUncheckedUpdateManyInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
  }

  export type EntradaEstoqueCreateInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
    produto: ProdutoCreateNestedOneWithoutEntradasInput
  }

  export type EntradaEstoqueUncheckedCreateInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
    produtoId: string
  }

  export type EntradaEstoqueUpdateInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneRequiredWithoutEntradasNestedInput
  }

  export type EntradaEstoqueUncheckedUpdateInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
  }

  export type EntradaEstoqueCreateManyInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
    produtoId: string
  }

  export type EntradaEstoqueUpdateManyMutationInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type EntradaEstoqueUncheckedUpdateManyInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoCreateInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
    produtos?: PedidoProdutoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    usuarioId: string
    produtos?: PedidoProdutoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUpdateInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
    produtos?: PedidoProdutoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    produtos?: PedidoProdutoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoCreateManyInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    usuarioId: string
  }

  export type PedidoUpdateManyMutationInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoUncheckedUpdateManyInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoProdutoCreateInput = {
    id?: string
    quantidade: number
    produto: ProdutoCreateNestedOneWithoutPedidosInput
    pedido: PedidoCreateNestedOneWithoutProdutosInput
  }

  export type PedidoProdutoUncheckedCreateInput = {
    id?: string
    quantidade: number
    produtoId: string
    pedidoId: string
  }

  export type PedidoProdutoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneRequiredWithoutPedidosNestedInput
    pedido?: PedidoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type PedidoProdutoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoProdutoCreateManyInput = {
    id?: string
    quantidade: number
    produtoId: string
    pedidoId: string
  }

  export type PedidoProdutoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoProdutoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
    pedidoId?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioCreateInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificacaoUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificacaoUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificacaoUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificacaoUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
  }

  export type UsuarioUpdateManyMutationInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoCreateInput = {
    id_notificacao?: string
    mensagem: string
    dataEnvio?: Date | string
    usuarios?: NotificacaoUsuarioCreateNestedManyWithoutNotificacaoInput
  }

  export type NotificacaoUncheckedCreateInput = {
    id_notificacao?: string
    mensagem: string
    dataEnvio?: Date | string
    usuarios?: NotificacaoUsuarioUncheckedCreateNestedManyWithoutNotificacaoInput
  }

  export type NotificacaoUpdateInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: NotificacaoUsuarioUpdateManyWithoutNotificacaoNestedInput
  }

  export type NotificacaoUncheckedUpdateInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: NotificacaoUsuarioUncheckedUpdateManyWithoutNotificacaoNestedInput
  }

  export type NotificacaoCreateManyInput = {
    id_notificacao?: string
    mensagem: string
    dataEnvio?: Date | string
  }

  export type NotificacaoUpdateManyMutationInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacaoUncheckedUpdateManyInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacaoUsuarioCreateInput = {
    id?: string
    usuario: UsuarioCreateNestedOneWithoutNotificacoesInput
    notificacao: NotificacaoCreateNestedOneWithoutUsuariosInput
  }

  export type NotificacaoUsuarioUncheckedCreateInput = {
    id?: string
    usuarioId: string
    notificacaoId: string
  }

  export type NotificacaoUsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneRequiredWithoutNotificacoesNestedInput
    notificacao?: NotificacaoUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type NotificacaoUsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    notificacaoId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioCreateManyInput = {
    id?: string
    usuarioId: string
    notificacaoId: string
  }

  export type NotificacaoUsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    notificacaoId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EntradaEstoqueListRelationFilter = {
    every?: EntradaEstoqueWhereInput
    some?: EntradaEstoqueWhereInput
    none?: EntradaEstoqueWhereInput
  }

  export type PedidoProdutoListRelationFilter = {
    every?: PedidoProdutoWhereInput
    some?: PedidoProdutoWhereInput
    none?: PedidoProdutoWhereInput
  }

  export type EntradaEstoqueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PedidoProdutoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoCountOrderByAggregateInput = {
    id_produto?: SortOrder
    nome?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    cor?: SortOrder
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
  }

  export type ProdutoAvgOrderByAggregateInput = {
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    id_produto?: SortOrder
    nome?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    cor?: SortOrder
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    id_produto?: SortOrder
    nome?: SortOrder
    categoria?: SortOrder
    marca?: SortOrder
    cor?: SortOrder
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
  }

  export type ProdutoSumOrderByAggregateInput = {
    quantidade?: SortOrder
    valorCusto?: SortOrder
    valorVenda?: SortOrder
    estoqueMin?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProdutoScalarRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type EntradaEstoqueCountOrderByAggregateInput = {
    id_entrada?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
  }

  export type EntradaEstoqueAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type EntradaEstoqueMaxOrderByAggregateInput = {
    id_entrada?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
  }

  export type EntradaEstoqueMinOrderByAggregateInput = {
    id_entrada?: SortOrder
    data?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
  }

  export type EntradaEstoqueSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type PedidoCountOrderByAggregateInput = {
    id_pedido?: SortOrder
    data?: SortOrder
    status?: SortOrder
    usuarioId?: SortOrder
  }

  export type PedidoMaxOrderByAggregateInput = {
    id_pedido?: SortOrder
    data?: SortOrder
    status?: SortOrder
    usuarioId?: SortOrder
  }

  export type PedidoMinOrderByAggregateInput = {
    id_pedido?: SortOrder
    data?: SortOrder
    status?: SortOrder
    usuarioId?: SortOrder
  }

  export type PedidoScalarRelationFilter = {
    is?: PedidoWhereInput
    isNot?: PedidoWhereInput
  }

  export type PedidoProdutoCountOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    pedidoId?: SortOrder
  }

  export type PedidoProdutoAvgOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type PedidoProdutoMaxOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    pedidoId?: SortOrder
  }

  export type PedidoProdutoMinOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
    pedidoId?: SortOrder
  }

  export type PedidoProdutoSumOrderByAggregateInput = {
    quantidade?: SortOrder
  }

  export type PedidoListRelationFilter = {
    every?: PedidoWhereInput
    some?: PedidoWhereInput
    none?: PedidoWhereInput
  }

  export type NotificacaoUsuarioListRelationFilter = {
    every?: NotificacaoUsuarioWhereInput
    some?: NotificacaoUsuarioWhereInput
    none?: NotificacaoUsuarioWhereInput
  }

  export type PedidoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificacaoUsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type NotificacaoCountOrderByAggregateInput = {
    id_notificacao?: SortOrder
    mensagem?: SortOrder
    dataEnvio?: SortOrder
  }

  export type NotificacaoMaxOrderByAggregateInput = {
    id_notificacao?: SortOrder
    mensagem?: SortOrder
    dataEnvio?: SortOrder
  }

  export type NotificacaoMinOrderByAggregateInput = {
    id_notificacao?: SortOrder
    mensagem?: SortOrder
    dataEnvio?: SortOrder
  }

  export type NotificacaoScalarRelationFilter = {
    is?: NotificacaoWhereInput
    isNot?: NotificacaoWhereInput
  }

  export type NotificacaoUsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    notificacaoId?: SortOrder
  }

  export type NotificacaoUsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    notificacaoId?: SortOrder
  }

  export type NotificacaoUsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    notificacaoId?: SortOrder
  }

  export type EntradaEstoqueCreateNestedManyWithoutProdutoInput = {
    create?: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput> | EntradaEstoqueCreateWithoutProdutoInput[] | EntradaEstoqueUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: EntradaEstoqueCreateOrConnectWithoutProdutoInput | EntradaEstoqueCreateOrConnectWithoutProdutoInput[]
    createMany?: EntradaEstoqueCreateManyProdutoInputEnvelope
    connect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
  }

  export type PedidoProdutoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput> | PedidoProdutoCreateWithoutProdutoInput[] | PedidoProdutoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutProdutoInput | PedidoProdutoCreateOrConnectWithoutProdutoInput[]
    createMany?: PedidoProdutoCreateManyProdutoInputEnvelope
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
  }

  export type EntradaEstoqueUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput> | EntradaEstoqueCreateWithoutProdutoInput[] | EntradaEstoqueUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: EntradaEstoqueCreateOrConnectWithoutProdutoInput | EntradaEstoqueCreateOrConnectWithoutProdutoInput[]
    createMany?: EntradaEstoqueCreateManyProdutoInputEnvelope
    connect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
  }

  export type PedidoProdutoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput> | PedidoProdutoCreateWithoutProdutoInput[] | PedidoProdutoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutProdutoInput | PedidoProdutoCreateOrConnectWithoutProdutoInput[]
    createMany?: PedidoProdutoCreateManyProdutoInputEnvelope
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EntradaEstoqueUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput> | EntradaEstoqueCreateWithoutProdutoInput[] | EntradaEstoqueUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: EntradaEstoqueCreateOrConnectWithoutProdutoInput | EntradaEstoqueCreateOrConnectWithoutProdutoInput[]
    upsert?: EntradaEstoqueUpsertWithWhereUniqueWithoutProdutoInput | EntradaEstoqueUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: EntradaEstoqueCreateManyProdutoInputEnvelope
    set?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    disconnect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    delete?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    connect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    update?: EntradaEstoqueUpdateWithWhereUniqueWithoutProdutoInput | EntradaEstoqueUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: EntradaEstoqueUpdateManyWithWhereWithoutProdutoInput | EntradaEstoqueUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: EntradaEstoqueScalarWhereInput | EntradaEstoqueScalarWhereInput[]
  }

  export type PedidoProdutoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput> | PedidoProdutoCreateWithoutProdutoInput[] | PedidoProdutoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutProdutoInput | PedidoProdutoCreateOrConnectWithoutProdutoInput[]
    upsert?: PedidoProdutoUpsertWithWhereUniqueWithoutProdutoInput | PedidoProdutoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: PedidoProdutoCreateManyProdutoInputEnvelope
    set?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    disconnect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    delete?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    update?: PedidoProdutoUpdateWithWhereUniqueWithoutProdutoInput | PedidoProdutoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: PedidoProdutoUpdateManyWithWhereWithoutProdutoInput | PedidoProdutoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
  }

  export type EntradaEstoqueUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput> | EntradaEstoqueCreateWithoutProdutoInput[] | EntradaEstoqueUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: EntradaEstoqueCreateOrConnectWithoutProdutoInput | EntradaEstoqueCreateOrConnectWithoutProdutoInput[]
    upsert?: EntradaEstoqueUpsertWithWhereUniqueWithoutProdutoInput | EntradaEstoqueUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: EntradaEstoqueCreateManyProdutoInputEnvelope
    set?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    disconnect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    delete?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    connect?: EntradaEstoqueWhereUniqueInput | EntradaEstoqueWhereUniqueInput[]
    update?: EntradaEstoqueUpdateWithWhereUniqueWithoutProdutoInput | EntradaEstoqueUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: EntradaEstoqueUpdateManyWithWhereWithoutProdutoInput | EntradaEstoqueUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: EntradaEstoqueScalarWhereInput | EntradaEstoqueScalarWhereInput[]
  }

  export type PedidoProdutoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput> | PedidoProdutoCreateWithoutProdutoInput[] | PedidoProdutoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutProdutoInput | PedidoProdutoCreateOrConnectWithoutProdutoInput[]
    upsert?: PedidoProdutoUpsertWithWhereUniqueWithoutProdutoInput | PedidoProdutoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: PedidoProdutoCreateManyProdutoInputEnvelope
    set?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    disconnect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    delete?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    update?: PedidoProdutoUpdateWithWhereUniqueWithoutProdutoInput | PedidoProdutoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: PedidoProdutoUpdateManyWithWhereWithoutProdutoInput | PedidoProdutoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
  }

  export type ProdutoCreateNestedOneWithoutEntradasInput = {
    create?: XOR<ProdutoCreateWithoutEntradasInput, ProdutoUncheckedCreateWithoutEntradasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutEntradasInput
    connect?: ProdutoWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProdutoUpdateOneRequiredWithoutEntradasNestedInput = {
    create?: XOR<ProdutoCreateWithoutEntradasInput, ProdutoUncheckedCreateWithoutEntradasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutEntradasInput
    upsert?: ProdutoUpsertWithoutEntradasInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutEntradasInput, ProdutoUpdateWithoutEntradasInput>, ProdutoUncheckedUpdateWithoutEntradasInput>
  }

  export type UsuarioCreateNestedOneWithoutPedidosInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type PedidoProdutoCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput> | PedidoProdutoCreateWithoutPedidoInput[] | PedidoProdutoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutPedidoInput | PedidoProdutoCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoProdutoCreateManyPedidoInputEnvelope
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
  }

  export type PedidoProdutoUncheckedCreateNestedManyWithoutPedidoInput = {
    create?: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput> | PedidoProdutoCreateWithoutPedidoInput[] | PedidoProdutoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutPedidoInput | PedidoProdutoCreateOrConnectWithoutPedidoInput[]
    createMany?: PedidoProdutoCreateManyPedidoInputEnvelope
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutPedidosInput
    upsert?: UsuarioUpsertWithoutPedidosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutPedidosInput, UsuarioUpdateWithoutPedidosInput>, UsuarioUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoProdutoUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput> | PedidoProdutoCreateWithoutPedidoInput[] | PedidoProdutoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutPedidoInput | PedidoProdutoCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoProdutoUpsertWithWhereUniqueWithoutPedidoInput | PedidoProdutoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoProdutoCreateManyPedidoInputEnvelope
    set?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    disconnect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    delete?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    update?: PedidoProdutoUpdateWithWhereUniqueWithoutPedidoInput | PedidoProdutoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoProdutoUpdateManyWithWhereWithoutPedidoInput | PedidoProdutoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
  }

  export type PedidoProdutoUncheckedUpdateManyWithoutPedidoNestedInput = {
    create?: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput> | PedidoProdutoCreateWithoutPedidoInput[] | PedidoProdutoUncheckedCreateWithoutPedidoInput[]
    connectOrCreate?: PedidoProdutoCreateOrConnectWithoutPedidoInput | PedidoProdutoCreateOrConnectWithoutPedidoInput[]
    upsert?: PedidoProdutoUpsertWithWhereUniqueWithoutPedidoInput | PedidoProdutoUpsertWithWhereUniqueWithoutPedidoInput[]
    createMany?: PedidoProdutoCreateManyPedidoInputEnvelope
    set?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    disconnect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    delete?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    connect?: PedidoProdutoWhereUniqueInput | PedidoProdutoWhereUniqueInput[]
    update?: PedidoProdutoUpdateWithWhereUniqueWithoutPedidoInput | PedidoProdutoUpdateWithWhereUniqueWithoutPedidoInput[]
    updateMany?: PedidoProdutoUpdateManyWithWhereWithoutPedidoInput | PedidoProdutoUpdateManyWithWhereWithoutPedidoInput[]
    deleteMany?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
  }

  export type ProdutoCreateNestedOneWithoutPedidosInput = {
    create?: XOR<ProdutoCreateWithoutPedidosInput, ProdutoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutPedidosInput
    connect?: ProdutoWhereUniqueInput
  }

  export type PedidoCreateNestedOneWithoutProdutosInput = {
    create?: XOR<PedidoCreateWithoutProdutosInput, PedidoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutProdutosInput
    connect?: PedidoWhereUniqueInput
  }

  export type ProdutoUpdateOneRequiredWithoutPedidosNestedInput = {
    create?: XOR<ProdutoCreateWithoutPedidosInput, ProdutoUncheckedCreateWithoutPedidosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutPedidosInput
    upsert?: ProdutoUpsertWithoutPedidosInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutPedidosInput, ProdutoUpdateWithoutPedidosInput>, ProdutoUncheckedUpdateWithoutPedidosInput>
  }

  export type PedidoUpdateOneRequiredWithoutProdutosNestedInput = {
    create?: XOR<PedidoCreateWithoutProdutosInput, PedidoUncheckedCreateWithoutProdutosInput>
    connectOrCreate?: PedidoCreateOrConnectWithoutProdutosInput
    upsert?: PedidoUpsertWithoutProdutosInput
    connect?: PedidoWhereUniqueInput
    update?: XOR<XOR<PedidoUpdateToOneWithWhereWithoutProdutosInput, PedidoUpdateWithoutProdutosInput>, PedidoUncheckedUpdateWithoutProdutosInput>
  }

  export type PedidoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type NotificacaoUsuarioCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput> | NotificacaoUsuarioCreateWithoutUsuarioInput[] | NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput | NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificacaoUsuarioCreateManyUsuarioInputEnvelope
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
  }

  export type PedidoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
  }

  export type NotificacaoUsuarioUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput> | NotificacaoUsuarioCreateWithoutUsuarioInput[] | NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput | NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificacaoUsuarioCreateManyUsuarioInputEnvelope
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
  }

  export type PedidoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutUsuarioInput | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutUsuarioInput | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutUsuarioInput | PedidoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type NotificacaoUsuarioUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput> | NotificacaoUsuarioCreateWithoutUsuarioInput[] | NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput | NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificacaoUsuarioUpsertWithWhereUniqueWithoutUsuarioInput | NotificacaoUsuarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificacaoUsuarioCreateManyUsuarioInputEnvelope
    set?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    disconnect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    delete?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    update?: NotificacaoUsuarioUpdateWithWhereUniqueWithoutUsuarioInput | NotificacaoUsuarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificacaoUsuarioUpdateManyWithWhereWithoutUsuarioInput | NotificacaoUsuarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
  }

  export type PedidoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput> | PedidoCreateWithoutUsuarioInput[] | PedidoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PedidoCreateOrConnectWithoutUsuarioInput | PedidoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PedidoUpsertWithWhereUniqueWithoutUsuarioInput | PedidoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PedidoCreateManyUsuarioInputEnvelope
    set?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    disconnect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    delete?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    connect?: PedidoWhereUniqueInput | PedidoWhereUniqueInput[]
    update?: PedidoUpdateWithWhereUniqueWithoutUsuarioInput | PedidoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PedidoUpdateManyWithWhereWithoutUsuarioInput | PedidoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
  }

  export type NotificacaoUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput> | NotificacaoUsuarioCreateWithoutUsuarioInput[] | NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput | NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificacaoUsuarioUpsertWithWhereUniqueWithoutUsuarioInput | NotificacaoUsuarioUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificacaoUsuarioCreateManyUsuarioInputEnvelope
    set?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    disconnect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    delete?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    update?: NotificacaoUsuarioUpdateWithWhereUniqueWithoutUsuarioInput | NotificacaoUsuarioUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificacaoUsuarioUpdateManyWithWhereWithoutUsuarioInput | NotificacaoUsuarioUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
  }

  export type NotificacaoUsuarioCreateNestedManyWithoutNotificacaoInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput> | NotificacaoUsuarioCreateWithoutNotificacaoInput[] | NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput | NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput[]
    createMany?: NotificacaoUsuarioCreateManyNotificacaoInputEnvelope
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
  }

  export type NotificacaoUsuarioUncheckedCreateNestedManyWithoutNotificacaoInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput> | NotificacaoUsuarioCreateWithoutNotificacaoInput[] | NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput | NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput[]
    createMany?: NotificacaoUsuarioCreateManyNotificacaoInputEnvelope
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
  }

  export type NotificacaoUsuarioUpdateManyWithoutNotificacaoNestedInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput> | NotificacaoUsuarioCreateWithoutNotificacaoInput[] | NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput | NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput[]
    upsert?: NotificacaoUsuarioUpsertWithWhereUniqueWithoutNotificacaoInput | NotificacaoUsuarioUpsertWithWhereUniqueWithoutNotificacaoInput[]
    createMany?: NotificacaoUsuarioCreateManyNotificacaoInputEnvelope
    set?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    disconnect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    delete?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    update?: NotificacaoUsuarioUpdateWithWhereUniqueWithoutNotificacaoInput | NotificacaoUsuarioUpdateWithWhereUniqueWithoutNotificacaoInput[]
    updateMany?: NotificacaoUsuarioUpdateManyWithWhereWithoutNotificacaoInput | NotificacaoUsuarioUpdateManyWithWhereWithoutNotificacaoInput[]
    deleteMany?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
  }

  export type NotificacaoUsuarioUncheckedUpdateManyWithoutNotificacaoNestedInput = {
    create?: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput> | NotificacaoUsuarioCreateWithoutNotificacaoInput[] | NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput[]
    connectOrCreate?: NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput | NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput[]
    upsert?: NotificacaoUsuarioUpsertWithWhereUniqueWithoutNotificacaoInput | NotificacaoUsuarioUpsertWithWhereUniqueWithoutNotificacaoInput[]
    createMany?: NotificacaoUsuarioCreateManyNotificacaoInputEnvelope
    set?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    disconnect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    delete?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    connect?: NotificacaoUsuarioWhereUniqueInput | NotificacaoUsuarioWhereUniqueInput[]
    update?: NotificacaoUsuarioUpdateWithWhereUniqueWithoutNotificacaoInput | NotificacaoUsuarioUpdateWithWhereUniqueWithoutNotificacaoInput[]
    updateMany?: NotificacaoUsuarioUpdateManyWithWhereWithoutNotificacaoInput | NotificacaoUsuarioUpdateManyWithWhereWithoutNotificacaoInput[]
    deleteMany?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutNotificacoesInput = {
    create?: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacoesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type NotificacaoCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<NotificacaoCreateWithoutUsuariosInput, NotificacaoUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: NotificacaoCreateOrConnectWithoutUsuariosInput
    connect?: NotificacaoWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutNotificacoesNestedInput = {
    create?: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacoesInput
    upsert?: UsuarioUpsertWithoutNotificacoesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutNotificacoesInput, UsuarioUpdateWithoutNotificacoesInput>, UsuarioUncheckedUpdateWithoutNotificacoesInput>
  }

  export type NotificacaoUpdateOneRequiredWithoutUsuariosNestedInput = {
    create?: XOR<NotificacaoCreateWithoutUsuariosInput, NotificacaoUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: NotificacaoCreateOrConnectWithoutUsuariosInput
    upsert?: NotificacaoUpsertWithoutUsuariosInput
    connect?: NotificacaoWhereUniqueInput
    update?: XOR<XOR<NotificacaoUpdateToOneWithWhereWithoutUsuariosInput, NotificacaoUpdateWithoutUsuariosInput>, NotificacaoUncheckedUpdateWithoutUsuariosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EntradaEstoqueCreateWithoutProdutoInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
  }

  export type EntradaEstoqueUncheckedCreateWithoutProdutoInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
  }

  export type EntradaEstoqueCreateOrConnectWithoutProdutoInput = {
    where: EntradaEstoqueWhereUniqueInput
    create: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput>
  }

  export type EntradaEstoqueCreateManyProdutoInputEnvelope = {
    data: EntradaEstoqueCreateManyProdutoInput | EntradaEstoqueCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type PedidoProdutoCreateWithoutProdutoInput = {
    id?: string
    quantidade: number
    pedido: PedidoCreateNestedOneWithoutProdutosInput
  }

  export type PedidoProdutoUncheckedCreateWithoutProdutoInput = {
    id?: string
    quantidade: number
    pedidoId: string
  }

  export type PedidoProdutoCreateOrConnectWithoutProdutoInput = {
    where: PedidoProdutoWhereUniqueInput
    create: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput>
  }

  export type PedidoProdutoCreateManyProdutoInputEnvelope = {
    data: PedidoProdutoCreateManyProdutoInput | PedidoProdutoCreateManyProdutoInput[]
    skipDuplicates?: boolean
  }

  export type EntradaEstoqueUpsertWithWhereUniqueWithoutProdutoInput = {
    where: EntradaEstoqueWhereUniqueInput
    update: XOR<EntradaEstoqueUpdateWithoutProdutoInput, EntradaEstoqueUncheckedUpdateWithoutProdutoInput>
    create: XOR<EntradaEstoqueCreateWithoutProdutoInput, EntradaEstoqueUncheckedCreateWithoutProdutoInput>
  }

  export type EntradaEstoqueUpdateWithWhereUniqueWithoutProdutoInput = {
    where: EntradaEstoqueWhereUniqueInput
    data: XOR<EntradaEstoqueUpdateWithoutProdutoInput, EntradaEstoqueUncheckedUpdateWithoutProdutoInput>
  }

  export type EntradaEstoqueUpdateManyWithWhereWithoutProdutoInput = {
    where: EntradaEstoqueScalarWhereInput
    data: XOR<EntradaEstoqueUpdateManyMutationInput, EntradaEstoqueUncheckedUpdateManyWithoutProdutoInput>
  }

  export type EntradaEstoqueScalarWhereInput = {
    AND?: EntradaEstoqueScalarWhereInput | EntradaEstoqueScalarWhereInput[]
    OR?: EntradaEstoqueScalarWhereInput[]
    NOT?: EntradaEstoqueScalarWhereInput | EntradaEstoqueScalarWhereInput[]
    id_entrada?: StringFilter<"EntradaEstoque"> | string
    data?: DateTimeFilter<"EntradaEstoque"> | Date | string
    quantidade?: IntFilter<"EntradaEstoque"> | number
    produtoId?: StringFilter<"EntradaEstoque"> | string
  }

  export type PedidoProdutoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: PedidoProdutoWhereUniqueInput
    update: XOR<PedidoProdutoUpdateWithoutProdutoInput, PedidoProdutoUncheckedUpdateWithoutProdutoInput>
    create: XOR<PedidoProdutoCreateWithoutProdutoInput, PedidoProdutoUncheckedCreateWithoutProdutoInput>
  }

  export type PedidoProdutoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: PedidoProdutoWhereUniqueInput
    data: XOR<PedidoProdutoUpdateWithoutProdutoInput, PedidoProdutoUncheckedUpdateWithoutProdutoInput>
  }

  export type PedidoProdutoUpdateManyWithWhereWithoutProdutoInput = {
    where: PedidoProdutoScalarWhereInput
    data: XOR<PedidoProdutoUpdateManyMutationInput, PedidoProdutoUncheckedUpdateManyWithoutProdutoInput>
  }

  export type PedidoProdutoScalarWhereInput = {
    AND?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
    OR?: PedidoProdutoScalarWhereInput[]
    NOT?: PedidoProdutoScalarWhereInput | PedidoProdutoScalarWhereInput[]
    id?: StringFilter<"PedidoProduto"> | string
    quantidade?: IntFilter<"PedidoProduto"> | number
    produtoId?: StringFilter<"PedidoProduto"> | string
    pedidoId?: StringFilter<"PedidoProduto"> | string
  }

  export type ProdutoCreateWithoutEntradasInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    pedidos?: PedidoProdutoCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutEntradasInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    pedidos?: PedidoProdutoUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutEntradasInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutEntradasInput, ProdutoUncheckedCreateWithoutEntradasInput>
  }

  export type ProdutoUpsertWithoutEntradasInput = {
    update: XOR<ProdutoUpdateWithoutEntradasInput, ProdutoUncheckedUpdateWithoutEntradasInput>
    create: XOR<ProdutoCreateWithoutEntradasInput, ProdutoUncheckedCreateWithoutEntradasInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutEntradasInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutEntradasInput, ProdutoUncheckedUpdateWithoutEntradasInput>
  }

  export type ProdutoUpdateWithoutEntradasInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoProdutoUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutEntradasInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    pedidos?: PedidoProdutoUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type UsuarioCreateWithoutPedidosInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    notificacoes?: NotificacaoUsuarioCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutPedidosInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    notificacoes?: NotificacaoUsuarioUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutPedidosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
  }

  export type PedidoProdutoCreateWithoutPedidoInput = {
    id?: string
    quantidade: number
    produto: ProdutoCreateNestedOneWithoutPedidosInput
  }

  export type PedidoProdutoUncheckedCreateWithoutPedidoInput = {
    id?: string
    quantidade: number
    produtoId: string
  }

  export type PedidoProdutoCreateOrConnectWithoutPedidoInput = {
    where: PedidoProdutoWhereUniqueInput
    create: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoProdutoCreateManyPedidoInputEnvelope = {
    data: PedidoProdutoCreateManyPedidoInput | PedidoProdutoCreateManyPedidoInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutPedidosInput = {
    update: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>
    create: XOR<UsuarioCreateWithoutPedidosInput, UsuarioUncheckedCreateWithoutPedidosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutPedidosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutPedidosInput, UsuarioUncheckedUpdateWithoutPedidosInput>
  }

  export type UsuarioUpdateWithoutPedidosInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    notificacoes?: NotificacaoUsuarioUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutPedidosInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    notificacoes?: NotificacaoUsuarioUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type PedidoProdutoUpsertWithWhereUniqueWithoutPedidoInput = {
    where: PedidoProdutoWhereUniqueInput
    update: XOR<PedidoProdutoUpdateWithoutPedidoInput, PedidoProdutoUncheckedUpdateWithoutPedidoInput>
    create: XOR<PedidoProdutoCreateWithoutPedidoInput, PedidoProdutoUncheckedCreateWithoutPedidoInput>
  }

  export type PedidoProdutoUpdateWithWhereUniqueWithoutPedidoInput = {
    where: PedidoProdutoWhereUniqueInput
    data: XOR<PedidoProdutoUpdateWithoutPedidoInput, PedidoProdutoUncheckedUpdateWithoutPedidoInput>
  }

  export type PedidoProdutoUpdateManyWithWhereWithoutPedidoInput = {
    where: PedidoProdutoScalarWhereInput
    data: XOR<PedidoProdutoUpdateManyMutationInput, PedidoProdutoUncheckedUpdateManyWithoutPedidoInput>
  }

  export type ProdutoCreateWithoutPedidosInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    entradas?: EntradaEstoqueCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutPedidosInput = {
    id_produto?: string
    nome: string
    categoria: string
    marca: string
    cor: string
    quantidade: number
    valorCusto: number
    valorVenda: number
    estoqueMin: number
    entradas?: EntradaEstoqueUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutPedidosInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutPedidosInput, ProdutoUncheckedCreateWithoutPedidosInput>
  }

  export type PedidoCreateWithoutProdutosInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    usuario: UsuarioCreateNestedOneWithoutPedidosInput
  }

  export type PedidoUncheckedCreateWithoutProdutosInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    usuarioId: string
  }

  export type PedidoCreateOrConnectWithoutProdutosInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutProdutosInput, PedidoUncheckedCreateWithoutProdutosInput>
  }

  export type ProdutoUpsertWithoutPedidosInput = {
    update: XOR<ProdutoUpdateWithoutPedidosInput, ProdutoUncheckedUpdateWithoutPedidosInput>
    create: XOR<ProdutoCreateWithoutPedidosInput, ProdutoUncheckedCreateWithoutPedidosInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutPedidosInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutPedidosInput, ProdutoUncheckedUpdateWithoutPedidosInput>
  }

  export type ProdutoUpdateWithoutPedidosInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    entradas?: EntradaEstoqueUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutPedidosInput = {
    id_produto?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    categoria?: StringFieldUpdateOperationsInput | string
    marca?: StringFieldUpdateOperationsInput | string
    cor?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    valorCusto?: FloatFieldUpdateOperationsInput | number
    valorVenda?: FloatFieldUpdateOperationsInput | number
    estoqueMin?: IntFieldUpdateOperationsInput | number
    entradas?: EntradaEstoqueUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type PedidoUpsertWithoutProdutosInput = {
    update: XOR<PedidoUpdateWithoutProdutosInput, PedidoUncheckedUpdateWithoutProdutosInput>
    create: XOR<PedidoCreateWithoutProdutosInput, PedidoUncheckedCreateWithoutProdutosInput>
    where?: PedidoWhereInput
  }

  export type PedidoUpdateToOneWithWhereWithoutProdutosInput = {
    where?: PedidoWhereInput
    data: XOR<PedidoUpdateWithoutProdutosInput, PedidoUncheckedUpdateWithoutProdutosInput>
  }

  export type PedidoUpdateWithoutProdutosInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type PedidoUncheckedUpdateWithoutProdutosInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoCreateWithoutUsuarioInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    produtos?: PedidoProdutoCreateNestedManyWithoutPedidoInput
  }

  export type PedidoUncheckedCreateWithoutUsuarioInput = {
    id_pedido?: string
    data?: Date | string
    status: string
    produtos?: PedidoProdutoUncheckedCreateNestedManyWithoutPedidoInput
  }

  export type PedidoCreateOrConnectWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidoCreateManyUsuarioInputEnvelope = {
    data: PedidoCreateManyUsuarioInput | PedidoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type NotificacaoUsuarioCreateWithoutUsuarioInput = {
    id?: string
    notificacao: NotificacaoCreateNestedOneWithoutUsuariosInput
  }

  export type NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput = {
    id?: string
    notificacaoId: string
  }

  export type NotificacaoUsuarioCreateOrConnectWithoutUsuarioInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    create: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificacaoUsuarioCreateManyUsuarioInputEnvelope = {
    data: NotificacaoUsuarioCreateManyUsuarioInput | NotificacaoUsuarioCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PedidoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    update: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PedidoCreateWithoutUsuarioInput, PedidoUncheckedCreateWithoutUsuarioInput>
  }

  export type PedidoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PedidoWhereUniqueInput
    data: XOR<PedidoUpdateWithoutUsuarioInput, PedidoUncheckedUpdateWithoutUsuarioInput>
  }

  export type PedidoUpdateManyWithWhereWithoutUsuarioInput = {
    where: PedidoScalarWhereInput
    data: XOR<PedidoUpdateManyMutationInput, PedidoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PedidoScalarWhereInput = {
    AND?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    OR?: PedidoScalarWhereInput[]
    NOT?: PedidoScalarWhereInput | PedidoScalarWhereInput[]
    id_pedido?: StringFilter<"Pedido"> | string
    data?: DateTimeFilter<"Pedido"> | Date | string
    status?: StringFilter<"Pedido"> | string
    usuarioId?: StringFilter<"Pedido"> | string
  }

  export type NotificacaoUsuarioUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    update: XOR<NotificacaoUsuarioUpdateWithoutUsuarioInput, NotificacaoUsuarioUncheckedUpdateWithoutUsuarioInput>
    create: XOR<NotificacaoUsuarioCreateWithoutUsuarioInput, NotificacaoUsuarioUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificacaoUsuarioUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    data: XOR<NotificacaoUsuarioUpdateWithoutUsuarioInput, NotificacaoUsuarioUncheckedUpdateWithoutUsuarioInput>
  }

  export type NotificacaoUsuarioUpdateManyWithWhereWithoutUsuarioInput = {
    where: NotificacaoUsuarioScalarWhereInput
    data: XOR<NotificacaoUsuarioUpdateManyMutationInput, NotificacaoUsuarioUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type NotificacaoUsuarioScalarWhereInput = {
    AND?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
    OR?: NotificacaoUsuarioScalarWhereInput[]
    NOT?: NotificacaoUsuarioScalarWhereInput | NotificacaoUsuarioScalarWhereInput[]
    id?: StringFilter<"NotificacaoUsuario"> | string
    usuarioId?: StringFilter<"NotificacaoUsuario"> | string
    notificacaoId?: StringFilter<"NotificacaoUsuario"> | string
  }

  export type NotificacaoUsuarioCreateWithoutNotificacaoInput = {
    id?: string
    usuario: UsuarioCreateNestedOneWithoutNotificacoesInput
  }

  export type NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput = {
    id?: string
    usuarioId: string
  }

  export type NotificacaoUsuarioCreateOrConnectWithoutNotificacaoInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    create: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput>
  }

  export type NotificacaoUsuarioCreateManyNotificacaoInputEnvelope = {
    data: NotificacaoUsuarioCreateManyNotificacaoInput | NotificacaoUsuarioCreateManyNotificacaoInput[]
    skipDuplicates?: boolean
  }

  export type NotificacaoUsuarioUpsertWithWhereUniqueWithoutNotificacaoInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    update: XOR<NotificacaoUsuarioUpdateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedUpdateWithoutNotificacaoInput>
    create: XOR<NotificacaoUsuarioCreateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedCreateWithoutNotificacaoInput>
  }

  export type NotificacaoUsuarioUpdateWithWhereUniqueWithoutNotificacaoInput = {
    where: NotificacaoUsuarioWhereUniqueInput
    data: XOR<NotificacaoUsuarioUpdateWithoutNotificacaoInput, NotificacaoUsuarioUncheckedUpdateWithoutNotificacaoInput>
  }

  export type NotificacaoUsuarioUpdateManyWithWhereWithoutNotificacaoInput = {
    where: NotificacaoUsuarioScalarWhereInput
    data: XOR<NotificacaoUsuarioUpdateManyMutationInput, NotificacaoUsuarioUncheckedUpdateManyWithoutNotificacaoInput>
  }

  export type UsuarioCreateWithoutNotificacoesInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    pedidos?: PedidoCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutNotificacoesInput = {
    id_usuario?: string
    nome: string
    email: string
    senha: string
    pedidos?: PedidoUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutNotificacoesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
  }

  export type NotificacaoCreateWithoutUsuariosInput = {
    id_notificacao?: string
    mensagem: string
    dataEnvio?: Date | string
  }

  export type NotificacaoUncheckedCreateWithoutUsuariosInput = {
    id_notificacao?: string
    mensagem: string
    dataEnvio?: Date | string
  }

  export type NotificacaoCreateOrConnectWithoutUsuariosInput = {
    where: NotificacaoWhereUniqueInput
    create: XOR<NotificacaoCreateWithoutUsuariosInput, NotificacaoUncheckedCreateWithoutUsuariosInput>
  }

  export type UsuarioUpsertWithoutNotificacoesInput = {
    update: XOR<UsuarioUpdateWithoutNotificacoesInput, UsuarioUncheckedUpdateWithoutNotificacoesInput>
    create: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutNotificacoesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutNotificacoesInput, UsuarioUncheckedUpdateWithoutNotificacoesInput>
  }

  export type UsuarioUpdateWithoutNotificacoesInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutNotificacoesInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    pedidos?: PedidoUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type NotificacaoUpsertWithoutUsuariosInput = {
    update: XOR<NotificacaoUpdateWithoutUsuariosInput, NotificacaoUncheckedUpdateWithoutUsuariosInput>
    create: XOR<NotificacaoCreateWithoutUsuariosInput, NotificacaoUncheckedCreateWithoutUsuariosInput>
    where?: NotificacaoWhereInput
  }

  export type NotificacaoUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: NotificacaoWhereInput
    data: XOR<NotificacaoUpdateWithoutUsuariosInput, NotificacaoUncheckedUpdateWithoutUsuariosInput>
  }

  export type NotificacaoUpdateWithoutUsuariosInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificacaoUncheckedUpdateWithoutUsuariosInput = {
    id_notificacao?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntradaEstoqueCreateManyProdutoInput = {
    id_entrada?: string
    data?: Date | string
    quantidade: number
  }

  export type PedidoProdutoCreateManyProdutoInput = {
    id?: string
    quantidade: number
    pedidoId: string
  }

  export type EntradaEstoqueUpdateWithoutProdutoInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type EntradaEstoqueUncheckedUpdateWithoutProdutoInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type EntradaEstoqueUncheckedUpdateManyWithoutProdutoInput = {
    id_entrada?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: IntFieldUpdateOperationsInput | number
  }

  export type PedidoProdutoUpdateWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    pedido?: PedidoUpdateOneRequiredWithoutProdutosNestedInput
  }

  export type PedidoProdutoUncheckedUpdateWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    pedidoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoProdutoUncheckedUpdateManyWithoutProdutoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    pedidoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoProdutoCreateManyPedidoInput = {
    id?: string
    quantidade: number
    produtoId: string
  }

  export type PedidoProdutoUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneRequiredWithoutPedidosNestedInput
  }

  export type PedidoProdutoUncheckedUpdateWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoProdutoUncheckedUpdateManyWithoutPedidoInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    produtoId?: StringFieldUpdateOperationsInput | string
  }

  export type PedidoCreateManyUsuarioInput = {
    id_pedido?: string
    data?: Date | string
    status: string
  }

  export type NotificacaoUsuarioCreateManyUsuarioInput = {
    id?: string
    notificacaoId: string
  }

  export type PedidoUpdateWithoutUsuarioInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    produtos?: PedidoProdutoUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateWithoutUsuarioInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    produtos?: PedidoProdutoUncheckedUpdateManyWithoutPedidoNestedInput
  }

  export type PedidoUncheckedUpdateManyWithoutUsuarioInput = {
    id_pedido?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    notificacao?: NotificacaoUpdateOneRequiredWithoutUsuariosNestedInput
  }

  export type NotificacaoUsuarioUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    notificacaoId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    notificacaoId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioCreateManyNotificacaoInput = {
    id?: string
    usuarioId: string
  }

  export type NotificacaoUsuarioUpdateWithoutNotificacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneRequiredWithoutNotificacoesNestedInput
  }

  export type NotificacaoUsuarioUncheckedUpdateWithoutNotificacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }

  export type NotificacaoUsuarioUncheckedUpdateManyWithoutNotificacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}